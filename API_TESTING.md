# API Testing with cURL & Postman

## Quick Test Commands

### 1. Health Check

```bash
curl http://localhost:8000/
```

**Expected Response:**
```json
{
  "status": "online",
  "service": "Credit Card Fraud Detection API",
  "model_loaded": true
}
```

---

### 2. Predict Fraud (Legitimate Transaction)

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "Time": 0,
    "Amount": 149.62,
    "V1": -1.359807,
    "V2": -0.072781,
    "V3": 2.536347,
    "V4": 1.378155,
    "V5": -0.338321,
    "V6": 0.462388,
    "V7": 0.239599,
    "V8": 0.098698,
    "V9": 0.363787,
    "V10": 0.090794,
    "V11": -0.551600,
    "V12": -0.617801,
    "V13": -0.991390,
    "V14": -0.311169,
    "V15": 1.468177,
    "V16": -0.470401,
    "V17": 0.207971,
    "V18": 0.025791,
    "V19": 0.403993,
    "V20": 0.251412,
    "V21": -0.018307,
    "V22": 0.277838,
    "V23": -0.110474,
    "V24": 0.066928,
    "V25": 0.128539,
    "V26": -0.189115,
    "V27": 0.133558,
    "V28": -0.021053
  }'
```

**Expected Response:**
```json
{
  "prediction": "Legitimate",
  "confidence": 92.5,
  "probability": 0.075,
  "risk_level": "Low",
  "message": "✅ This transaction appears legitimate..."
}
```

---

### 3. Predict Fraud (Suspicious Transaction)

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "Time": 406,
    "Amount": 0.00,
    "V1": -2.3122,
    "V2": 1.9519,
    "V3": -1.6098,
    "V4": 3.9979,
    "V5": -0.5226,
    "V6": -1.4267,
    "V7": -2.5371,
    "V8": 1.3910,
    "V9": -2.7704,
    "V10": -2.7728,
    "V11": 3.2020,
    "V12": -2.8995,
    "V13": -0.5950,
    "V14": -4.2891,
    "V15": 0.3897,
    "V16": -1.1408,
    "V17": -2.8300,
    "V18": -0.0166,
    "V19": 0.4165,
    "V20": 0.1262,
    "V21": 0.5177,
    "V22": -0.0354,
    "V23": -0.4650,
    "V24": 0.3205,
    "V25": 0.0440,
    "V26": 0.1779,
    "V27": 0.2610,
    "V28": -0.1434
  }'
```

**Expected Response:**
```json
{
  "prediction": "Fraud",
  "confidence": 85.0,
  "probability": 0.85,
  "risk_level": "High",
  "message": "⚠️ This transaction shows signs of fraud..."
}
```

---

### 4. Get Model Info

```bash
curl http://localhost:8000/model-info
```

**Expected Response:**
```json
{
  "model_type": "Logistic Regression",
  "features_count": 30,
  "threshold": 0.1,
  "metrics": {
    "roc_auc": 0.97,
    "pr_auc": 0.75,
    "fraud_recall": 0.90,
    "fraud_precision": 0.08,
    "accuracy": 0.98
  }
}
```

---

### 5. Get Feature Importance

```bash
curl http://localhost:8000/feature-importance
```

**Expected Response:**
```json
{
  "features": [
    {"feature": "V14", "importance": 2.543},
    {"feature": "V17", "importance": 2.123},
    {"feature": "V12", "importance": 1.987},
    ...
  ],
  "total_features": 30
}
```

---

### 6. Get Statistics

```bash
curl http://localhost:8000/statistics
```

**Expected Response:**
```json
{
  "dataset": {
    "total_transactions": 284807,
    "fraudulent_transactions": 492,
    "legitimate_transactions": 284315,
    "fraud_percentage": 0.17
  },
  "model_performance": {
    "fraud_recall": "90%",
    "precision": "8%",
    "roc_auc": "0.97",
    "pr_auc": "0.75",
    "accuracy": "98%"
  }
}
```

---

## Postman Collection

### Import Steps

1. Open Postman
2. Click "Import"
3. Create new collection: "Fraud Detection API"
4. Add requests as described above

### Environment Variables

Create Postman environment:

```json
{
  "name": "Fraud Detection Local",
  "values": [
    {
      "key": "base_url",
      "value": "http://localhost:8000",
      "enabled": true
    }
  ]
}
```

Use in requests: `{{base_url}}/predict`

---

## Testing Scenarios

### Scenario 1: Normal Transaction Flow

1. Call health check → Verify service is up
2. Submit legitimate transaction → Expect "Legitimate" prediction
3. Check confidence score → Should be >80%

### Scenario 2: Fraud Detection

1. Submit suspicious transaction
2. Verify "Fraud" prediction
3. Check risk_level → Should be "High"
4. Verify probability > 0.1 (threshold)

### Scenario 3: Edge Cases

**Test 1: Zero amount**
```json
{"Time": 0, "Amount": 0, "V1": 0, ...}
```

**Test 2: Large amount**
```json
{"Time": 0, "Amount": 99999, "V1": 0, ...}
```

**Test 3: Negative values (should fail validation)**
```json
{"Time": 0, "Amount": -100, "V1": 0, ...}
```

---

## API Documentation

Once backend is running, visit:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

These provide interactive API documentation where you can test endpoints directly in the browser.

---

## Python Testing Script

Save as `test_api.py`:

```python
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    response = requests.get(f"{BASE_URL}/")
    print("Health Check:", response.json())
    assert response.status_code == 200

def test_predict():
    payload = {
        "Time": 0,
        "Amount": 149.62,
        "V1": -1.359807,
        # ... add all V features
        "V28": -0.021053
    }
    response = requests.post(f"{BASE_URL}/predict", json=payload)
    print("Prediction:", response.json())
    assert response.status_code == 200
    assert "prediction" in response.json()

def test_model_info():
    response = requests.get(f"{BASE_URL}/model-info")
    print("Model Info:", response.json())
    assert response.status_code == 200

if __name__ == "__main__":
    test_health()
    test_predict()
    test_model_info()
    print("✅ All tests passed!")
```

Run: `python test_api.py`

---

## Performance Testing

### Load Testing with Apache Bench

```bash
# Install ab (Apache Bench)
# Windows: Download from Apache httpd
# Mac: brew install httpd
# Linux: sudo apt install apache2-utils

# Test prediction endpoint (100 requests, 10 concurrent)
ab -n 100 -c 10 -p test_payload.json -T application/json \
  http://localhost:8000/predict
```

**test_payload.json:**
```json
{"Time": 0, "Amount": 100, "V1": 0, "V2": 0, ... "V28": 0}
```

### Expected Performance

- **Latency:** <50ms per prediction
- **Throughput:** >100 requests/second
- **Memory:** ~200MB for model + FastAPI

---

## Troubleshooting

### Error: Connection Refused
- Backend not running
- Check port 8000 is not in use

### Error: 422 Validation Error
- Missing required fields
- Check all V1-V28 are provided
- Verify Amount is non-negative

### Error: 503 Model Not Loaded
- Run `python export_model.py` first
- Check `model.pkl` exists in backend folder

---

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Test API
  run: |
    python backend/main.py &
    sleep 5
    curl http://localhost:8000/ | grep "online"
    python test_api.py
```

---

**Happy Testing! 🧪**

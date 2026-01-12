# Backend - Credit Card Fraud Detection API

FastAPI backend for serving ML fraud detection predictions.

## Setup

1. **Create virtual environment:**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Mac/Linux
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Generate model file:**
```bash
# Run from project root
python export_model.py
```

4. **Start server:**
```bash
python main.py
```

Server runs on `http://localhost:8000`

## API Endpoints

### `GET /`
Health check

### `POST /predict`
Predict fraud for a transaction
```json
{
  "Time": 0,
  "Amount": 149.62,
  "V1": -1.359807,
  "V2": -0.072781,
  ...
}
```

Response:
```json
{
  "prediction": "Fraud",
  "confidence": 92.5,
  "probability": 0.925,
  "risk_level": "High",
  "message": "⚠️ This transaction shows signs of fraud..."
}
```

### `GET /model-info`
Get model metrics and configuration

### `GET /feature-importance`
Get top 15 most important features

### `GET /statistics`
Get dataset and model statistics

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

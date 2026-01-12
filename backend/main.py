"""
FastAPI Backend for Credit Card Fraud Detection
Provides REST API endpoints for ML model inference and metrics
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
import pickle
import numpy as np
from typing import List, Dict, Any
import uvicorn

app = FastAPI(
    title="Credit Card Fraud Detection API",
    description="ML-powered fraud detection system",
    version="1.0.0"
)

# Enable CORS for frontend
# Add your production frontend URL to allow_origins when deployed
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://credit-card-fraud-two.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
print("Loading ML model...")
try:
    with open('model.pkl', 'rb') as f:
        model_data = pickle.load(f)
    
    pipeline = model_data['pipeline']
    threshold = model_data['threshold']
    feature_names = model_data['feature_names']
    metrics = model_data['metrics']
    
    print(f"✅ Model loaded successfully!")
    print(f"Features: {len(feature_names)}")
    print(f"Threshold: {threshold}")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    pipeline = None
    threshold = 0.1
    feature_names = []
    metrics = {}


class TransactionInput(BaseModel):
    """Input schema for fraud detection"""
    Time: float = Field(..., description="Seconds elapsed between transaction and first transaction")
    Amount: float = Field(..., ge=0, description="Transaction amount")
    V1: float = Field(0.0, description="PCA feature 1")
    V2: float = Field(0.0, description="PCA feature 2")
    V3: float = Field(0.0, description="PCA feature 3")
    V4: float = Field(0.0, description="PCA feature 4")
    V5: float = Field(0.0, description="PCA feature 5")
    V6: float = Field(0.0, description="PCA feature 6")
    V7: float = Field(0.0, description="PCA feature 7")
    V8: float = Field(0.0, description="PCA feature 8")
    V9: float = Field(0.0, description="PCA feature 9")
    V10: float = Field(0.0, description="PCA feature 10")
    V11: float = Field(0.0, description="PCA feature 11")
    V12: float = Field(0.0, description="PCA feature 12")
    V13: float = Field(0.0, description="PCA feature 13")
    V14: float = Field(0.0, description="PCA feature 14")
    V15: float = Field(0.0, description="PCA feature 15")
    V16: float = Field(0.0, description="PCA feature 16")
    V17: float = Field(0.0, description="PCA feature 17")
    V18: float = Field(0.0, description="PCA feature 18")
    V19: float = Field(0.0, description="PCA feature 19")
    V20: float = Field(0.0, description="PCA feature 20")
    V21: float = Field(0.0, description="PCA feature 21")
    V22: float = Field(0.0, description="PCA feature 22")
    V23: float = Field(0.0, description="PCA feature 23")
    V24: float = Field(0.0, description="PCA feature 24")
    V25: float = Field(0.0, description="PCA feature 25")
    V26: float = Field(0.0, description="PCA feature 26")
    V27: float = Field(0.0, description="PCA feature 27")
    V28: float = Field(0.0, description="PCA feature 28")

    @field_validator('Amount')
    @classmethod
    def amount_must_be_positive(cls, v):
        if v < 0:
            raise ValueError('Amount must be non-negative')
        return v


class PredictionResponse(BaseModel):
    """Response schema for fraud prediction"""
    prediction: str
    confidence: float
    probability: float
    risk_level: str
    message: str


@app.get("/")
def read_root():
    """Health check endpoint"""
    return {
        "status": "online",
        "service": "Credit Card Fraud Detection API",
        "model_loaded": pipeline is not None
    }


@app.post("/predict", response_model=PredictionResponse)
def predict_fraud(transaction: TransactionInput):
    """
    Predict if a transaction is fraudulent
    
    Returns:
    - prediction: "Fraud" or "Legitimate"
    - confidence: Confidence score (0-100%)
    - probability: Raw fraud probability
    - risk_level: "High", "Medium", or "Low"
    - message: Human-readable interpretation
    """
    if pipeline is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Convert input to array in correct feature order
        input_data = np.array([[
            transaction.Time, transaction.V1, transaction.V2, transaction.V3,
            transaction.V4, transaction.V5, transaction.V6, transaction.V7,
            transaction.V8, transaction.V9, transaction.V10, transaction.V11,
            transaction.V12, transaction.V13, transaction.V14, transaction.V15,
            transaction.V16, transaction.V17, transaction.V18, transaction.V19,
            transaction.V20, transaction.V21, transaction.V22, transaction.V23,
            transaction.V24, transaction.V25, transaction.V26, transaction.V27,
            transaction.V28, transaction.Amount
        ]])
        
        # Get prediction probabilities
        proba = pipeline.predict_proba(input_data)[0]
        fraud_probability = float(proba[1])
        
        # Apply custom threshold
        is_fraud = fraud_probability >= threshold
        
        # Determine risk level
        if fraud_probability >= 0.7:
            risk_level = "High"
        elif fraud_probability >= 0.3:
            risk_level = "Medium"
        else:
            risk_level = "Low"
        
        # Generate response message
        if is_fraud:
            message = f"⚠️ This transaction shows signs of fraud with {fraud_probability*100:.1f}% probability. Further verification recommended."
        else:
            message = f"✅ This transaction appears legitimate with {(1-fraud_probability)*100:.1f}% confidence."
        
        return PredictionResponse(
            prediction="Fraud" if is_fraud else "Legitimate",
            confidence=round(fraud_probability * 100 if is_fraud else (1 - fraud_probability) * 100, 2),
            probability=round(fraud_probability, 4),
            risk_level=risk_level,
            message=message
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


@app.get("/model-info")
def get_model_info():
    """Get model metrics and configuration"""
    if pipeline is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    return {
        "model_type": "Logistic Regression",
        "features_count": len(feature_names),
        "threshold": threshold,
        "metrics": {
            "roc_auc": round(metrics.get('roc_auc', 0), 4),
            "pr_auc": round(metrics.get('pr_auc', 0), 4),
            "fraud_recall": 0.90,
            "fraud_precision": 0.08,
            "accuracy": 0.98
        },
        "description": "Trained on European credit card transactions with class imbalance handling"
    }


@app.get("/feature-importance")
def get_feature_importance():
    """Get feature importance from logistic regression coefficients"""
    if pipeline is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Extract coefficients from the logistic regression model
        model = pipeline.named_steps['model']
        coefficients = model.coef_[0]
        
        # Get absolute values for importance
        importance = np.abs(coefficients)
        
        # Create feature importance list
        feature_importance = [
            {"feature": name, "importance": float(imp)}
            for name, imp in zip(feature_names, importance)
        ]
        
        # Sort by importance
        feature_importance.sort(key=lambda x: x['importance'], reverse=True)
        
        return {
            "features": feature_importance[:15],  # Top 15 features
            "total_features": len(feature_names)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error computing feature importance: {str(e)}")


@app.get("/statistics")
def get_statistics():
    """Get dataset and model statistics"""
    return {
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
        },
        "class_weight": {
            "legitimate": 1,
            "fraud": 50
        }
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

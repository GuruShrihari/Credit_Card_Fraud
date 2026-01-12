"""
Export trained ML model and preprocessing pipeline to pickle file
This script trains the model and saves it for production use
"""

import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from imblearn.pipeline import Pipeline

# Load data
print("Loading dataset...")
df = pd.read_csv("creditcard.csv")

# Prepare features and target
X = df.drop("Class", axis=1)
y = df["Class"]

# Split data (same as notebook)
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

X_train, X_valid, y_train, y_valid = train_test_split(
    X_temp, y_temp,
    test_size=0.25,
    stratify=y_temp,
    random_state=42
)

print("Training model...")
# Create pipeline (matching notebook configuration)
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression(
        max_iter=1000,
        class_weight={0: 1, 1: 50},
        solver="lbfgs"
    ))
])

# Train the model
pipeline.fit(X_train, y_train)

# Evaluate on test set
y_test_proba = pipeline.predict_proba(X_test)[:, 1]
threshold = 0.1
y_test_custom = (y_test_proba >= threshold).astype(int)

from sklearn.metrics import classification_report, roc_auc_score, average_precision_score

print("\nTest Results:")
print(classification_report(y_test, y_test_custom))
print(f"ROC-AUC: {roc_auc_score(y_test, y_test_proba):.4f}")
print(f"PR-AUC: {average_precision_score(y_test, y_test_proba):.4f}")

# Save model and metadata
model_data = {
    'pipeline': pipeline,
    'threshold': threshold,
    'feature_names': X.columns.tolist(),
    'metrics': {
        'roc_auc': float(roc_auc_score(y_test, y_test_proba)),
        'pr_auc': float(average_precision_score(y_test, y_test_proba)),
        'threshold': threshold
    }
}

print("\nSaving model to backend/model.pkl...")
with open('backend/model.pkl', 'wb') as f:
    pickle.dump(model_data, f)

print("✅ Model exported successfully!")
print(f"Model file: backend/model.pkl")
print(f"Features: {len(model_data['feature_names'])}")
print(f"Threshold: {threshold}")

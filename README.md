# 💳 Credit Card Fraud Detection (Imbalanced Classification)

**Project Type:** Machine Learning  
**Domain:** Imbalanced Binary Classification  
**Model Used:** Logistic Regression  
**Primary Metric:** PR-AUC  
**Project Status:** Completed (Deployment planned)

---

## 📌 Project Overview
I built this project to understand and solve a **real-world imbalanced classification problem** using a principled machine learning approach. Credit card fraud detection is particularly challenging because fraudulent transactions are extremely rare, which makes common metrics like accuracy misleading.

Instead of focusing on complex models, I focused on **correct ML thinking**: handling class imbalance, choosing the right metrics, tuning decision thresholds, and evaluating the model from a business perspective.

---

## 🧠 My Thinking Behind This Project
While working on this project, I deliberately asked:
- Why is accuracy misleading in fraud detection?
- How should models be evaluated when positive cases are extremely rare?
- How do decision thresholds affect false positives vs false negatives?
- How would this model behave in a real production system?

These questions guided every design and evaluation choice.

---

## 📂 Dataset
- **Dataset:** Credit Card Fraud Detection (European cardholders)
- **Features:**
  - `V1–V28`: PCA-transformed anonymized features
  - `Time`, `Amount`
  - `Class`: Target variable (`0 = Not Fraud`, `1 = Fraud`)
- Fraud transactions represent **~0.17%** of the dataset, making this an **extreme class imbalance** problem.

I verified that the dataset does not contain missing values and retained **all PCA components**, as they are critical for model performance.

---

## 🔍 Exploratory Data Analysis (EDA)
I performed EDA to:
- Confirm the severity of class imbalance
- Compare feature distributions between fraud and non-fraud transactions
- Understand the overlap between the two classes

This analysis reinforced that simple heuristics are insufficient and that probabilistic modeling is required.

---

## 🧪 Data Splitting Strategy
I used **stratified splitting** to preserve class distribution:
- 60% Training
- 20% Validation
- 20% Test

This ensures reliable evaluation on unseen data.

---

## ⚙️ Modeling Approach

### Model Choice
I used **Logistic Regression** because:
- It provides well-calibrated probability outputs
- It is interpretable and explainable
- It serves as a strong baseline for tabular data

Before trying more complex models, I focused on building a correct and reliable baseline.

---

### Pipeline Design
The end-to-end pipeline is:

StandardScaler → RandomOverSampler → Logistic Regression



Oversampling is applied **only to the training data** using an imbalanced-learn pipeline to avoid data leakage.

---

## 📊 Evaluation Strategy (Why Accuracy Is Not Used)
Because of extreme class imbalance, accuracy is misleading.  
Instead, I focused on:

- **Recall (Fraud class)** – ability to catch fraud
- **Precision** – quality of fraud alerts
- **ROC-AUC** – overall class separability
- **PR-AUC** – primary metric for imbalanced data

PR-AUC is especially important because it reflects performance on rare positive classes.

---

## 🎯 Threshold Tuning (Key Improvement)
Instead of using the default probability threshold of 0.5, I:
- Generated a **Precision–Recall curve**
- Analyzed the trade-off between recall and precision
- Selected a **lower threshold (0.1)** to prioritize fraud recall

This choice reflects real-world fraud systems, where **missing fraud is more costly than false alarms**.

The resulting drop in accuracy was expected and intentional.

---

## 📈 Final Test Results
- **Fraud Recall:** ~95%
- **ROC-AUC:** ~0.97
- **PR-AUC:** ~0.71
- **Accuracy:** ~84% (intentionally lower due to recall prioritization)

These results indicate strong class separation and effective fraud detection behavior.

---

## 🔎 Model Explainability
To maintain transparency:
- I analyzed Logistic Regression coefficients
- Identified which features contributed most to fraud prediction

This aligns with real-world financial systems where explainability is important.

---

## 🖥️ Deployment Mindset (Future Work)
I have not built a web interface yet, but this project was designed with deployment in mind.

Planned next steps:
- Build a lightweight web interface using Flask or FastAPI
- Allow manual entry of transaction features
- Display fraud probability and decision based on the tuned threshold
- Demonstrate end-to-end model usage

The web interface will serve as a **demo layer**, while the core value remains in the ML pipeline and evaluation logic.

---

## 🚀 Key Takeaways
- Accuracy is misleading for imbalanced classification problems
- PR-AUC is the most informative metric for fraud detection
- Threshold selection is a business decision, not a fixed rule
- Simple models with correct evaluation outperform complex models used incorrectly

---

## 🔮 Future Improvements
- Compare against tree-based models (XGBoost / LightGBM)
- Add cost-based evaluation (false negatives vs false positives)
- Use SHAP for enhanced explainability
- Cross-validated threshold optimization
- Extend to a two-stage detection system


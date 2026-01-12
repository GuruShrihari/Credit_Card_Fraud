# 💳 Credit Card Fraud Detection System

**Live Demo:** [https://credit-card-fraud-two.vercel.app](https://credit-card-fraud-two.vercel.app)  
**Backend API:** [https://credit-card-fraud-z6ac.onrender.com](https://credit-card-fraud-z6ac.onrender.com)  
**Tech Stack:** React + Vite, FastAPI, Scikit-learn  
**Project Type:** Full-Stack ML Web Application  
**Status:** ✅ Deployed & Live

---

## 🌐 Live Application Features

The deployed application includes:
- **Home Page:** Project overview and key metrics visualization
- **Live Detection:** Real-time fraud prediction with interactive form
- **Model Insights:** Detailed model performance metrics and evaluation
- **Dashboard:** Visual analytics and statistics
- **About:** Project methodology and technical approach

### Try It Live
Visit [https://credit-card-fraud-two.vercel.app](https://credit-card-fraud-two.vercel.app) to test the fraud detection system with sample transactions.

---

## 🚀 Quick Start

### View Live Application
**Production:** [https://credit-card-fraud-two.vercel.app](https://credit-card-fraud-two.vercel.app)

### Local Development
```bash
# Backend
cd backend
pip install -r requirements.txt
python main.py

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173

---

## 🛠️ Deployment Architecture

### Frontend (Vercel)
- **Platform:** Vercel
- **Framework:** React + Vite
- **URL:** https://credit-card-fraud-two.vercel.app
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Backend (Render)
- **Platform:** Render
- **Framework:** FastAPI
- **URL:** https://credit-card-fraud-z6ac.onrender.com
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 8000`

### API Endpoints
- `GET /` - Health check
- `POST /predict` - Fraud prediction
- `GET /model-info` - Model metrics
- `GET /feature-importance` - Feature analysis
- `GET /statistics` - Dataset statistics

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

---

## 💳 Project Overview
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
- **Fraud Recall:** 90%
- **Fraud Precision:** 8%
- **ROC-AUC:** 0.97
- **PR-AUC:** 0.75
- **Accuracy:** 98%

These results indicate strong class separation and effective fraud detection behavior. The model successfully catches 90% of fraudulent transactions while maintaining excellent overall classification performance.

---

## �️ Full-Stack Implementation

### Frontend Features
- **Interactive Dashboard:** Real-time fraud detection with visual feedback
- **Model Insights:** Performance metrics and evaluation visualizations
- **Responsive Design:** Built with React, Vite, and Tailwind CSS
- **Live API Integration:** Connected to FastAPI backend on Render

### Backend API
- **FastAPI Framework:** High-performance REST API
- **ML Pipeline:** Scikit-learn model with StandardScaler and oversampling
- **Production-Ready:** Deployed on Render with automatic model loading
- **CORS Enabled:** Secure cross-origin requests from Vercel frontend

### Deployment
- **Frontend:** Vercel (CI/CD from GitHub)
- **Backend:** Render (Auto-deploy from GitHub)
- **Model:** Exported using pickle, loaded at server startup
- **Monitoring:** Health checks and error handling

---

## 🚀 Key Takeaways
- Accuracy is misleading for imbalanced classification problems
- PR-AUC is the most informative metric for fraud detection
- Threshold selection is a business decision, not a fixed rule
- Simple models with correct evaluation outperform complex models used incorrectly
- **Full-stack ML deployment:** Successfully deployed end-to-end on Vercel and Render

---

## 🔮 Future Improvements
- Compare against tree-based models (XGBoost / LightGBM)
- Add cost-based evaluation (false negatives vs false positives)
- Use SHAP for enhanced explainability
- Cross-validated threshold optimization
- Extend to a two-stage detection system
- Add user authentication and transaction history tracking
- Implement batch prediction API endpoint
- Add monitoring and logging for production insights

---

## 📚 Project Structure
```
Credit_Card_Fraud/
├── backend/              # FastAPI backend
│   ├── main.py          # API endpoints
│   ├── model.pkl        # Trained ML model
│   └── requirements.txt # Python dependencies
├── frontend/            # React + Vite frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   └── components/  # Reusable UI components
│   └── package.json
├── Credit_Card.ipynb    # ML pipeline & training
├── creditcard.csv       # Dataset
└── README.md
```

---

## 🤝 Contributing
Feel free to fork this project and submit pull requests for improvements or bug fixes.

## 📝 License
This project is open source and available for educational purposes.

---

**Built with ❤️ using React, FastAPI, and Scikit-learn**
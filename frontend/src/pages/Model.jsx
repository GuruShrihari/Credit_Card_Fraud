import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckCircle, XCircle, TrendingUp, Target, Zap } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const Model = () => {
  const [modelInfo, setModelInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchModelInfo()
  }, [])

  const fetchModelInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/model-info`)
      setModelInfo(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching model info:', error)
      setLoading(false)
    }
  }

  const models = [
    {
      name: 'Logistic Regression',
      used: true,
      pros: [
        'Well-calibrated probability outputs',
        'Fast training and inference',
        'Interpretable coefficients',
        'Excellent baseline performance'
      ],
      cons: [
        'Linear decision boundary',
        'May miss complex non-linear patterns'
      ]
    },
    {
      name: 'Random Forest',
      used: false,
      pros: [
        'Handles non-linear relationships',
        'Built-in feature importance',
        'Robust to outliers'
      ],
      cons: [
        'Less interpretable',
        'Slower inference',
        'Probability calibration issues'
      ]
    },
    {
      name: 'XGBoost',
      used: false,
      pros: [
        'State-of-the-art performance',
        'Handles imbalance well',
        'Feature importance'
      ],
      cons: [
        'Complex hyperparameter tuning',
        'Longer training time',
        'Black-box nature'
      ]
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Model & ML Pipeline
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Deep dive into the machine learning approach and model selection
          </p>
        </div>

        {/* Model Performance */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Model Performance</h2>
          {loading ? (
            <div className="card text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading model metrics...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-5 gap-6">
              <div className="metric-card">
                <Zap className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold mb-1">
                  {modelInfo?.metrics?.fraud_recall * 100}%
                </div>
                <div className="text-sm opacity-90">Fraud Recall</div>
                <p className="text-xs mt-2 opacity-75">
                  Catches 90% of all fraud
                </p>
              </div>

              <div className="metric-card">
                <Target className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold mb-1">
                  {modelInfo?.metrics?.fraud_precision * 100}%
                </div>
                <div className="text-sm opacity-90">Precision</div>
                <p className="text-xs mt-2 opacity-75">
                  Quality of fraud alerts
                </p>
              </div>

              <div className="metric-card">
                <TrendingUp className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold mb-1">
                  {modelInfo?.metrics?.roc_auc}
                </div>
                <div className="text-sm opacity-90">ROC-AUC</div>
                <p className="text-xs mt-2 opacity-75">
                  Class separability
                </p>
              </div>

              <div className="metric-card">
                <CheckCircle className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold mb-1">
                  {modelInfo?.metrics?.pr_auc}
                </div>
                <div className="text-sm opacity-90">PR-AUC</div>
                <p className="text-xs mt-2 opacity-75">
                  Primary metric
                </p>
              </div>

              <div className="metric-card">
                <Target className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold mb-1">
                  {modelInfo?.metrics?.accuracy * 100}%
                </div>
                <div className="text-sm opacity-90">Accuracy</div>
                <p className="text-xs mt-2 opacity-75">
                  Overall correctness
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Why These Metrics Matter */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Why These Metrics Matter</h2>
          <div className="card">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-primary-600">
                  Why NOT Accuracy?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  With only 0.17% fraud, a model that predicts "legitimate" for every 
                  transaction achieves 99.83% accuracy while catching zero fraud. 
                  Accuracy is meaningless for imbalanced data.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-primary-600">
                  Recall (90%): Catching Fraud
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Recall measures what percentage of actual fraud we catch. At 90%, we successfully 
                  identify 9 out of 10 fraudulent transactions. This is critical because 
                  <strong> missing fraud is costly</strong> - both financially and for customer trust.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-primary-600">
                  Precision (8%): Alert Quality
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Precision shows what percentage of fraud alerts are correct. At 8%, for every 
                  100 transactions we flag as fraud, 8 are actually fraudulent. While this seems 
                  low, it's expected with extreme imbalance and reflects our deliberate choice to 
                  prioritize recall over precision.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-primary-600">
                  ROC-AUC (0.97): Class Separation
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  ROC-AUC measures how well the model separates fraud from legitimate transactions 
                  across all possible thresholds. A score of 0.97 indicates excellent separation - 
                  the model consistently assigns higher probabilities to fraudulent transactions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-primary-600">
                  PR-AUC (0.75): Primary Metric
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Precision-Recall AUC is the most informative metric for imbalanced data. 
                  It focuses specifically on the positive (fraud) class and summarizes the 
                  precision-recall tradeoff. A score of 0.75 is strong for this problem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Model Comparison */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Model Selection & Comparison</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <div
                key={index}
                className={`card ${
                  model.used
                    ? 'border-2 border-primary-600 ring-4 ring-primary-100 dark:ring-primary-900'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{model.name}</h3>
                  {model.used && (
                    <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      CHOSEN
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-success-600 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" /> Advantages
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    {model.pros.map((pro, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-danger-600 mb-2 flex items-center">
                    <XCircle className="w-4 h-4 mr-1" /> Limitations
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    {model.cons.map((con, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final Choice Justification */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="card bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-2 border-primary-200 dark:border-primary-800">
            <h2 className="text-2xl font-bold mb-4">Why Logistic Regression?</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-gray-100">
                  Before trying complex models, establish a strong baseline.
                </strong>
              </p>
              <p>
                Logistic Regression was chosen as the final model because it provides:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Well-calibrated probabilities:</strong> Critical for threshold tuning 
                  and risk assessment
                </li>
                <li>
                  <strong>Interpretability:</strong> Financial institutions require explainable 
                  models for regulatory compliance
                </li>
                <li>
                  <strong>Fast inference:</strong> Can process thousands of transactions per second
                </li>
                <li>
                  <strong>Proven performance:</strong> Achieves 0.97 ROC-AUC and 0.75 PR-AUC
                </li>
              </ul>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                More complex models like XGBoost may provide marginal improvements but sacrifice 
                interpretability and inference speed - not worth the tradeoff for this use case.
              </p>
            </div>
          </div>
        </section>

        {/* ML Pipeline */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">ML Pipeline Architecture</h2>
          <div className="card">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-bold mb-2">StandardScaler</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Standardizes features to zero mean and unit variance. Essential for 
                    Logistic Regression to converge properly.
                  </p>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    X_scaled = (X - mean) / std
                  </code>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-bold mb-2">Logistic Regression with Class Weights</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Class weight ratio of 1:50 (legitimate:fraud) to handle imbalance. 
                    Model penalizes fraud misclassification 50x more than legitimate misclassification.
                  </p>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    class_weight={'{0: 1, 1: 50}'}
                  </code>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-bold mb-2">Custom Threshold (0.1)</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Instead of default 0.5, we use 0.1 threshold to maximize fraud recall. 
                    Transactions with probability ≥ 0.1 are flagged as fraud.
                  </p>
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    prediction = (probability {'>'} 0.1)
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Model

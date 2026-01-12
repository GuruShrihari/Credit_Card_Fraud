import React, { useState } from 'react'
import axios from 'axios'
import { AlertTriangle, CheckCircle, Loader, DollarSign, Clock, TrendingUp } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const LiveDetection = () => {
  const [formData, setFormData] = useState({
    Time: '0',
    Amount: '100',
    V1: '0',
    V2: '0',
    V3: '0',
    V4: '0',
    V5: '0',
    V6: '0',
    V7: '0',
    V8: '0',
    V9: '0',
    V10: '0',
    V11: '0',
    V12: '0',
    V13: '0',
    V14: '0',
    V15: '0',
    V16: '0',
    V17: '0',
    V18: '0',
    V19: '0',
    V20: '0',
    V21: '0',
    V22: '0',
    V23: '0',
    V24: '0',
    V25: '0',
    V26: '0',
    V27: '0',
    V28: '0'
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Sample transactions for quick testing
  const sampleTransactions = {
    legitimate: {
      Time: 0,
      Amount: 149.62,
      V1: -1.359807,
      V2: -0.072781,
      V3: 2.536347,
      V4: 1.378155,
      V5: -0.338321,
      V6: 0.462388,
      V7: 0.239599,
      V8: 0.098698,
      V9: 0.363787,
      V10: 0.090794,
      V11: -0.551600,
      V12: -0.617801,
      V13: -0.991390,
      V14: -0.311169,
      V15: 1.468177,
      V16: -0.470401,
      V17: 0.207971,
      V18: 0.025791,
      V19: 0.403993,
      V20: 0.251412,
      V21: -0.018307,
      V22: 0.277838,
      V23: -0.110474,
      V24: 0.066928,
      V25: 0.128539,
      V26: -0.189115,
      V27: 0.133558,
      V28: -0.021053
    },
    suspicious: {
      Time: 406,
      Amount: 0.00,
      V1: -2.3122,
      V2: 1.9519,
      V3: -1.6098,
      V4: 3.9979,
      V5: -0.5226,
      V6: -1.4267,
      V7: -2.5371,
      V8: 1.3910,
      V9: -2.7704,
      V10: -2.7728,
      V11: 3.2020,
      V12: -2.8995,
      V13: -0.5950,
      V14: -4.2891,
      V15: 0.3897,
      V16: -1.1408,
      V17: -2.8300,
      V18: -0.0166,
      V19: 0.4165,
      V20: 0.1262,
      V21: 0.5177,
      V22: -0.0354,
      V23: -0.4650,
      V24: 0.3205,
      V25: 0.0440,
      V26: 0.1779,
      V27: 0.2610,
      V28: -0.1434
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const loadSample = (type) => {
    const sample = sampleTransactions[type]
    setFormData(Object.fromEntries(
      Object.entries(sample).map(([key, value]) => [key, value.toString()])
    ))
    setResult(null)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Convert form data to numbers
      const payload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
      )

      const response = await axios.post(`${API_URL}/predict`, payload)
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Error connecting to API. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High':
        return 'bg-danger-100 border-danger-500 text-danger-900 dark:bg-danger-900 dark:text-danger-100'
      case 'Medium':
        return 'bg-yellow-100 border-yellow-500 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100'
      case 'Low':
        return 'bg-success-100 border-success-500 text-success-900 dark:bg-success-900 dark:text-success-100'
      default:
        return 'bg-gray-100 border-gray-500 text-gray-900'
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Live Fraud Detection
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Test the ML model with real transaction data
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Transaction Details</h2>
            
            {/* Quick Load Samples */}
            <div className="mb-6 flex gap-4">
              <button
                onClick={() => loadSample('legitimate')}
                className="flex-1 bg-success-600 hover:bg-success-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                Load Legitimate Sample
              </button>
              <button
                onClick={() => loadSample('suspicious')}
                className="flex-1 bg-danger-600 hover:bg-danger-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                Load Suspicious Sample
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Key Features */}
              <div className="space-y-4 p-4 bg-primary-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-bold text-primary-700 dark:text-primary-300 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Primary Features
                </h3>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Transaction Amount ($)
                  </label>
                  <input
                    type="number"
                    name="Amount"
                    value={formData.Amount}
                    onChange={handleInputChange}
                    step="0.01"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Time (seconds since first transaction)
                  </label>
                  <input
                    type="number"
                    name="Time"
                    value={formData.Time}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              {/* PCA Features - Collapsible */}
              <details className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <summary className="font-bold cursor-pointer text-gray-700 dark:text-gray-300">
                  Advanced Features (V1-V28) - Click to expand
                </summary>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((num) => (
                    <div key={num}>
                      <label className="block text-sm font-medium mb-1">
                        V{num}
                      </label>
                      <input
                        type="number"
                        name={`V${num}`}
                        value={formData[`V${num}`]}
                        onChange={handleInputChange}
                        step="any"
                        className="input-field text-sm"
                      />
                    </div>
                  ))}
                </div>
              </details>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="animate-spin mr-2 w-5 h-5" />
                    Analyzing...
                  </span>
                ) : (
                  'Detect Fraud'
                )}
              </button>
            </form>
          </div>

          {/* Results Panel */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Detection Results</h2>
            
            {!result && !error && !loading && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Submit a transaction to see detection results</p>
                <p className="text-sm mt-2">Try loading a sample transaction to get started</p>
              </div>
            )}

            {error && (
              <div className="bg-danger-100 border-2 border-danger-500 rounded-lg p-6 text-danger-900 dark:bg-danger-900 dark:text-danger-100">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Error</h3>
                    <p>{error}</p>
                    <p className="text-sm mt-2 opacity-75">
                      Make sure the backend server is running on http://localhost:8000
                    </p>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Main Prediction */}
                <div className={`border-2 rounded-lg p-6 ${
                  result.prediction === 'Fraud' 
                    ? 'bg-danger-100 border-danger-500 text-danger-900 dark:bg-danger-900 dark:text-danger-100'
                    : 'bg-success-100 border-success-500 text-success-900 dark:bg-success-900 dark:text-success-100'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    {result.prediction === 'Fraud' ? (
                      <AlertTriangle className="w-12 h-12" />
                    ) : (
                      <CheckCircle className="w-12 h-12" />
                    )}
                    <div className="text-right">
                      <div className="text-4xl font-bold">
                        {result.prediction}
                      </div>
                      <div className="text-sm opacity-75">
                        {result.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">{result.message}</p>
                </div>

                {/* Detailed Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Fraud Probability
                    </div>
                    <div className="text-2xl font-bold">
                      {(result.probability * 100).toFixed(2)}%
                    </div>
                  </div>

                  <div className={`rounded-lg p-4 border-2 ${getRiskColor(result.risk_level)}`}>
                    <div className="text-sm opacity-75 mb-1">
                      Risk Level
                    </div>
                    <div className="text-2xl font-bold">
                      {result.risk_level}
                    </div>
                  </div>
                </div>

                {/* Visual Probability Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-success-600 font-medium">Legitimate</span>
                    <span className="text-danger-600 font-medium">Fraud</span>
                  </div>
                  <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-success-500 via-yellow-500 to-danger-500 flex items-center justify-end pr-2"
                      style={{ width: `${result.probability * 100}%` }}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow-lg"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span className="font-medium">Threshold: 10%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-primary-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2 text-primary-700 dark:text-primary-300">
                    How This Works
                  </h3>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Model calculates fraud probability from transaction features</li>
                    <li>• Custom threshold (0.1) optimized for high recall</li>
                    <li>• Probability ≥ 10% triggers fraud alert</li>
                    <li>• Risk level based on probability ranges</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="card bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
            <h3 className="text-xl font-bold mb-4">About Live Detection</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                This interface demonstrates real-time fraud detection using the trained 
                Logistic Regression model. Transaction features are sent to the FastAPI 
                backend, which returns predictions with confidence scores.
              </p>
              <p>
                <strong>Note:</strong> The V1-V28 features are PCA-transformed variables 
                from the original dataset. In production, these would be automatically 
                computed from raw transaction data.
              </p>
              <p>
                The model uses a custom threshold of 0.1 (10% probability) to maximize 
                fraud recall, intentionally accepting more false positives to avoid 
                missing fraudulent transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveDetection

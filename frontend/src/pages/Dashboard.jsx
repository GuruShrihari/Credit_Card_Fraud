import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { TrendingUp, AlertTriangle, Target, Activity } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const Dashboard = () => {
  const [featureImportance, setFeatureImportance] = useState([])
  const [statistics, setStatistics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [featuresRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/feature-importance`),
        axios.get(`${API_URL}/statistics`)
      ])

      setFeatureImportance(featuresRes.data.features.slice(0, 10))
      setStatistics(statsRes.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  // Data for class distribution pie chart
  const classDistribution = statistics ? [
    { name: 'Legitimate', value: statistics.dataset.legitimate_transactions, color: '#22c55e' },
    { name: 'Fraudulent', value: statistics.dataset.fraudulent_transactions, color: '#ef4444' }
  ] : []

  // Confusion Matrix Data (simplified representation)
  const confusionMatrixData = [
    { category: 'True Negatives', value: 55785, color: '#22c55e' },
    { category: 'False Positives', value: 1079, color: '#f59e0b' },
    { category: 'False Negatives', value: 10, color: '#ef4444' },
    { category: 'True Positives', value: 88, color: '#3b82f6' }
  ]

  // Model metrics for visualization
  const modelMetrics = [
    { metric: 'ROC-AUC', value: 97, color: '#3b82f6' },
    { metric: 'PR-AUC', value: 75, color: '#8b5cf6' },
    { metric: 'Recall', value: 90, color: '#22c55e' },
    { metric: 'Precision', value: 8, color: '#f59e0b' }
  ]

  const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#22c55e', '#ef4444']

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Visual insights into model performance and data patterns
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Key Metrics Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <Activity className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold mb-1">284,807</div>
                <div className="text-sm opacity-90">Total Transactions</div>
              </div>

              <div className="card bg-gradient-to-br from-danger-500 to-danger-600 text-white">
                <AlertTriangle className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold mb-1">492</div>
                <div className="text-sm opacity-90">Fraudulent Cases</div>
              </div>

              <div className="card bg-gradient-to-br from-success-500 to-success-600 text-white">
                <Target className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold mb-1">90%</div>
                <div className="text-sm opacity-90">Fraud Recall</div>
              </div>

              <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <TrendingUp className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold mb-1">0.97</div>
                <div className="text-sm opacity-90">ROC-AUC Score</div>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Class Distribution */}
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">Class Distribution</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Extreme imbalance: 0.17% fraud rate
                </p>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={classDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {classDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium">Why this matters:</p>
                  <p>Standard accuracy would be 99.83% by predicting all "legitimate"</p>
                </div>
              </div>

              {/* Model Performance Metrics */}
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">Model Performance Metrics</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Key evaluation scores (higher is better)
                </p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={modelMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {modelMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium">Interpretation:</p>
                  <p>High recall prioritized over precision for fraud detection</p>
                </div>
              </div>
            </div>

            {/* Feature Importance */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Top 10 Feature Importance</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Features with highest impact on fraud prediction (based on logistic regression coefficients)
              </p>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={featureImportance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="feature" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
                    {featureImportance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p className="font-medium mb-2">About These Features:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>V1-V28 are PCA-transformed features from original transaction data</li>
                  <li>Higher absolute coefficient = stronger influence on prediction</li>
                  <li>These features capture complex patterns distinguishing fraud from legitimate</li>
                </ul>
              </div>
            </div>

            {/* Confusion Matrix Visualization */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Model Predictions Breakdown</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Test set results (56,962 transactions)
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                {confusionMatrixData.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-lg text-center"
                    style={{ backgroundColor: item.color + '20', borderLeft: `4px solid ${item.color}` }}
                  >
                    <div className="text-3xl font-bold mb-2" style={{ color: item.color }}>
                      {item.value.toLocaleString()}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.category}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Understanding the Numbers:</h3>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• <strong>True Negatives (55,785):</strong> Correctly identified legitimate</li>
                    <li>• <strong>True Positives (88):</strong> Correctly caught fraud (90% of 98 total)</li>
                    <li>• <strong>False Positives (1,079):</strong> Legitimate flagged as fraud</li>
                    <li>• <strong>False Negatives (10):</strong> Missed fraud (10% of 98 total)</li>
                  </ul>
                </div>
                <div className="bg-primary-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-primary-700 dark:text-primary-300">
                    Business Impact:
                  </h3>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Catches 90% of fraud (88/98 fraudulent transactions)</li>
                    <li>• Only 10 fraudulent transactions slip through</li>
                    <li>• 1,079 false alarms is acceptable given fraud cost</li>
                    <li>• Overall accuracy: 98% (but not the primary metric)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Insights Panel */}
            <div className="card bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-2 border-primary-200 dark:border-primary-800">
              <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-bold text-primary-600 mb-2">Model Strength</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    ROC-AUC of 0.97 demonstrates excellent class separation. The model 
                    successfully distinguishes fraud from legitimate transactions.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-primary-600 mb-2">Threshold Tradeoff</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Custom 0.1 threshold prioritizes catching fraud (90% recall) at the 
                    cost of more false positives. This reflects real-world priorities.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-primary-600 mb-2">Production Ready</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Fast inference, interpretable features, and configurable thresholds 
                    make this suitable for real-time fraud detection systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

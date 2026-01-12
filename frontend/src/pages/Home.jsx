import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, TrendingUp, Lock, AlertTriangle, ArrowRight } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'ML-Powered Detection',
      description: 'Advanced machine learning algorithms analyze transaction patterns in real-time'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: '97% ROC-AUC Score',
      description: 'Industry-leading accuracy with exceptional class separation'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Imbalance Handling',
      description: 'Sophisticated techniques to handle extreme class imbalance (0.17% fraud rate)'
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: '90% Fraud Recall',
      description: 'Catches 90% of fraudulent transactions with optimized threshold tuning'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Credit Card Fraud Detection
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Protecting financial transactions with machine learning
            </p>
            <p className="text-lg mb-10 text-gray-200 max-w-2xl mx-auto">
              An end-to-end ML system that identifies fraudulent credit card transactions 
              with 97% ROC-AUC score, handling extreme class imbalance through advanced 
              machine learning techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/detect"
                className="bg-white text-primary-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center"
              >
                Try Fraud Detection <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/model"
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-all inline-flex items-center justify-center"
              >
                View Model Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-8">The Problem</h2>
            <div className="card">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Why Credit Card Fraud Detection Matters
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Credit card fraud costs billions of dollars annually, affecting both financial 
                  institutions and consumers. Traditional rule-based systems struggle to keep up 
                  with evolving fraud patterns and generate excessive false positives.
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-gray-100">The Challenge:</strong> Fraudulent 
                  transactions represent only <strong>0.17%</strong> of all transactions, creating an 
                  extreme class imbalance problem. Standard machine learning approaches fail in such scenarios.
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-gray-100">Why Machine Learning?</strong> ML models 
                  can learn complex patterns from data, adapt to new fraud tactics, and provide probabilistic 
                  predictions rather than binary rules. This allows for sophisticated risk assessment and 
                  threshold tuning based on business requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-12">How It Works</h2>
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">Data Collection & Preprocessing</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Transaction features (Time, Amount, and 28 PCA-transformed variables) are 
                      collected and standardized for model input.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">ML Model Prediction</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Logistic Regression model with class weighting (1:50) generates fraud probability 
                      scores for each transaction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">Threshold-Based Decision</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Custom threshold (0.1) applied to prioritize fraud recall over precision, 
                      catching 90% of fraudulent transactions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">Risk Assessment & Alert</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      System classifies transactions as High/Medium/Low risk and generates 
                      actionable alerts for review teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Test the System?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Try live fraud detection with sample transactions
          </p>
          <Link
            to="/detect"
            className="bg-white text-primary-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl inline-flex items-center"
          >
            Launch Live Detection <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

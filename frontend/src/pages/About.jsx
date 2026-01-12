import React from 'react'
import { Database, TrendingDown, Target, Users } from 'lucide-react'

const About = () => {
  const challenges = [
    {
      title: 'Extreme Class Imbalance',
      description: 'Only 0.17% of transactions are fraudulent, making it difficult for models to learn fraud patterns',
      impact: 'Requires specialized techniques like class weighting and threshold tuning'
    },
    {
      title: 'False Positive Cost',
      description: 'Blocking legitimate transactions damages customer experience and business revenue',
      impact: 'Need to balance fraud detection with customer convenience'
    },
    {
      title: 'Evolving Fraud Patterns',
      description: 'Fraudsters constantly adapt their tactics to evade detection systems',
      impact: 'Models must be retrained regularly with new data'
    },
    {
      title: 'Real-Time Requirements',
      description: 'Fraud detection must occur in milliseconds during transaction processing',
      impact: 'Requires efficient models and optimized inference pipelines'
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              About the Project
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center">
            Understanding the dataset, challenges, and real-world applications
          </p>
        </div>

        {/* Dataset Overview */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Dataset Overview</h2>
          <div className="card">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-primary-600" />
                  Dataset Information
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium">Source:</span>
                    <span>European Credit Cards (2013)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium">Total Transactions:</span>
                    <span>284,807</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium">Fraudulent:</span>
                    <span className="text-danger-600 font-bold">492 (0.17%)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium">Legitimate:</span>
                    <span className="text-success-600 font-bold">284,315 (99.83%)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Time Period:</span>
                    <span>2 days</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Features Used</h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div>
                    <h4 className="font-semibold mb-2">PCA Features (V1-V28):</h4>
                    <p className="text-sm">
                      28 anonymized features created through Principal Component Analysis 
                      to protect sensitive cardholder information. These capture the most 
                      important transaction characteristics.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Time:</h4>
                    <p className="text-sm">
                      Seconds elapsed between each transaction and the first transaction 
                      in the dataset. Helps identify temporal patterns.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Amount:</h4>
                    <p className="text-sm">
                      Transaction amount in euros. Critical for detecting unusual 
                      spending patterns.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Class (Target):</h4>
                    <p className="text-sm">
                      Binary label where 1 indicates fraud and 0 indicates legitimate 
                      transaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Challenges Faced</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-primary-600">
                  {challenge.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {challenge.description}
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm font-medium">
                    <span className="text-primary-600">Solution:</span> {challenge.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real-World Relevance */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Real-World Relevance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <TrendingDown className="w-12 h-12 mx-auto mb-4 text-danger-600" />
              <h3 className="text-2xl font-bold mb-2 text-danger-600">$28.65B</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Global card fraud losses in 2023
              </p>
            </div>

            <div className="card text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-2xl font-bold mb-2 text-primary-600">3.3%</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Average fraud rate for card-not-present transactions
              </p>
            </div>

            <div className="card text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-success-600" />
              <h3 className="text-2xl font-bold mb-2 text-success-600">127M</h3>
              <p className="text-gray-600 dark:text-gray-400">
                US consumers affected by fraud annually
              </p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="max-w-4xl mx-auto">
          <div className="card bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-2 border-primary-200 dark:border-primary-800">
            <h2 className="text-2xl font-bold mb-4">Why This Project Matters</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                This project demonstrates a complete understanding of production-grade machine 
                learning systems for fraud detection:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Handling extreme class imbalance with appropriate techniques</li>
                <li>Choosing meaningful evaluation metrics (PR-AUC over accuracy)</li>
                <li>Implementing threshold tuning based on business requirements</li>
                <li>Building end-to-end ML pipelines from data to deployment</li>
                <li>Creating interpretable models for financial applications</li>
              </ul>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Unlike academic exercises, this project prioritizes real-world considerations 
                like false positive costs, model explainability, and deployment readiness.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About

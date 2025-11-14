import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaReceipt, FaTrash, FaDownload, FaRupeeSign, FaCalendarAlt, FaLink, FaHashtag } from "react-icons/fa";
import { getTransactions, clearTransactions, getTotalSpent } from "../utils/transactionStorage";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    const allTransactions = getTransactions();
    setTransactions(allTransactions);
    setTotalSpent(getTotalSpent());
  };

  const handleClearHistory = () => {
    if (clearTransactions()) {
      setTransactions([]);
      setTotalSpent(0);
      setShowClearConfirm(false);
    }
  };

  const formatAmount = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  const exportToCSV = () => {
    if (transactions.length === 0) return;

    const headers = ['Date', 'Service Name', 'Quantity', 'Amount', 'Payment ID', 'Order ID', 'Link'];
    const rows = transactions.map(t => [
      t.date,
      t.serviceName,
      t.quantity,
      t.amount,
      t.paymentId || 'N/A',
      t.orderId || 'N/A',
      t.link || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `famehikes_transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-orange-500 mb-2 flex items-center justify-center gap-3">
            <FaReceipt className="text-3xl" />
            Transaction History
          </h1>
          <p className="text-gray-600">View all your successful payments and orders</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-orange-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Transactions</p>
                <p className="text-3xl font-bold text-orange-500">{transactions.length}</p>
              </div>
              <FaReceipt className="text-4xl text-orange-300" />
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-orange-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-green-600">{formatAmount(totalSpent)}</p>
              </div>
              <FaRupeeSign className="text-4xl text-green-300" />
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-orange-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Average Order</p>
                <p className="text-3xl font-bold text-blue-600">
                  {transactions.length > 0 ? formatAmount(totalSpent / transactions.length) : '₹0.00'}
                </p>
              </div>
              <FaCalendarAlt className="text-4xl text-blue-300" />
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        {transactions.length > 0 && (
          <div className="flex gap-4 mb-6 justify-end">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaDownload />
              Export CSV
            </button>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaTrash />
              Clear History
            </button>
          </div>
        )}

        {/* Transactions List */}
        {transactions.length === 0 ? (
          <motion.div
            className="bg-white rounded-xl p-12 text-center shadow-lg border border-orange-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FaReceipt className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Transactions Yet</h3>
            <p className="text-gray-500">Your transaction history will appear here after successful payments</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left Side - Transaction Details */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FaReceipt className="text-orange-500 text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-orange-500 mb-2">
                          {transaction.serviceName}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <FaHashtag className="text-orange-400" />
                            <span><strong>Quantity:</strong> {transaction.quantity}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaRupeeSign className="text-green-500" />
                            <span><strong>Amount:</strong> {formatAmount(transaction.amount)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaLink className="text-blue-400" />
                            <span className="truncate"><strong>Link:</strong> {transaction.link || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-purple-400" />
                            <span><strong>Date:</strong> {transaction.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Payment Info */}
                  <div className="md:text-right">
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <p className="text-xs text-gray-500 mb-1">Payment ID</p>
                      <p className="text-sm font-mono text-orange-600 break-all">
                        {transaction.paymentId || 'N/A'}
                      </p>
                      {transaction.orderId && (
                        <>
                          <p className="text-xs text-gray-500 mt-2 mb-1">Order ID</p>
                          <p className="text-sm font-mono text-gray-600 break-all">
                            {transaction.orderId}
                          </p>
                        </>
                      )}
                      {transaction.smmOrderId && (
                        <>
                          <p className="text-xs text-gray-500 mt-2 mb-1">SMM Order ID</p>
                          <p className="text-sm font-mono text-green-600 break-all">
                            {transaction.smmOrderId}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-xl p-8 max-w-md w-full mx-4 border border-orange-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className="text-2xl font-bold text-orange-500 mb-4">Clear Transaction History?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete all transaction records? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleClearHistory}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Yes, Clear All
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;


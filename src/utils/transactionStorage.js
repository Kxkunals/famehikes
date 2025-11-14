// Utility to save and retrieve transaction history from localStorage

export const saveTransaction = (transactionData) => {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn("localStorage is not available");
      return null;
    }

    // Get existing transactions
    const existingTransactions = getTransactions();
    
    // Create new transaction object
    const newTransaction = {
      id: Date.now().toString(), // Unique ID
      ...transactionData,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    // Add new transaction at the beginning (most recent first)
    const updatedTransactions = [newTransaction, ...existingTransactions];
    
    // Save to localStorage
    localStorage.setItem('famehikes_transactions', JSON.stringify(updatedTransactions));
    
    return newTransaction;
  } catch (error) {
    console.error("Error saving transaction:", error);
    return null;
  }
};

export const getTransactions = () => {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }
    
    const transactions = localStorage.getItem('famehikes_transactions');
    return transactions ? JSON.parse(transactions) : [];
  } catch (error) {
    console.error("Error getting transactions:", error);
    return [];
  }
};

export const clearTransactions = () => {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    
    localStorage.removeItem('famehikes_transactions');
    return true;
  } catch (error) {
    console.error("Error clearing transactions:", error);
    return false;
  }
};

export const getTotalSpent = () => {
  try {
    const transactions = getTransactions();
    return transactions.reduce((total, transaction) => {
      return total + (parseFloat(transaction.amount) || 0);
    }, 0);
  } catch (error) {
    console.error("Error calculating total spent:", error);
    return 0;
  }
};


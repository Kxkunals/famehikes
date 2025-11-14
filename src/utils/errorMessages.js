// Helper function to convert Firebase error codes to user-friendly messages
export const getFirebaseErrorMessage = (errorCode, errorMessage) => {
  // Extract error code from message if it's in format "Firebase: Error (auth/error-code)"
  const codeMatch = errorMessage?.match(/auth\/([^)]+)/);
  const code = codeMatch ? codeMatch[1] : errorCode;

  switch (code) {
    case "operation-not-allowed":
      return "Email/Password authentication is not enabled. Please contact support or use Google Sign In.";
    
    case "email-already-in-use":
      return "This email is already registered. Please login instead.";
    
    case "weak-password":
      return "Password is too weak. Please use a stronger password (at least 6 characters).";
    
    case "invalid-email":
      return "Invalid email address. Please check and try again.";
    
    case "user-not-found":
      return "No account found with this email. Please sign up first.";
    
    case "wrong-password":
      return "Incorrect password. Please try again.";
    
    case "invalid-credential":
      return "Invalid email or password. Please check and try again.";
    
    case "too-many-requests":
      return "Too many failed attempts. Please try again later.";
    
    case "popup-closed-by-user":
      return "Google sign-in was cancelled. Please try again.";
    
    case "popup-blocked":
      return "Popup was blocked. Please allow popups and try again.";
    
    case "network-request-failed":
      return "Network error. Please check your internet connection.";
    
    default:
      // Return a more user-friendly message for unknown errors
      if (errorMessage?.includes("Firebase:")) {
        return "Authentication error. Please try again or contact support.";
      }
      return errorMessage || "An error occurred. Please try again.";
  }
};


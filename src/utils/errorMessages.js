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
    
    case "auth/popup-blocked":
    case "popup-blocked":
      return "Popup was blocked by your browser. Please allow popups and try again.";
    
    case "auth/cancelled-popup-request":
    case "cancelled-popup-request":
      return "Another sign-in attempt is in progress. Please wait and try again.";
    
    case "auth/account-exists-with-different-credential":
    case "account-exists-with-different-credential":
      return "An account already exists with this email. Please use email/password login.";
    
    case "network-request-failed":
      return "Network error. Please check your internet connection and try again.";
    
    case "auth/unauthorized-domain":
    case "unauthorized-domain":
      // Get current domain dynamically
      const currentDomain = window.location.hostname;
      return `This domain (${currentDomain}) is not authorized for OAuth. Please add it to Firebase Console → Authentication → Settings → Authorized domains. Current domain: ${currentDomain}`;
    
    case "auth/operation-not-allowed":
      // Check if it's for Google specifically
      if (errorMessage?.toLowerCase().includes("google") || errorMessage?.toLowerCase().includes("sign-in")) {
        return "Google Sign-In is not enabled in Firebase Console. Please enable it in Authentication → Sign-in method → Google.";
      }
      return "Email/Password authentication is not enabled. Please contact support or use Google Sign In.";
    
    default:
      // Return a more user-friendly message for unknown errors
      if (errorMessage?.includes("Firebase:")) {
        // Try to extract more info
        if (errorMessage?.toLowerCase().includes("google")) {
          return "Google Sign-In error. Please make sure Google authentication is enabled in Firebase Console.";
        }
        return "Authentication error. Please check Firebase Console settings or contact support.";
      }
      // Log the original error for debugging
      console.error("Unhandled error:", errorMessage);
      return errorMessage || "An error occurred. Please try again or contact support.";
  }
};


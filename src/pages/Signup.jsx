import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { getFirebaseErrorMessage } from "../utils/errorMessages";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await signup(email, password);
      if (result.success) {
        navigate("/");
      } else {
        const friendlyError = getFirebaseErrorMessage(null, result.error);
        setError(friendlyError);
      }
    } catch (err) {
      const friendlyError = getFirebaseErrorMessage(null, err.message);
      setError(friendlyError);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await loginWithGoogle();
      if (result.success) {
        navigate("/");
      } else {
        // Log the error for debugging
        console.error("Google signup error:", result.error);
        console.error("Error code:", result.code);
        
        const friendlyError = getFirebaseErrorMessage(result.code, result.error);
        setError(friendlyError);
      }
    } catch (err) {
      console.error("Google signup exception:", err);
      const friendlyError = getFirebaseErrorMessage(err.code, err.message);
      setError(friendlyError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center py-20 px-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-orange-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500 mb-2">Sign Up</h1>
          <p className="text-gray-600">Create your FameHikes account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <div className="font-semibold mb-1">⚠️ Error:</div>
            <div>{error}</div>
            {error.includes("unauthorized-domain") && (
              <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-orange-800 text-xs">
                <strong>Quick Fix:</strong> Go to Firebase Console → Authentication → Settings → Authorized domains → Add "{typeof window !== 'undefined' ? window.location.hostname : 'your-domain.com'}"
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="Enter your password (min 6 characters)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="mt-4 w-full flex items-center justify-center gap-3 bg-white border-2 border-orange-300 text-black font-semibold py-3 rounded-lg hover:bg-orange-50 transition-colors disabled:opacity-50"
          >
            <FaGoogle className="text-xl" />
            Continue with Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-semibold hover:text-orange-600">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;


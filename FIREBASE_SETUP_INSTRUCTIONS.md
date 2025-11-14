# Firebase Authentication Setup Instructions

## Error: `auth/operation-not-allowed`

This error occurs when Email/Password or Google authentication is not enabled in your Firebase Console.

## Steps to Fix:

### 1. Go to Firebase Console
- Visit: https://console.firebase.google.com/
- Select your project: `famehikes-39b02`

### 2. Enable Authentication Methods

1. **Click on "Authentication"** in the left sidebar
2. **Click on "Sign-in method"** tab
3. **Enable Email/Password:**
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

4. **Enable Google Sign-In:**
   - Click on "Google"
   - Toggle "Enable" to ON
   - Enter your project support email (or use default)
   - Click "Save"

### 3. Verify Setup
- Both methods should show as "Enabled" with a green checkmark
- Try signing up again - the error should be resolved

## Additional Configuration (Optional)

### Authorized Domains
- Go to Authentication → Settings → Authorized domains
- Make sure your domain is listed (localhost is included by default)
- For production, add: `famehikes.in` and `www.famehikes.in`

### OAuth Consent Screen (for Google)
- If using Google Sign-In, you may need to configure OAuth consent screen
- Go to Google Cloud Console → APIs & Services → OAuth consent screen
- Complete the setup if prompted

## Testing
After enabling authentication methods:
1. Try creating an account with email/password
2. Try signing in with Google
3. Both should work without the `operation-not-allowed` error

## Support
If you still face issues:
- Check Firebase Console for any additional errors
- Verify your Firebase config in `src/firebase/config.js`
- Check browser console for detailed error messages


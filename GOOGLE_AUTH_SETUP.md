# Google Authentication Setup Guide

## Error: Google Sign-In Not Working

If you're getting authentication errors with Google Sign-In, follow these steps:

## Step 1: Enable Google Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **famehikes-39b02**
3. Click **Authentication** in the left sidebar
4. Click **Sign-in method** tab
5. Find **Google** in the list
6. Click on **Google**
7. Toggle **Enable** to **ON**
8. Enter your **Project support email** (or use default)
9. Click **Save**

## Step 2: Configure OAuth Consent Screen (If Required)

If you see OAuth errors:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: **famehikes-39b02**
3. Go to **APIs & Services** → **OAuth consent screen**
4. Choose **External** (for testing) or **Internal** (for organization)
5. Fill in required fields:
   - App name: **FameHikes**
   - User support email: Your email
   - Developer contact: Your email
6. Click **Save and Continue**
7. Add scopes (if needed):
   - `email`
   - `profile`
   - `openid`
8. Add test users (if in testing mode)
9. Click **Save and Continue**

## Step 3: Configure Authorized Domains

1. In Firebase Console → **Authentication** → **Settings**
2. Scroll to **Authorized domains**
3. Make sure these domains are listed:
   - `localhost` (for development)
   - `famehikes.in` (your production domain)
   - `www.famehikes.in`
4. If not listed, click **Add domain** and add them

## Step 4: Check Browser Console

After enabling Google auth, check browser console (F12) for any errors:
- Open browser DevTools (F12)
- Go to Console tab
- Try Google Sign-In again
- Check for any error messages

## Common Issues:

### Issue 1: "Popup blocked"
**Solution:** Allow popups for your domain in browser settings

### Issue 2: "Unauthorized domain"
**Solution:** Add your domain in Firebase Console → Authentication → Settings → Authorized domains

### Issue 3: "OAuth consent screen not configured"
**Solution:** Complete OAuth consent screen setup in Google Cloud Console

### Issue 4: "Operation not allowed"
**Solution:** Make sure Google Sign-In is enabled in Firebase Console → Authentication → Sign-in method

## Testing:

1. After setup, try Google Sign-In again
2. A popup should open asking to select Google account
3. After selecting account, you should be logged in
4. Check browser console for any errors

## Still Not Working?

1. Check Firebase Console → Authentication → Users (to see if user was created)
2. Check browser console for detailed error messages
3. Verify Firebase config in `src/firebase/config.js` matches your project
4. Try clearing browser cache and cookies
5. Try in incognito/private mode

## Support:

If issues persist, check:
- Firebase Console → Authentication → Sign-in method (Google should be enabled)
- Browser console for specific error codes
- Network tab in DevTools for failed requests


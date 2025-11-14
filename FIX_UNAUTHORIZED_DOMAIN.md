# Fix: Unauthorized Domain Error

## Error: `auth/unauthorized-domain`

**Problem:** Your domain `www.famehikes.in` is not authorized in Firebase Console for OAuth operations.

## Quick Fix Steps:

### Step 1: Go to Firebase Console
1. Visit: https://console.firebase.google.com/
2. Select your project: **famehikes-39b02**

### Step 2: Add Authorized Domain
1. Click **Authentication** in the left sidebar
2. Click **Settings** tab (gear icon at the top)
3. Scroll down to **Authorized domains** section
4. You'll see a list of domains like:
   - `localhost` (for development)
   - `famehikes.in` (if already added)
   - `www.famehikes.in` (if already added)

### Step 3: Add Your Domain
1. Click **Add domain** button
2. Enter: `www.famehikes.in`
3. Click **Add**
4. Also add (if not already there): `famehikes.in` (without www)
5. Click **Add** again

### Step 4: Verify
After adding, your authorized domains should include:
- ✅ `localhost`
- ✅ `famehikes.in`
- ✅ `www.famehikes.in`

### Step 5: Test
1. Refresh your website
2. Try Google Sign-In again
3. It should work now!

## Important Notes:

- **localhost** is automatically added for development
- For production, you MUST add your actual domain
- Both `famehikes.in` and `www.famehikes.in` should be added separately
- Changes take effect immediately (no need to wait)

## Still Not Working?

1. **Check domain spelling:** Make sure you entered the exact domain
2. **Clear browser cache:** Sometimes cached settings cause issues
3. **Check Firebase project:** Make sure you're in the correct Firebase project
4. **Verify domain ownership:** Firebase may require domain verification for some domains

## Alternative: Use localhost for Testing

If you're testing locally:
- Use `http://localhost:5173` (or your dev server port)
- `localhost` is already authorized by default
- Google Sign-In will work on localhost

## Need Help?

If the domain is still not working after adding it:
1. Check browser console (F12) for any other errors
2. Verify the domain is exactly as shown in the error message
3. Make sure you saved the changes in Firebase Console
4. Try in incognito/private mode to rule out cache issues


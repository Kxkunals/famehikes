# Firebase Domain Error Fix - Step by Step (हिंदी में)

## Problem: `auth/unauthorized-domain` Error

आपको यह error आ रहा है क्योंकि आपका domain Firebase Console में authorized नहीं है।

## Solution: Domain Add करें Firebase Console में

### Step 1: Firebase Console खोलें
1. Browser में जाएं: https://console.firebase.google.com/
2. Login करें (अगर नहीं logged in हैं)
3. अपना project select करें: **famehikes-39b02**

### Step 2: Authentication Section में जाएं
1. Left sidebar में **"Authentication"** पर click करें
2. Top पर **"Settings"** tab (⚙️ gear icon) पर click करें
3. Page scroll करें नीचे

### Step 3: Authorized Domains Section
1. **"Authorized domains"** section find करें
2. आपको एक list दिखेगी:
   - `localhost` (पहले से है - development के लिए)
   - शायद `famehikes.in` (अगर add किया है)
   - शायद `www.famehikes.in` (अगर add किया है)

### Step 4: Domain Add करें
1. **"Add domain"** button पर click करें
2. एक popup/input box खुलेगा
3. Type करें: `www.famehikes.in`
4. **"Add"** button click करें
5. फिर से **"Add domain"** click करें
6. Type करें: `famehikes.in` (बिना www के)
7. **"Add"** button click करें

### Step 5: Verify करें
अब आपकी list में ये domains होनी चाहिए:
- ✅ `localhost`
- ✅ `famehikes.in`
- ✅ `www.famehikes.in`

### Step 6: Test करें
1. अपनी website refresh करें (F5 दबाएं)
2. Google Sign-In button try करें
3. अब काम करना चाहिए! ✅

## Important Points (जरूरी बातें):

1. **दोनों domains add करें:**
   - `famehikes.in` (बिना www)
   - `www.famehikes.in` (www के साथ)

2. **Changes तुरंत apply होती हैं:**
   - Wait करने की जरूरत नहीं
   - Refresh करें और try करें

3. **localhost automatically authorized है:**
   - Development के लिए localhost use कर सकते हैं
   - `http://localhost:5173` पर test करें

## अगर अभी भी Error आ रहा है:

### Check करें:
1. ✅ Domain exactly सही type किया? (spelling check करें)
2. ✅ Firebase Console में save किया? (Add button click किया?)
3. ✅ सही project में हैं? (famehikes-39b02)
4. ✅ Browser cache clear किया? (Ctrl+Shift+Delete)

### Try करें:
1. **Incognito/Private mode** में try करें
2. **Different browser** में try करें
3. **Clear browser cache** करें

## Visual Guide:

```
Firebase Console
├── Authentication (left sidebar)
    ├── Sign-in method (tab)
    └── Settings (tab) ← यहाँ जाएं
        └── Authorized domains (section)
            ├── localhost (already there)
            ├── Add domain button ← यहाँ click करें
            ├── famehikes.in (add करें)
            └── www.famehikes.in (add करें)
```

## Quick Checklist:

- [ ] Firebase Console खोला
- [ ] Authentication → Settings में गए
- [ ] Authorized domains section find किया
- [ ] `famehikes.in` add किया
- [ ] `www.famehikes.in` add किया
- [ ] Website refresh किया
- [ ] Google Sign-In try किया

## Still Not Working?

अगर अभी भी error आ रहा है:
1. Browser console (F12) में exact error check करें
2. Firebase Console में domain list verify करें
3. Domain spelling double-check करें
4. Support से contact करें

---

**Note:** यह error code में नहीं है, यह Firebase Console configuration की problem है। Domain add करने के बाद automatically fix हो जाएगी।


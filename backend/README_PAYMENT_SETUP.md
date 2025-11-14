# Payment Verification Setup

## Environment Variables Required

Add these to your `.env` file in the `backend` directory:

```env
# Razorpay Configuration (Required)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# SMM Panel API Configuration (Optional - for automatic service delivery)
SMM_PANEL_API_URL=https://your-smm-panel-api.com/api
SMM_PANEL_API_KEY=your_smm_panel_api_key
```

## How It Works

1. **Order Creation**: Frontend creates a Razorpay order via `/api/order`
2. **Payment**: User completes payment through Razorpay checkout
3. **Verification**: Frontend sends payment details to `/api/payment/verify`
4. **Signature Check**: Backend verifies Razorpay signature using HMAC SHA256
5. **Service Delivery**: Only if signature is valid, the SMM panel API is called
6. **Response**: User receives success/failure message

## Security

- Payment signature is verified using Razorpay's secret key
- Service is delivered ONLY after successful signature verification
- If verification fails, service is NOT delivered

## SMM Panel API Format

The backend expects your SMM panel API to accept:

```json
{
  "key": "your_api_key",
  "action": "add",
  "service": 2010,
  "link": "https://instagram.com/username",
  "quantity": 1000
}
```

Expected response format (any of these):
- `{ "order": "12345" }` - Order ID
- `{ "status": "success" }` - Success status
- `{ "error": false }` - No error

If your SMM panel API uses a different format, modify `backend/api/payment.js` accordingly.

## Testing

1. Use Razorpay test keys for development
2. Test with small amounts first
3. Check backend logs for verification status
4. Verify SMM panel receives orders only after payment verification


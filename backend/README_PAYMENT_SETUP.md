# Payment Verification Setup

## Environment Variables Required

Add these to your `.env` file in the `backend` directory:

```env
# Razorpay Configuration (Required)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# SMM Panel API Configuration (Required for auto-delivery)
SMM_PANEL_API_URL=https://trendwisher.shop/api/v2
SMM_PANEL_API_KEY=your_smm_panel_api_key

# Optional developer notifications
DEV_NOTIFICATION_WEBHOOK=https://your-webhook-url.com/path
```

## How It Works

1. **Order Creation**: Frontend creates a Razorpay order via `/api/order`
2. **Payment**: User completes payment through Razorpay checkout
3. **Verification**: Frontend sends payment details to `/api/payment/verify`
4. **Signature Check**: Backend verifies Razorpay signature using HMAC SHA256
5. **Service Delivery**: Only if signature is valid, the SMM panel API is called with the customer’s link and quantity
6. **Developer Notification**: Every delivery (or failure) is logged to `backend/logs/delivery-confirmations.log` and optionally POSTed to `DEV_NOTIFICATION_WEBHOOK`
7. **Response**: User receives success/failure message

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

## Developer Confirmation

- Every attempt (success/failure/skipped) is appended to `backend/logs/delivery-confirmations.log`
- Set `DEV_NOTIFICATION_WEBHOOK` to receive the same payload in Slack/Discord/Teams/etc.
- Example payload:

```json
{
  "event": "SERVICE_DELIVERED",
  "timestamp": "2025-11-19T10:45:31.123Z",
  "paymentId": "pay_123",
  "razorpayOrderId": "order_ABC",
  "smmOrderId": "67890",
  "serviceId": 2010,
  "serviceName": "Instagram Followers",
  "quantity": 1000,
  "link": "https://instagram.com/username"
}
```

## Testing

1. Use Razorpay test keys for development
2. Test with small amounts first
3. Check backend logs for verification status
4. Verify SMM panel receives orders only after payment verification


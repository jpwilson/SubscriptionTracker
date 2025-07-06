# Subscription Status Badges

SubTracker displays helpful status badges on your subscriptions to keep you informed about their current state.

## Status Types

### 🟣 TRIAL
- **When displayed**: The subscription is currently in a free trial period (more than 7 days left)
- **What it means**: You're not being charged yet, but will be once the trial ends
- **Tooltip**: Shows when the free trial ends

### ⚠️ Trial Ending Soon (Yellow)
- **When displayed**: Free trial ends within the next 7 days
- **What it means**: You're about to be charged for the first time
- **Tooltip**: Shows exactly how many days until you'll be charged
- **Action needed**: Cancel if you don't want to be charged

### 🟠 Service Ending (Orange)
- **When displayed**: You've cancelled and service ends within 7 days
- **What it means**: You'll lose access to the service soon
- **Tooltip**: Shows exactly when your access ends
- **Example**: You cancelled but paid through the end of the month

### 🔴 Unsubscribed
- **When displayed**: You've cancelled but still have more than 7 days of access left
- **What it means**: You won't be charged again, but can continue using the service
- **Tooltip**: Shows when your access ends and days remaining
- **Example**: If you cancel Netflix on July 2nd but your billing cycle ends July 30th, you'll see this badge

## How It Works

1. **Regular Active Subscriptions**: No badges shown - these renew normally without warnings

2. **Trial Periods**: 
   - Shows "TRIAL" badge when more than 7 days remain
   - Changes to "Trial Ending Soon" (yellow) within 7 days

3. **Cancelled Subscriptions**:
   - Shows "Unsubscribed" when more than 7 days of access remain
   - Changes to "Service Ending" (orange) within 7 days
   - Removed from your list after the end date

4. **Visual Priority**:
   - Yellow = Money warning (about to be charged)
   - Orange = Access warning (about to lose service)
   - Red = Status indicator (cancelled but still accessible)

## Managing Subscription Lifecycles

- **Starting a Trial**: Mark "This is a free trial" when adding the subscription
- **Cancelling**: Edit the subscription, uncheck "active", and set the end date to when your access ends
- **Reactivating**: Edit a cancelled subscription and check "active" again

## Why No "Expires Soon" for Regular Renewals?

Regular subscription renewals are expected behavior - they happen every month/year as planned. We only show warnings for:
- Trials ending (you're about to be charged for the first time)
- Services ending (you're about to lose access)

This keeps your dashboard clean and only alerts you when action might be needed.
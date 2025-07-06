// Quick test to verify analytics calculations
const testSubscriptions = [
  { name: 'Netflix', amount: 200, billingCycle: 'monthly', category: 'Entertainment' },
  { name: 'Spotify', amount: 10, billingCycle: 'monthly', category: 'Entertainment' },
  { name: 'AWS', amount: 1200, billingCycle: 'yearly', category: 'Software' },
];

// Calculate monthly amounts
testSubscriptions.forEach(sub => {
  let monthlyAmount = 0;
  switch (sub.billingCycle) {
    case 'monthly':
      monthlyAmount = sub.amount;
      break;
    case 'yearly':
      monthlyAmount = sub.amount / 12;
      break;
  }
  console.log(`${sub.name}: $${sub.amount}/${sub.billingCycle} = $${monthlyAmount}/month`);
});

// Calculate totals
const monthlyTotal = testSubscriptions.reduce((sum, sub) => {
  switch (sub.billingCycle) {
    case 'monthly':
      return sum + sub.amount;
    case 'yearly':
      return sum + (sub.amount / 12);
    default:
      return sum;
  }
}, 0);

console.log(`\nMonthly Total: $${monthlyTotal}`);
console.log(`Yearly Total: $${monthlyTotal * 12}`);

// Expected:
// Netflix: $200/month
// Spotify: $10/month  
// AWS: $100/month (1200/12)
// Monthly Total: $310
// Yearly Total: $3720
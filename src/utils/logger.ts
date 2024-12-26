interface PointsPurchaseLog {
  sessionId: string;
  amount: number;
  previousBalance: number;
  newBalance: number;
  timestamp: string;
}

export const logPointsPurchase = (log: PointsPurchaseLog) => {
  // In a real application, this would send the log to a backend service
  console.log('Points Purchase:', log);
  
  // Store in localStorage for audit purposes
  const purchases = JSON.parse(localStorage.getItem('points-purchases') || '[]');
  purchases.push(log);
  localStorage.setItem('points-purchases', JSON.stringify(purchases));
};
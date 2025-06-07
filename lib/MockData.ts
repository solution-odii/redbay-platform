// lib/mockdata.ts
export interface DashboardMetric {
    id: string;
    title: string;
    value: string | number;
    change: number;
    changeType: 'positive' | 'negative';
    period: string;
  }
  
  export interface ChartDataPoint {
    month: string;
    value: number;
  }
  
  export interface MerchantData {
    id: string;
    name: string;
    email: string;
    amount: string;
    avatar: string;
  }
  
  export interface PayoutData {
    succeeded: number;
    failed: number;
    successAmount: string;
    failedAmount: string;
  }
  
  // Top metrics data
  export const dashboardMetrics: DashboardMetric[] = [
    {
      id: 'total-merchants',
      title: 'Total Merchants',
      value: '134,790',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'total-vnubans',
      title: 'Total vNUBANs',
      value: '1,900,789',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'virtual-transaction-flow',
      title: 'Count of Virtual Transaction Flow',
      value: '12,900',
      change: -12.2,
      changeType: 'negative',
      period: 'Last 30 days'
    },
    {
      id: 'virtual-transaction-inflow',
      title: 'Value of Virtual Transaction Inflow',
      value: '3,459',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    }
  ];
  
  // Secondary metrics
  export const secondaryMetrics: DashboardMetric[] = [
    {
      id: 'distinctive-vnubans',
      title: 'Distinctive Active vNUBANs',
      value: '11,989',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'pending-notifications',
      title: 'Total Amount Pending Merchant Notification',
      value: '₦4,789,008.00',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'successful-amount',
      title: 'Total Successful Amount Collected',
      value: '₦7,567,900,890.87',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'payouts-processed',
      title: 'Total Payouts Processed',
      value: '₦10,567,900,890.87',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    }
  ];
  
  // Chart data for Merchants vNUBAN Summary
  export const merchantsChartData: ChartDataPoint[] = [
    { month: 'Jan', value: 115000 },
    { month: 'Feb', value: 118000 },
    { month: 'Mar', value: 112000 },
    { month: 'Apr', value: 108000 },
    { month: 'May', value: 198007 },
    { month: 'Jun', value: 125000 },
    { month: 'Jul', value: 135000 },
    { month: 'Aug', value: 145000 },
    { month: 'Sep', value: 165000 },
    { month: 'Oct', value: 185000 },
    { month: 'Nov', value: 175000 },
    { month: 'Dec', value: 155000 }
  ];
  
  // Chart data for Transaction Flow
  export const transactionFlowData: ChartDataPoint[] = [
    { month: 'Jan', value: 2000 },
    { month: 'Feb', value: 4500 },
    { month: 'Mar', value: 3200 },
    { month: 'Apr', value: 4800 },
    { month: 'May', value: 2800 },
    { month: 'Jun', value: 6100 },
    { month: 'Jul', value: 5200 },
    { month: 'Aug', value: 5800 },
    { month: 'Sep', value: 4600 },
    { month: 'Oct', value: 5400 },
    { month: 'Nov', value: 6200 },
    { month: 'Dec', value: 6800 }
  ];
  
  // Top merchants data
  export const topMerchants: MerchantData[] = [
    {
      id: '1',
      name: 'Stanley Mbaka .E.',
      email: 'stanleymbaka@gmail.com',
      amount: '₦16,015,900.00',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: '2',
      name: 'Kingsley Njoku .B.',
      email: 'njokukingsley@yahoo.com',
      amount: '₦13,997,060.00',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: '3',
      name: 'Fairefield .M. Wiston',
      email: 'fairefieldwiston@yahoo.com',
      amount: '₦10,870,000.00',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: '4',
      name: 'Mariah Kelly',
      email: 'mariahkelly.x@gmail.com',
      amount: '₦10,670,970.83',
      avatar: '/api/placeholder/32/32'
    }
  ];
  
  // Payout status data
  export const payoutData: PayoutData = {
    succeeded: 70970,
    failed: 1790,
    successAmount: '₦9,268,997,060.00',
    failedAmount: '₦1,790,900.00'
  };
  
  // Calculated rates
  export const payoutStats = {
    successRate: 95.67,
    failureRate: 4.33,
    total: payoutData.succeeded + payoutData.failed
  };
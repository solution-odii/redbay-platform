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

  
export const transactionData = [
  {
    sN: 1,
    merchant: "Uchenna Mbaka Chibuenze",
    vNUBAN: "1234567890",
    amount: 15000,
    status: "Successful",
    transactionID: "TXN1234568904725527...",
    webhookStatus: "N/A",
    timestamp: "25/06/04-03:17:37PM",
    action: "...",
    email: "uchenna.mbaka@gmail.com",
    sessionID: "SESS123456789",
    reference: "REF987654321",
    transactionType: "Payout",
    destination: { accountNumber: "0987654321", bank: "Access Bank", name: "Anthony Victor" },
    ipAddress: "192.168.1.1",
    deviceInfo: "Redmi A4 - Android",
    processingTime: "2.3 seconds",
    lastUpdated: "25/06/04-03:18:37PM",
  },
  {
    sN: 2,
    merchant: "Felix Babatunde Adebayo",
    vNUBAN: "5678901234",
    amount: 25000,
    status: "Failed",
    transactionID: "TXN9876543210859321...",
    webhookStatus: 200,
    timestamp: "25/06/04-03:17:37PM",
    action: "...",
    email: "felix.adebayo@gmail.com",
    sessionID: "SESS987654321",
    reference: "REF123456789",
    transactionType: "Payout",
    destination: { accountNumber: "1122334455", bank: "GTBank", name: "Felix Adebayo" },
    ipAddress: "10.0.0.5",
    deviceInfo: "iPhone 12 - iOS",
    processingTime: "1.8 seconds",
    lastUpdated: "25/06/04-03:18:37PM",
  },
  {
    sN: 3,
    merchant: "Janine Felicia",
    vNUBAN: "1234567890",
    amount: 15000,
    status: "Successful",
    transactionID: "TXN4567891230859321...",
    webhookStatus: 200,
    timestamp: "25/06/04-03:17:37AM",
    action: "...",
    email: "janine.felicia@gmail.com",
    sessionID: "SESS456789123",
    reference: "REF567890123",
    transactionType: "Payout",
    destination: { accountNumber: "5566778899", bank: "Zenith Bank", name: "Janine Felicia" },
    ipAddress: "172.16.254.1",
    deviceInfo: "Samsung S10 - Android",
    processingTime: "2.1 seconds",
    lastUpdated: "25/06/04-03:18:37AM",
  },
  {
    sN: 4,
    merchant: "Marcus Bradley",
    vNUBAN: "5678901234",
    amount: 115000,
    status: "Successful",
    transactionID: "TXN7891234560859321...",
    webhookStatus: 200,
    timestamp: "25/06/04-03:17:37PM",
    action: "...",
    email: "marcus.bradley@gmail.com",
    sessionID: "SESS789123456",
    reference: "REF147258369",
    transactionType: "Payout",
    destination: { accountNumber: "3344556677", bank: "First Bank", name: "Marcus Bradley" },
    ipAddress: "192.168.1.10",
    deviceInfo: "Huawei P30 - Android",
    processingTime: "2.5 seconds",
    lastUpdated: "25/06/04-03:18:37PM",
  },
  {
    sN: 5,
    merchant: "Antonio Mayeria",
    vNUBAN: "1178901234",
    amount: 15000,
    status: "Failed",
    transactionID: "TXN3216549870859321...",
    webhookStatus: "N/A",
    timestamp: "25/06/04-03:17:37PM",
    action: "...",
    email: "antonio.mayeria@gmail.com",
    sessionID: "SESS321654987",
    reference: "REF369258147",
    transactionType: "Payout",
    destination: { accountNumber: "7788990011", bank: "UBA", name: "Antonio Mayeria" },
    ipAddress: "10.0.0.15",
    deviceInfo: "iPhone 11 - iOS",
    processingTime: "1.9 seconds",
    lastUpdated: "25/06/04-03:18:37PM",
  },
  {
    sN: 6,
    merchant: "Justina Janice",
    vNUBAN: "5678901009",
    amount: 25000,
    status: "Pending",
    transactionID: "TXN1478523690859321...",
    webhookStatus: "N/A",
    timestamp: "25/06/04-03:17:37PM",
    action: "...",
    email: "justina.janice@gmail.com",
    sessionID: "SESS147852369",
    reference: "REF258147369",
    transactionType: "Payout",
    destination: { accountNumber: "1122334456", bank: "Access Bank", name: "Justina Janice" },
    ipAddress: "172.16.254.5",
    deviceInfo: "Samsung S20 - Android",
    processingTime: "2.0 seconds",
    lastUpdated: "25/06/04-03:18:37PM",
  },
  {
    sN: 7,
    merchant: "Sophia Okwuchi Anieche",
    vNUBAN: "1230087890",
    amount: 40000,
    status: "Failed",
    transactionID: "TXN3692581470859321...",
    webhookStatus: "N/A",
    timestamp: "25/06/04-03:17:37PM",
    action: "...",
    email: "sophia.anieche@gmail.com",
    sessionID: "SESS369258147",
    reference: "REF741852963",
    transactionType: "Payout",
    destination: { accountNumber: "4455667788", bank: "GTBank", name: "Sophia Anieche" },
    ipAddress: "192.168.1.20",
    deviceInfo: "iPhone 13 - iOS",
    processingTime: "2.2 seconds",
    lastUpdated: "25/06/04-03:18:37PM",
  },
  {
    sN: 8,
    merchant: "Patrick Peterside",
    vNUBAN: "1234560001",
    amount: 16790,
    status: "Successful",
    transactionID: "TXN2581473690859321...",
    webhookStatus: 200,
    timestamp: "25/06/04-03:17:37PM",
    action: "...",
    email: "patrick.peterside@gmail.com",
    sessionID: "SESS258147369",
    reference: "REF963852741",
    transactionType: "Payout",
    destination: { accountNumber: "6677889900", bank: "Zenith Bank", name: "Patrick Peterside" },
    ipAddress: "10.0.0.25",
    deviceInfo: "Redmi Note 10 - Android",
    processingTime: "2.4 seconds",
    lastUpdated: "25/06/04-03:18:37PM",
  },
  {
    sN: 9,
    merchant: "Henry Karvalei",
    vNUBAN: "2038901234",
    amount: 90000,
    status: "Pending",
    transactionID: "TXN7418529630859321...",
    webhookStatus: 400,
    timestamp: "25/06/04-03:17:37PM",
    action: "...",
    email: "henry.karvalei@gmail.com",
    sessionID: "SESS741852963",
    reference: "REF147369258",
    transactionType: "Payout",
    destination: { accountNumber: "8899001122", bank: "First Bank", name: "Henry Karvalei" },
    ipAddress: "172.16.254.10",
    deviceInfo: "Huawei Mate 20 - Android",
    processingTime: "2.6 seconds",
    lastUpdated: "25/06/04-03:18:37PM",
  },
  {
    sN: 10,
    merchant: "Kingsley King",
    vNUBAN: "4898901003",
    amount: 67850,
    status: "Successful",
    transactionID: "TXN9638527410859321...",
    webhookStatus: 200,
    timestamp: "25/06/04-03:17:37PM",
    action: "...",
    email: "kingsley.king@gmail.com",
    sessionID: "SESS963852741",
    reference: "REF369147258",
    transactionType: "Payout",
    destination: { accountNumber: "9900112233", bank: "UBA", name: "Kingsley King" },
    ipAddress: "192.168.1.15",
    deviceInfo: "iPhone 14 - iOS",
    processingTime: "2.3 seconds",
    lastUpdated: "25/06/04-03:18:37PM",
  },
  {
    sN: 11,
    merchant: "Kingsley King",
    vNUBAN: "4898901003",
    amount: 67850,
    status: "Pending",
    transactionID: "TXN8527419630859321...",
    webhookStatus: 200,
    timestamp: "25/06/04-03:17:37PM",
    action: "...",
    email: "kingsley.king@gmail.com",
    sessionID: "SESS852741963",
    reference: "REF258369147",
    transactionType: "Payout",
    destination: { accountNumber: "0011223344", bank: "Access Bank", name: "Kingsley King" },
    ipAddress: "10.0.0.30",
    deviceInfo: "Samsung S21 - Android",
    processingTime: "2.1 seconds",
    lastUpdated: "25/06/04-03:18:37PM",
  },
];



export const vNUBANData = [
  { sN: 1, merchant: "Uchenna Mbabka", vNUBAN: "1234567890", accountName: "Gabriella Daniels Chidinma", status: "Active", productType: "STATIC MED", customerReference: "REF1232345689047...", createdAt: "25/06/04 03:17:37PM", email: "uchenna.mbabka@gmail.com", accountType: "STATIC", creationIP: "192.168.1.1", deviceInfo: "Redmi A4+ Android", processingTime: "2.3 seconds" },
  { sN: 2, merchant: "Felix Adebayo", vNUBAN: "5678901234", accountName: "Gabriella Daniels Chidinma", status: "Inactive", productType: "STATIC HEIRINSUR...", customerReference: "REF1232345689047...", createdAt: "25/06/04 03:17:37PM", email: "felix.adebayo@gmail.com", accountType: "STATIC", creationIP: "192.168.1.2", deviceInfo: "Samsung Galaxy", processingTime: "1.8 seconds" },
  { sN: 3, merchant: "Janine Felicia", vNUBAN: "123467890", accountName: "Gabriella Daniels Chidinma", status: "Active", productType: "STATIC MED", customerReference: "REF1232345689047...", createdAt: "25/06/04 03:17:37AM", email: "janine.felicia@gmail.com", accountType: "STATIC", creationIP: "192.168.1.3", deviceInfo: "iPhone 12", processingTime: "2.0 seconds" },
  { sN: 4, merchant: "Marcus Bradley", vNUBAN: "5678901234", accountName: "Gabriella Daniels Chidinma", status: "Active", productType: "STATIC MED", customerReference: "REF1232345689047...", createdAt: "25/06/04 03:17:37PM", email: "marcus.bradley@gmail.com", accountType: "STATIC", creationIP: "192.168.1.4", deviceInfo: "Redmi A4+ Android", processingTime: "2.5 seconds" },
  { sN: 5, merchant: "Anthonio Mayeria", vNUBAN: "1178901234", accountName: "Gabriella Daniels Chidinma", status: "Active", productType: "STATIC HEIRINSUR...", customerReference: "REF1232345689047...", createdAt: "25/06/04 03:17:37PM", email: "anthonio.mayeria@gmail.com", accountType: "STATIC", creationIP: "192.168.1.5", deviceInfo: "Huawei P30", processingTime: "1.9 seconds" },
  { sN: 6, merchant: "Justina Janice", vNUBAN: "5678901009", accountName: "Gabriella Daniels Chidinma", status: "Inactive", productType: "STATIC HEIRINSUR...", customerReference: "REF1232345689047...", createdAt: "25/06/04 03:17:37PM", email: "justina.janice@gmail.com", accountType: "STATIC", creationIP: "192.168.1.6", deviceInfo: "iPhone 11", processingTime: "2.1 seconds" },
  { sN: 7, merchant: "Sophia Okwuchi", vNUBAN: "1230087890", accountName: "Gabriella Daniels Chidinma", status: "Active", productType: "STATIC MED", customerReference: "REF1232345689047...", createdAt: "25/06/04 03:17:37PM", email: "sophia.okwuchi@gmail.com", accountType: "STATIC", creationIP: "192.168.1.7", deviceInfo: "Redmi A4+ Android", processingTime: "2.4 seconds" },
  { sN: 8, merchant: "Patrick Peterside", vNUBAN: "1234560001", accountName: "Gabriella Daniels Chidinma", status: "Active", productType: "STATIC HEIRINSUR...", customerReference: "REF1232345689047...", createdAt: "25/06/04 03:17:37PM", email: "patrick.peterside@gmail.com", accountType: "STATIC", creationIP: "192.168.1.8", deviceInfo: "Samsung Galaxy", processingTime: "2.0 seconds" },
  { sN: 9, merchant: "Henry Karvalei", vNUBAN: "2038901234", accountName: "Gabriella Daniels Chidinma", status: "Active", productType: "STATIC MED", customerReference: "REF1232345689047...", createdAt: "25/06/04 03:17:37PM", email: "henry.karvalei@gmail.com", accountType: "STATIC", creationIP: "192.168.1.9", deviceInfo: "iPhone 13", processingTime: "2.2 seconds" },
  { sN: 10, merchant: "Kingsley King", vNUBAN: "4898901003", accountName: "Gabriella Daniels Chidinma", status: "Inactive", productType: "STATIC MED", customerReference: "REF1232345689047...", createdAt: "25/06/04 03:17:37PM", email: "kingsley.king@gmail.com", accountType: "STATIC", creationIP: "192.168.1.10", deviceInfo: "Redmi A4+ Android", processingTime: "2.3 seconds" },
  { sN: 11, merchant: "Kingsley King", vNUBAN: "4898901003", accountName: "Gabriella Daniels Chidinma", status: "Inactive", productType: "STATIC MED", customerReference: "REF1232345689047...", createdAt: "25/06/04 03:17:37PM", email: "kingsley.king@gmail.com", accountType: "STATIC", creationIP: "192.168.1.10", deviceInfo: "Redmi A4+ Android", processingTime: "2.3 seconds" },
];




export const merchantData = [
  {
    sN: 1,
    merchantName: "Uchenna Chiagozie",
    code: "90886",
    accountName: "Gabriela Daniels ",
    accountNumber: "5678901234",
    primaryContact: "Kenneth Jared A...",
    status: "Active",
    noOfUsers: 12,
    createdAt: "25/06/04-03:17:37PM",
  },
  {
    sN: 2,
    merchantName: "Felix  Adebayo",
    code: "24097",
    accountName: "Gabriela Daniels ",
    accountNumber: "0078901234",
    primaryContact: "Kenneth Jared A...",
    status: "Inactive",
    noOfUsers: 24,
    createdAt: "25/06/04-03:17:37PM",
  },
  {
    sN: 3,
    merchantName: "Janine Felicia",
    code: "34900",
    accountName: "Gabriela Daniels ",
    accountNumber: "3478901234",
    primaryContact: "Kenneth Jared A...",
    status: "Active",
    noOfUsers: 120900,
    createdAt: "25/06/04-03:17:37AM",
  },
  {
    sN: 4,
    merchantName: "Marcus Bradley",
    code: "40076",
    accountName: "Gabriela Daniels ",
    accountNumber: "9078901234",
    primaryContact: "Kenneth Jared A...",
    status: "Active",
    noOfUsers: 102,
    createdAt: "25/06/04-03:17:37PM",
  },
  {
    sN: 5,
    merchantName: "Antonio Mayeria",
    code: "89000",
    accountName: "Gabriela Daniels ",
    accountNumber: "5868901234",
    primaryContact: "Kenneth Jared A...",
    status: "Active",
    noOfUsers: 1890,
    createdAt: "25/06/04-03:17:37PM",
  },
  {
    sN: 6,
    merchantName: "Justina Janice",
    code: "00921",
    accountName: "Gabriela Daniels",
    accountNumber: "5478901234",
    primaryContact: "Kenneth Jared A...",
    status: "Inactive",
    noOfUsers: 26,
    createdAt: "25/06/04-03:17:37PM",
  },
  {
    sN: 7,
    merchantName: "Patrick Nancy",
    code: "03929",
    accountName: "Gabriela Daniels ",
    accountNumber: "5018905909",
    primaryContact: "Kenneth Jared A...",
    status: "Inactive",
    noOfUsers: 290,
    createdAt: "25/06/04-03:17:37PM",
  },
  {
    sN: 8,
    merchantName: "Patrick Peterside",
    code: "00925",
    accountName: "Gabriela Daniels ",
    accountNumber: "5008902909",
    primaryContact: "Kenneth Jared A...",
    status: "Active",
    noOfUsers: 290,
    createdAt: "25/06/04-03:17:37PM",
  },
  {
    sN: 9,
    merchantName: "Henry Karvalei",
    code: "22389",
    accountName: "Gabriela Daniels ",
    accountNumber: "0078901234",
    primaryContact: "Kenneth Jared A...",
    status: "Active",
    noOfUsers: 890,
    createdAt: "25/06/04-03:17:37PM",
  },
  {
    sN: 10,
    merchantName: "Kingsley King",
    code: "55671",
    accountName: "Gabriela Daniels ",
    accountNumber: "114890190",
    primaryContact: "Kenneth Jared A...",
    status: "Inactive",
    noOfUsers: 9,
    createdAt: "25/06/04-03:17:37PM",
  },
  {
    sN: 11,
    merchantName: "Kingsley Davee",
    code: "55671",
    accountName: "Gabriela Daniels ",
    accountNumber: "114890190",
    primaryContact: "Kenneth Jared A...",
    status: "Active",
    noOfUsers: 9,
    createdAt: "25/06/04-03:17:37PM",
  },
  // Add more entries as needed to reach 14,098 (e.g., duplicate or generate more)
];


import { Machine, WorkOrder } from '../types';

export const MACHINES: Machine[] = [
  { id: 'M-01', name: 'Machine A', displayName: '機台 A', status: 'active' },
  { id: 'M-02', name: 'Machine B', displayName: '機台 B', status: 'active' },
  { id: 'M-03', name: 'Machine C', displayName: '機台 C', status: 'active' },
];

export const PROGRESS_MESSAGES = [
  '正在解析 CSV 檔案...',
  '正在分析工單優先級...',
  '正在計算最佳排程路徑...',
  '正在優化機台負載...',
  '正在生成甘特圖資料...',
  '排程模擬完成！',
];

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

// Helper to create date
const getDate = (hour: number, minute: number = 0) => new Date(year, month, day, hour, minute);

export const DEMO_ORDERS: WorkOrder[] = [
  // Machine A
  {
    id: '1',
    orderId: 'MO-2026001',
    resourceId: 'M-01',
    product: '產品 A',
    title: 'MO-2026001 (產品 A)',
    start: getDate(8, 0),
    end: getDate(12, 0),
    type: 'normal',
    color: '#1890ff',
  },
  {
    id: '2',
    orderId: 'Urgent-001',
    resourceId: 'M-01',
    product: '急件 X',
    title: 'Urgent-001 (急件 X)',
    start: getDate(13, 0),
    end: getDate(15, 30),
    type: 'urgent',
    color: '#ff4d4f',
  },
  {
    id: '3',
    orderId: 'MO-2026002',
    resourceId: 'M-01',
    product: '產品 B',
    title: 'MO-2026002 (產品 B)',
    start: getDate(16, 0),
    end: getDate(18, 0),
    type: 'normal',
    color: '#1890ff',
  },

  // Machine B
  {
    id: '4',
    orderId: 'MO-2026003',
    resourceId: 'M-02',
    product: '產品 C',
    title: 'MO-2026003 (產品 C)',
    start: getDate(8, 30),
    end: getDate(11, 30),
    type: 'normal',
    color: '#1890ff',
  },
  {
    id: '5',
    orderId: 'Sample-001',
    resourceId: 'M-02',
    product: '樣品 Y',
    title: 'Sample-001 (樣品 Y)',
    start: getDate(12, 30),
    end: getDate(14, 0),
    type: 'sample',
    color: '#52c41a',
  },
  {
    id: '6',
    orderId: 'MO-2026004',
    resourceId: 'M-02',
    product: '產品 D',
    title: 'MO-2026004 (產品 D)',
    start: getDate(14, 30),
    end: getDate(17, 30),
    type: 'normal',
    color: '#1890ff',
  },

  // Machine C
  {
    id: '7',
    orderId: 'MO-2026005',
    resourceId: 'M-03',
    product: '產品 E',
    title: 'MO-2026005 (產品 E)',
    start: getDate(9, 0),
    end: getDate(13, 0),
    type: 'normal',
    color: '#1890ff',
  },
  {
    id: '8',
    orderId: 'MO-2026006',
    resourceId: 'M-03',
    product: '產品 F',
    title: 'MO-2026006 (產品 F)',
    start: getDate(14, 0),
    end: getDate(16, 0),
    type: 'normal',
    color: '#1890ff',
  },
  {
    id: '9',
    orderId: 'Urgent-002',
    resourceId: 'M-03',
    product: '急件 Z',
    title: 'Urgent-002 (急件 Z)',
    start: getDate(16, 30),
    end: getDate(18, 30),
    type: 'urgent',
    color: '#ff4d4f',
  },
];

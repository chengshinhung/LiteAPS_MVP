# Contracts: LiteAPS 排程模組 PoC 系統

**Feature Branch**: `001-scheduling-poc`
**Date**: 2026-01-03
**Status**: Complete

## Overview

由於 PoC 為純前端靜態網站，不包含真實後端 API。本文件定義內部資料介面與元件合約，確保前端模組間的一致性。

---

## Internal Interfaces

### 1. Mock Data Service Interface

定義資料存取層的介面，便於未來轉換為真實 API。

```typescript
// src/services/dataService.ts

export interface DataService {
  /**
   * 取得所有機台資料
   */
  getMachines(): Machine[];

  /**
   * 取得所有工單資料 (模擬排程結果)
   */
  getScheduledOrders(): WorkOrder[];

  /**
   * 模擬檔案上傳
   * @param file 上傳的檔案 (PoC 中不實際處理)
   * @returns 模擬的解析結果
   */
  mockUpload(file: File): Promise<UploadResult>;

  /**
   * 執行模擬排程
   * @param onProgress 進度回調
   * @returns 排程結果
   */
  simulateScheduling(onProgress: (progress: SimulationProgress) => void): Promise<WorkOrder[]>;
}

export interface UploadResult {
  success: boolean;
  message: string;
  orderCount: number;
}

export interface SimulationProgress {
  percent: number;
  message: string;
  step: number;
  totalSteps: number;
}
```

---

### 2. Component Props Contracts

#### GanttChart Component

```typescript
// src/components/GanttChart/types.ts

export interface GanttChartProps {
  /** 工單資料陣列 */
  data: WorkOrder[];
  
  /** 圖表高度 (px) */
  height?: number;
  
  /** 是否顯示載入狀態 */
  loading?: boolean;
  
  /** 工單點擊事件 */
  onOrderClick?: (order: WorkOrder) => void;
  
  /** 圖表選項覆寫 */
  options?: Partial<TimelineChartOptions>;
}

export interface TimelineChartOptions {
  timeline: {
    showRowLabels: boolean;
    colorByRowLabel: boolean;
    groupByRowLabel: boolean;
    showBarLabels: boolean;
  };
  colors: string[];
  backgroundColor: string;
}
```

#### FileUploader Component

```typescript
// src/components/FileUploader/types.ts

export interface FileUploaderProps {
  /** 上傳成功回調 */
  onUploadSuccess: (result: UploadResult) => void;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 接受的檔案類型 */
  accept?: string;
  
  /** 按鈕文字 */
  buttonText?: string;
}
```

#### SimulationProgress Component

```typescript
// src/components/SimulationProgress/types.ts

export interface SimulationProgressProps {
  /** 是否顯示 */
  visible: boolean;
  
  /** 進度百分比 (0-100) */
  percent: number;
  
  /** 目前訊息 */
  message: string;
}
```

---

### 3. Page State Contracts

#### SimulationView State

```typescript
// src/pages/Simulation/types.ts

export interface SimulationViewState {
  /** 目前步驟 */
  step: SimulationStep;
  
  /** 是否已上傳 */
  isUploaded: boolean;
  
  /** 是否正在模擬 */
  isSimulating: boolean;
  
  /** 模擬進度 */
  progress: number;
  
  /** 進度訊息 */
  progressMessage: string;
  
  /** 排程結果資料 */
  scheduleData: WorkOrder[] | null;
}

export type SimulationStep = 'upload' | 'simulate' | 'result';

export interface SimulationViewActions {
  handleUploadSuccess: (result: UploadResult) => void;
  handleStartSimulation: () => void;
  handleSimulationComplete: (data: WorkOrder[]) => void;
  handleReset: () => void;
}
```

---

### 4. Navigation Contract

```typescript
// src/config/navigation.ts

export interface NavItem {
  key: string;
  path: string;
  label: string;
  icon: React.ReactNode;
  disabled: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: 'dashboard',
    path: '/dashboard',
    label: '儀表板',
    icon: <DashboardOutlined />,
    disabled: true,  // 裝飾用
  },
  {
    key: 'simulation',
    path: '/simulation',
    label: '排程模擬',
    icon: <ThunderboltOutlined />,
    disabled: false,  // 可點擊
  },
  {
    key: 'resources',
    path: '/resources',
    label: '資源管理',
    icon: <SettingOutlined />,
    disabled: true,  // 裝飾用
  },
];
```

---

### 5. Theme Contract

```typescript
// src/config/theme.ts

export const COLORS = {
  // 工單類型顏色
  orderNormal: '#1890ff',   // 藍色
  orderUrgent: '#ff4d4f',   // 紅色
  orderSample: '#52c41a',   // 綠色
  
  // 品牌顏色
  primary: '#1890ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  
  // 背景
  background: '#f0f2f5',
  cardBackground: '#ffffff',
} as const;

export const LAYOUT = {
  siderWidth: 200,
  siderCollapsedWidth: 80,
  headerHeight: 64,
} as const;
```

---

## Mock Data Contract

### Demo Orders Schema

```typescript
// src/data/mockGanttData.ts

export const DEMO_ORDERS: WorkOrder[] = [
  // ========== Machine A (M-01) - 高效率滿載 ==========
  {
    id: '1',
    orderId: 'MO-2026001',
    resourceId: 'M-01',
    product: 'A產品',
    title: 'MO-2026001 (A產品)',
    start: new Date(2026, 0, 3, 8, 0),
    end: new Date(2026, 0, 3, 12, 0),
    type: 'normal',
    color: '#1890ff',
    quantity: 500,
    customer: '甲客戶',
  },
  {
    id: '2',
    orderId: 'MO-2026002',
    resourceId: 'M-01',
    product: 'A產品',
    title: 'MO-2026002 (A產品)',
    start: new Date(2026, 0, 3, 13, 0),
    end: new Date(2026, 0, 3, 17, 0),
    type: 'normal',
    color: '#1890ff',
    quantity: 400,
    customer: '乙客戶',
  },
  
  // ========== Machine B (M-02) - 插入急單 ==========
  {
    id: '3',
    orderId: 'Urgent-001',
    resourceId: 'M-02',
    product: '樣品',
    title: 'Urgent-001 (樣品)',
    start: new Date(2026, 0, 3, 9, 0),
    end: new Date(2026, 0, 3, 11, 0),
    type: 'urgent',
    color: '#ff4d4f',
    quantity: 50,
    customer: '急件客戶',
  },
  {
    id: '4',
    orderId: 'MO-2026003',
    resourceId: 'M-02',
    product: 'B產品',
    title: 'MO-2026003 (B產品)',
    start: new Date(2026, 0, 3, 11, 0),
    end: new Date(2026, 0, 3, 16, 0),
    type: 'normal',
    color: '#1890ff',
    quantity: 600,
    customer: '丙客戶',
  },
  
  // ========== Machine C (M-03) - 較輕負載 ==========
  {
    id: '5',
    orderId: 'MO-2026004',
    resourceId: 'M-03',
    product: 'C產品',
    title: 'MO-2026004 (C產品)',
    start: new Date(2026, 0, 3, 8, 0),
    end: new Date(2026, 0, 3, 10, 0),
    type: 'sample',
    color: '#52c41a',
    quantity: 100,
    customer: '樣品客戶',
  },
  {
    id: '6',
    orderId: 'MO-2026005',
    resourceId: 'M-03',
    product: 'C產品',
    title: 'MO-2026005 (C產品)',
    start: new Date(2026, 0, 3, 10, 30),
    end: new Date(2026, 0, 3, 14, 0),
    type: 'normal',
    color: '#1890ff',
    quantity: 350,
    customer: '丁客戶',
  },
];
```

---

## Event Flow Contract

### User Interaction Sequence

```
User Action                 Component                Handler                  State Change
──────────────────────────────────────────────────────────────────────────────────────────
Click Upload Button    →    FileUploader         →   handleUploadSuccess  →   isUploaded: true
                                                                              step: 'simulate'

Click Simulate Button  →    SimulationView       →   handleStartSimulation →  isSimulating: true
                                                                              progress: 0

Progress Update        →    SimulationProgress   →   (setInterval)        →   progress: 25, 50, 75...
                                                                              progressMessage: rotates

Simulation Complete    →    SimulationView       →   handleSimulationComplete → step: 'result'
                                                                                scheduleData: WorkOrder[]

Hover Order Block      →    GanttChart           →   (native tooltip)     →   (UI only)
```

---

## Summary

| Contract Type | File | Purpose |
|---------------|------|---------|
| DataService | `services/dataService.ts` | Mock 資料存取介面 |
| GanttChartProps | `components/GanttChart/types.ts` | 甘特圖元件合約 |
| FileUploaderProps | `components/FileUploader/types.ts` | 上傳元件合約 |
| SimulationViewState | `pages/Simulation/types.ts` | 頁面狀態合約 |
| NavItem | `config/navigation.ts` | 導航配置合約 |
| Theme | `config/theme.ts` | 樣式配置合約 |

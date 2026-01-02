# Data Model: LiteAPS 排程模組 PoC 系統

**Feature Branch**: `001-scheduling-poc`
**Date**: 2026-01-03
**Status**: Complete

## Overview

本文件定義 PoC 系統的資料模型。由於 PoC 為純前端模擬，所有資料皆為硬編碼 (hardcoded) mock 資料，無資料庫儲存。

---

## Core Entities

### 1. WorkOrder (工單)

代表一筆排程任務，是甘特圖的核心資料單位。

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ | 唯一識別碼 (e.g., "1", "2") |
| `orderId` | `string` | ✅ | 工單編號 (e.g., "MO-2026001") |
| `resourceId` | `string` | ✅ | 機台 ID (e.g., "M-01") |
| `product` | `string` | ✅ | 產品名稱 (e.g., "A產品") |
| `title` | `string` | ✅ | 顯示標題 (e.g., "MO-2026001 (A產品)") |
| `start` | `Date` | ✅ | 開始時間 |
| `end` | `Date` | ✅ | 結束時間 |
| `type` | `OrderType` | ✅ | 工單類型 |
| `color` | `string` | ✅ | 顯示顏色 (hex) |
| `quantity` | `number` | ❌ | 生產數量 |
| `customer` | `string` | ❌ | 客戶名稱 |

#### TypeScript Definition

```typescript
export type OrderType = 'normal' | 'urgent' | 'sample';

export interface WorkOrder {
  id: string;
  orderId: string;
  resourceId: string;
  product: string;
  title: string;
  start: Date;
  end: Date;
  type: OrderType;
  color: string;
  quantity?: number;
  customer?: string;
}
```

#### Validation Rules
- `start` 必須早於 `end`
- `orderId` 格式: `MO-YYYYNNN` 或 `Urgent-NNN`
- `color` 必須為有效 hex 顏色碼

#### Color Mapping
| Type | Color | Hex |
|------|-------|-----|
| normal | 藍色 | `#1890ff` |
| urgent | 紅色 | `#ff4d4f` |
| sample | 綠色 | `#52c41a` |

---

### 2. Machine (機台)

代表生產資源，作為甘特圖 Y 軸分類依據。

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ | 機台 ID (e.g., "M-01") |
| `name` | `string` | ✅ | 機台代碼 (e.g., "Machine A") |
| `displayName` | `string` | ✅ | 顯示名稱 (e.g., "機台 A") |
| `status` | `MachineStatus` | ❌ | 機台狀態 |

#### TypeScript Definition

```typescript
export type MachineStatus = 'active' | 'maintenance' | 'idle';

export interface Machine {
  id: string;
  name: string;
  displayName: string;
  status?: MachineStatus;
}
```

---

### 3. SimulationState (模擬狀態)

管理模擬流程的 UI 狀態。

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `step` | `SimulationStep` | ✅ | 目前步驟 |
| `isUploaded` | `boolean` | ✅ | 是否已上傳檔案 |
| `isSimulating` | `boolean` | ✅ | 是否正在模擬 |
| `progress` | `number` | ✅ | 模擬進度 (0-100) |
| `currentMessage` | `string` | ✅ | 目前顯示訊息 |

#### TypeScript Definition

```typescript
export type SimulationStep = 
  | 'idle'       // 初始狀態
  | 'uploaded'   // 已上傳
  | 'simulating' // 模擬中
  | 'completed'; // 完成

export interface SimulationState {
  step: SimulationStep;
  isUploaded: boolean;
  isSimulating: boolean;
  progress: number;
  currentMessage: string;
}
```

---

### 4. NavigationItem (導航項目)

側邊欄導航選單項目。

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `key` | `string` | ✅ | 路由 key |
| `label` | `string` | ✅ | 顯示文字 |
| `icon` | `React.ReactNode` | ❌ | 圖示元件 |
| `path` | `string` | ✅ | 路由路徑 |
| `disabled` | `boolean` | ✅ | 是否禁用 |

#### TypeScript Definition

```typescript
export interface NavigationItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  path: string;
  disabled: boolean;
}
```

---

## Google Charts Data Format

### Timeline Data Row

Google Charts Timeline 需要特定格式的資料陣列。

```typescript
// 4 欄格式 (基本)
export type TimelineDataRow = [
  string,  // Column 0: Row Label (Machine)
  string,  // Column 1: Bar Label (Task Name)
  Date,    // Column 2: Start Time
  Date     // Column 3: End Time
];

// 5 欄格式 (含 Tooltip)
export type TimelineDataRowWithTooltip = [
  string,  // Column 0: Row Label (Machine)
  string,  // Column 1: Bar Label (Task Name)
  string,  // Column 2: Custom Tooltip
  Date,    // Column 3: Start Time
  Date     // Column 4: End Time
];
```

### Data Conversion

```typescript
export function workOrderToTimelineRow(order: WorkOrder): TimelineDataRow {
  return [
    order.resourceId,
    order.title,
    order.start,
    order.end,
  ];
}

export function workOrdersToTimelineData(orders: WorkOrder[]): TimelineDataRow[] {
  return orders.map(workOrderToTimelineRow);
}
```

---

## Mock Data Schema

### mockGanttData.ts Structure

```typescript
// src/data/mockGanttData.ts

import { WorkOrder, Machine } from '@/types';

export const MACHINES: Machine[] = [
  { id: 'M-01', name: 'Machine A', displayName: '機台 A' },
  { id: 'M-02', name: 'Machine B', displayName: '機台 B' },
  { id: 'M-03', name: 'Machine C', displayName: '機台 C' },
];

export const DEMO_ORDERS: WorkOrder[] = [
  // Machine A - 高效率滿載
  {
    id: '1',
    orderId: 'MO-2026001',
    resourceId: 'M-01',
    product: 'A產品',
    title: 'MO-2026001 (A產品)',
    start: new Date(2026, 0, 3, 8, 0),   // 08:00
    end: new Date(2026, 0, 3, 12, 0),    // 12:00
    type: 'normal',
    color: '#1890ff',
    quantity: 500,
    customer: '甲客戶',
  },
  // ... more orders
];
```

---

## State Transitions

### Simulation Flow

```
┌─────────┐   upload    ┌──────────┐   simulate   ┌────────────┐   complete   ┌───────────┐
│  idle   │ ─────────▶ │ uploaded │ ──────────▶ │ simulating │ ──────────▶ │ completed │
└─────────┘             └──────────┘              └────────────┘              └───────────┘
                                                        │
                                                        │ (2-3 seconds)
                                                        ▼
                                                 Progress: 0% → 100%
                                                 Messages rotate
```

### Progress Messages (每 0.8 秒輪播)

```typescript
export const PROGRESS_MESSAGES = [
  '正在載入機台參數...',
  '正在偵測交期衝突...',
  '正在進行啟發式演算法優化...',
  '正在計算最佳排程方案...',
  '正在生成甘特圖資料...',
];
```

---

## CSV Import Schema (模擬)

雖然 PoC 不實際解析 CSV，但定義預期格式以便未來擴展：

| Column | Name | Type | Description |
|--------|------|------|-------------|
| A | 工單編號 | string | e.g., "MO-2026001" |
| B | 產品名稱 | string | e.g., "A產品" |
| C | 機台 | string | e.g., "M-01" |
| D | 開始時間 | datetime | e.g., "2026-01-03 08:00" |
| E | 結束時間 | datetime | e.g., "2026-01-03 12:00" |
| F | 類型 | string | "normal" / "urgent" / "sample" |
| G | 數量 | number | e.g., 500 |
| H | 客戶 | string | e.g., "甲客戶" |

---

## Entity Relationship Diagram

```
┌──────────────┐         ┌─────────────┐
│   Machine    │ 1     n │  WorkOrder  │
├──────────────┤◀────────┤─────────────┤
│ id           │         │ id          │
│ name         │         │ orderId     │
│ displayName  │         │ resourceId  │──────▶ Machine.id
│ status?      │         │ product     │
└──────────────┘         │ title       │
                         │ start       │
                         │ end         │
                         │ type        │
                         │ color       │
                         │ quantity?   │
                         │ customer?   │
                         └─────────────┘
```

---

## Summary

| Entity | Purpose | Storage |
|--------|---------|---------|
| WorkOrder | 甘特圖工單資料 | Mock JSON |
| Machine | 機台資源定義 | Mock JSON |
| SimulationState | UI 狀態管理 | React State |
| NavigationItem | 導航配置 | Constants |

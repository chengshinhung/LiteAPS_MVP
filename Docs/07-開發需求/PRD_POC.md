# 產品需求文件 (PRD): LiteAPS - 概念驗證版 (PoC)

**專案名稱**：LiteAPS Visual Prototype (視覺原型)
**版本**：v0.1 (PoC Edition)
**狀態**：準備開發 (Ready for Dev)
**日期**：2026-01-03
**目標受眾**：內部高階主管、潛在利害關係人
**部署平台**：GitHub Pages (Static Web Hosting)

## 1. 專案概述 (Executive Summary)

### 1.1 核心目標

本階段不涉及真實後端邏輯與資料庫開發。目標是建立一個**「高擬真度 (High-Fidelity) 的互動網頁」**，用於：

1. **具像化願景**：將抽象的「排程演算法」轉化為主管看得見的「甘特圖互動」。
2. **驗證體驗**：確認「上傳 -> 等待 -> 結果」的操作流程符合生管人員直覺。
3. **爭取資源**：證明 Web 架構的可行性，為後續 MVP (IIS 部署) 爭取開發預算。

### 1.2 "Smoke & Mirrors" 策略 (煙霧與鏡子)

本系統將採用 **「前端模擬 (Frontend Mocking)」** 策略。

* **看起來**：像是一個正在進行複雜 AI 運算的雲端系統。
* **實際上**：所有運算結果皆為預先寫死 (Hardcoded) 的 JSON 資料，利用 `setTimeout` 模擬運算延遲。

---

## 2. 使用者流程 (User Journey)

演示過程應設計為一場 3 分鐘的標準劇本：

1. **場景一：啟動 (The Hook)**
* 使用者進入首頁，看到簡潔專業的 Dashboard 介面，感受到與傳統 ERP 截然不同的現代感。


2. **場景二：輸入 (The Input)**
* 使用者點擊「匯入排程工單 (CSV)」。
* 系統立即回饋「解析成功：讀取 150 筆工單」，建立信任感。


3. **場景三：黑盒子 (The Magic)**
* 使用者按下「執行 AI 模擬」。
* 系統顯示跑馬燈與進度條（模擬計算衝突、最佳化產能）。這段時間（約 2-3 秒）用於製造期待感。


4. **場景四：成果 (The Reveal)**
* 畫面切換至互動式甘特圖。
* 展示一個「甚至比 Excel 還好用」的拖拉介面（雖然 PoC 階段可能僅展示唯讀或有限拖拉）。



---

## 3. 功能需求 (Functional Requirements)

### 3.1 介面框架 (App Shell)

* **FR-01 響應式佈局**：採用 Ant Design 的 `Layout`，包含左側導航欄 (Sidebar) 與頂部標題列 (Header)。
* *Sidebar 項目*：儀表板 (Dashboard)、排程模擬 (Simulation)、資源管理 (Resources)。(僅 "排程模擬" 可點擊，其餘作為裝飾)。



### 3.2 資料匯入模擬 (Mock Ingestion)

* **FR-02 檔案上傳器**：
* 使用 Ant Design `Upload` 元件。
* **邏輯**：不實際將檔案傳到伺服器。只要前端偵測到檔案選取，隨即顯示 `status: 'done'` 並彈出成功提示 (Toast Notification)。
* *Demo 話術*：「系統支援標準 CSV 格式，無論是 ERP 匯出還是 Excel 手打皆可相容。」



### 3.3 運算過程模擬 (Mock Simulation)

* **FR-03 智能運算按鈕**：
* 設計一個顯眼的 CTA 按鈕 (Call to Action)，例如「開始排程最佳化」。
* 點擊後進入 `Loading` 狀態，鎖定畫面。


* **FR-04 進度回饋**：
* 顯示 `Spin` (讀取圈) 或 `Progress` (進度條)。
* **動態文字輪播**：每隔 0.8 秒切換提示文字：「正在載入機台參數...」 -> 「正在偵測交期衝突...」 -> 「正在進行啟發式演算法優化...」。



### 3.4 視覺化結果 (Visualization)

* **FR-05 甘特圖展示**：
* 使用 `react-google-charts` 或 `vis-timeline`。
* **資料來源**：讀取本地 `mockData.ts` 檔案。
* **展示內容**：
* Y 軸：機台 (Machine A, B, C)。
* X 軸：時間 (日期/小時)。
* 圖塊：不同顏色的工單 (正常單=藍色, 急單=紅色)。




* **FR-06 簡單互動 (Optional)**：
* 滑鼠移到圖塊上顯示 Tooltip (工單詳情：產品、數量、客戶)。
* 若技術行有餘力，開啟「圖表縮放 (Zoom)」功能。



---

## 4. 技術規格與實作指引 (Technical Specs)

### 4.1 技術堆疊 (Tech Stack)

* **Core**: React 18 + TypeScript + Vite
* **UI Framework**: Ant Design 5.0 (提供現成的 Upload, Button, Layout, Timeline)
* **Routing**: `react-router-dom` (注意：GitHub Pages 需使用 `HashRouter` 而非 `BrowserRouter`，避免重整後 404 錯誤)
* **Hosting**: GitHub Pages (透過 `gh-pages` npm套件部署)

### 4.2 專案結構建議

```text
/src
  /assets       # 存放 Logo 圖片
  /components   # 共用元件 (Header, Sidebar)
  /pages
    /Simulation # 主要演示頁面
      SimulationView.tsx
  /data
    mockGanttData.ts  # 這裡存放寫死的甘特圖資料 (這是核心資產！)
  App.tsx

```

### 4.3 關鍵 Mock 資料結構 (mockGanttData.ts)

為了讓主管覺得「這不是玩具」，假資料必須**看起來很真實**。

```typescript
// 範例：設計一個「原本有衝突，被 AI 修好」的場景
export const DEMO_DATA = [
  // 機台 1：塞滿滿，效率高
  { id: '1', resourceId: 'M-01', start: '2026-01-03T08:00:00', end: '2026-01-03T12:00:00', title: 'MO-2026001 (A產品)', color: '#1890ff' },
  { id: '2', resourceId: 'M-01', start: '2026-01-03T13:00:00', end: '2026-01-03T17:00:00', title: 'MO-2026002 (A產品)', color: '#1890ff' },
  
  // 機台 2：中間插了一張急單 (紅色)
  { id: '3', resourceId: 'M-02', start: '2026-01-03T09:00:00', end: '2026-01-03T11:00:00', title: 'Urgent-001 (樣品)', color: '#ff4d4f' },
  { id: '4', resourceId: 'M-02', start: '2026-01-03T11:00:00', end: '2026-01-03T16:00:00', title: 'MO-2026003 (B產品)', color: '#52c41a' },
];

```

---

## 5. 執行路徑 (Action Plan)

1. **Day 1 (Setup)**:
* 使用 Vite 建立 React 專案。
* 安裝 Ant Design 與 `gh-pages`。
* 建立 GitHub Repository 並成功部署 Hello World 頁面。


2. **Day 2 (UI Build)**:
* 刻出 Dashboard 框架。
* 實作「假上傳」與「假進度條」邏輯。


3. **Day 3 (Data & Chart)**:
* 寫入 `mockGanttData.ts`。
* 整合 Chart Library 顯示資料。
* **驗收點**：自己跑一遍流程，確認看起來像真的一樣。



---

### 架構師的特別叮嚀 (Grandmaster's Note)

在使用 GitHub Pages 時，有一個常見的坑請務必注意：

**關於路由 (Routing) 的陷阱**：
GitHub Pages 不支援 SPA 的 History API (也就是 `yourname.github.io/simulation` 這種路徑，重整會報 404)。
**解決方案**：
在 `App.tsx` 中，請務必使用 `HashRouter`：

```tsx
import { HashRouter, Routes, Route } from 'react-router-dom';

// ... inside App component
<HashRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    {/* ... */}
  </Routes>
</HashRouter>

```

這樣網址會變成 `yourname.github.io/#/simulation`，雖然醜一點點，但在 PoC 階段保證能穩定運作，不會在演示時出包。

祝你的 PoC 演示大獲全勝！
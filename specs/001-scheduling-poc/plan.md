# Implementation Plan: LiteAPS 排程模組 PoC 系統

**Branch**: `001-scheduling-poc` | **Date**: 2026-01-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-scheduling-poc/spec.md`

## Summary

建立一個高擬真度的互動網頁原型，用於向高階主管展示 LiteAPS 排程系統的願景。系統採用「前端模擬」策略（Smoke & Mirrors），使用 React + TypeScript + Vite 技術堆疊，透過預設 JSON 資料與 setTimeout 模擬 AI 排程運算過程，最終以 react-google-charts 呈現互動式甘特圖。部署目標為 GitHub Pages 靜態網頁託管。

## Technical Context

**Language/Version**: TypeScript 5.x + React 18+
**Primary Dependencies**: React 18, Vite, Ant Design 5.0, react-google-charts, react-router-dom
**Storage**: N/A（純前端，使用本地 JSON mock 資料）
**Testing**: Vitest + React Testing Library（基礎驗證）
**Target Platform**: Web（GitHub Pages 靜態託管）
**Project Type**: web（純前端 SPA）
**Performance Goals**: 首頁載入 <3 秒，甘特圖渲染 <1 秒，UI 互動回應 <100ms
**Constraints**: 純靜態部署、HashRouter 路由、離線可運作、現代瀏覽器（Chrome 90+, Edge 90+, Firefox 88+）
**Scale/Scope**: 10-15 筆工單、3 台機台、單一展示頁面流程

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Data Agnosticism ✅ PASS
- **Input Democracy**: 系統提供 CSV 上傳介面，支援任意來源資料（雖為模擬）
- **Decoupling**: PoC 不依賴任何 ERP 供應商邏輯，使用通用資料模型
- **Schema Transparency**: Mock 資料結構明確定義於 `mockGanttData.ts`

### II. Human Sovereignty & Hybrid Intelligence ✅ PASS
- **Decision Hierarchy**: PoC 展示「AI 計算 → 人工查看」流程
- **No Black Boxes**: 甘特圖 Tooltip 顯示排程詳情，結果可視化透明

### III. User Experience & Latency Zero ✅ PASS
- **Optimistic UI**: 檔案上傳立即顯示成功回饋
- **Background Computation**: 使用進度條與動態文字模擬運算過程
- **Perceived Performance**: 2-3 秒模擬期間提供教育性提示文字輪播

### IV. Observability & Transparency ✅ PASS
- **Explainable Results**: 甘特圖清楚展示機台分配與時間安排
- **Scenario Comparison**: PoC 階段不適用（單一場景展示）

### V. Pragmatic Simplicity & Schema-First ✅ PASS
- **Schema-First Design**: 工單資料可表達為簡單試算表格式
- **YAGNI Enforcement**: 僅實作展示必需功能，其他導航項目為裝飾
- **CSV as Contract**: 系統以 CSV 匯入為主要資料介面

### Performance Standards ✅ PASS
- **Interaction Responsiveness**: UI 動作目標 <100ms 回應
- PoC 無需符合大規模運算標準（非真實排程）

### Development Standards ✅ PASS
- **Technology Stack**: React + TypeScript + Ant Design（符合憲法規範的前端技術）
- **Version Control**: 使用 feature branch 001-scheduling-poc

**GATE RESULT**: ✅ ALL GATES PASSED - 可進入 Phase 0 研究階段

### Post-Design Re-evaluation (Phase 1 完成後)

✅ **I. Data Agnosticism**: 資料模型使用通用 `WorkOrder` 介面，不依賴特定 ERP
✅ **II. Human Sovereignty**: 甘特圖提供視覺化結果供人工審核
✅ **III. User Experience**: 
- 進度動畫提供即時回饋
- 模擬時間控制在 2-3 秒
- UI 互動目標 <100ms
✅ **IV. Observability**: Tooltip 顯示完整工單資訊
✅ **V. Pragmatic Simplicity**: 
- 資料模型可表達為試算表
- 僅實作必要功能
- Mock 資料支援 CSV 格式

**POST-DESIGN GATE**: ✅ ALL PRINCIPLES MAINTAINED

## Project Structure

### Documentation (this feature)

```text
specs/001-scheduling-poc/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for PoC - no real API)
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Frontend-only structure for PoC
src/
├── assets/              # Logo、圖片資源
├── components/          # 共用元件 (Header, Sidebar, Layout)
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── AppLayout.tsx
├── pages/               # 頁面元件
│   ├── Dashboard.tsx    # 首頁儀表板（裝飾用）
│   └── Simulation/      # 主要展示頁面
│       ├── SimulationView.tsx
│       ├── FileUploader.tsx
│       ├── SimulationProgress.tsx
│       └── GanttChart.tsx
├── data/                # Mock 資料
│   └── mockGanttData.ts # 預設甘特圖資料（核心資產）
├── types/               # TypeScript 類型定義
│   └── index.ts
├── App.tsx              # 應用程式進入點（HashRouter）
├── main.tsx             # Vite 進入點
└── index.css            # 全域樣式

tests/
├── components/          # 元件單元測試
└── pages/               # 頁面整合測試

# 根目錄配置檔案
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── README.md
```

**Structure Decision**: 採用純前端 SPA 結構，符合 PoC 展示需求。無後端、無 API 層。所有資料為前端硬編碼 mock 資料。

## Complexity Tracking

> No violations detected. PoC maintains minimal complexity.

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| No Backend | ✅ Appropriate | PoC 目標為視覺展示，不需真實 API |
| HashRouter | ✅ Appropriate | GitHub Pages 限制，確保頁面重整正常 |
| Mock Data | ✅ Appropriate | 符合「Smoke & Mirrors」策略 |

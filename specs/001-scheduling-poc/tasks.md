# Tasks: LiteAPS 排程模組 PoC 系統

**Input**: Design documents from `/specs/001-scheduling-poc/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: 無（本 PoC 規格未明確要求測試）

**Organization**: 任務依 User Story 分組，以便獨立實作與測試

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可平行執行（不同檔案、無相依性）
- **[Story]**: 所屬 User Story（例如：US1, US2, US3, US4, US5）
- 描述中包含確切檔案路徑

## Path Conventions

本專案採用純前端 SPA 結構：

```
src/
├── assets/          # 靜態資源
├── components/      # 共用元件
├── pages/           # 頁面元件
├── data/            # Mock 資料
├── types/           # TypeScript 類型
├── config/          # 設定檔
├── App.tsx          # 路由進入點
└── main.tsx         # Vite 進入點
```

---

## Phase 1: Setup (專案初始化)

**Purpose**: 建立專案基礎結構與相依套件

- [x] T001 使用 Vite 建立 React + TypeScript 專案於專案根目錄
- [x] T002 安裝核心相依套件：antd, @ant-design/icons, react-google-charts, react-router-dom
- [x] T003 安裝開發相依套件：gh-pages, @types/node
- [x] T004 [P] 設定 vite.config.ts（含 base 路徑 '/LiteAPS_MVP/' 與 @ alias）
- [x] T005 [P] 設定 tsconfig.json（strict mode, paths alias）
- [x] T006 [P] 設定 package.json scripts（dev, build, deploy）
- [x] T007 建立目錄結構：src/{assets,components,pages,data,types,config}

**Checkpoint**: 專案可執行 `npm run dev` 並在 localhost 看到預設頁面

---

## Phase 2: Foundational (基礎建設)

**Purpose**: 所有 User Story 共用的核心元件與設定

**⚠️ CRITICAL**: 此階段必須完成後才能開始 User Story 實作

- [x] T008 建立 TypeScript 類型定義於 src/types/index.ts（WorkOrder, Machine, OrderType, SimulationStep, SimulationState）
- [x] T009 [P] 建立 Mock 資料於 src/data/mockGanttData.ts（MACHINES 陣列 3 台機台）
- [x] T010 [P] 建立進度訊息常數於 src/data/mockGanttData.ts（PROGRESS_MESSAGES 陣列）
- [x] T011 [P] 建立 Mock 工單資料於 src/data/mockGanttData.ts（DEMO_ORDERS 陣列 10-15 筆）
- [x] T012 建立 HashRouter 配置於 src/main.tsx（含 ConfigProvider, AntApp 包覆）
- [x] T013 建立基礎路由於 src/App.tsx（/, /simulation, /dashboard, /resources 路由）
- [x] T014 建立全域樣式於 src/index.css

**Checkpoint**: 基礎路由可運作，HashRouter 頁面重整不出現 404

---

## Phase 3: User Story 1 - 進入系統首頁並感受專業介面 (Priority: P1) 🎯 MVP

**Goal**: 提供具有左側導航欄與頂部標題列的現代化 Dashboard 介面

**Independent Test**: 載入首頁後觀察介面風格、佈局是否現代化、專業感

### Implementation for User Story 1

- [x] T015 [P] [US1] 建立 Logo 資源於 src/assets/logo.svg
- [x] T016 [P] [US1] 建立導航設定於 src/config/navigation.ts（menuItems 陣列含 Dashboard, Simulation, Resources）
- [x] T017 [US1] 建立 Sidebar 元件於 src/components/AppLayout/Sidebar.tsx（含導航選單、Logo、可折疊側邊欄）
- [x] T018 [US1] 建立 Header 元件於 src/components/AppLayout/Header.tsx（頂部標題列含系統名稱）
- [x] T019 [US1] 建立 AppLayout 元件於 src/components/AppLayout/index.tsx（整合 Sidebar, Header, Content, Outlet）
- [x] T020 [US1] 建立 Dashboard 頁面於 src/pages/Dashboard/index.tsx（裝飾用儀表板頁面）
- [x] T021 [US1] 導航項目點擊邏輯：僅「排程模擬」可導航，其餘項目禁用

**Checkpoint**: 系統首頁呈現專業介面，導航欄顯示三個項目，點擊「排程模擬」可導航

---

## Phase 4: User Story 2 - 匯入工單 CSV 檔案 (Priority: P1) 🎯 MVP

**Goal**: 提供 CSV 檔案上傳介面，並顯示模擬解析成功回饋

**Independent Test**: 選取任意 CSV 檔案後觀察系統是否顯示成功回饋

### Implementation for User Story 2

- [x] T022 [US2] 建立 FileUploader 元件於 src/components/FileUploader/index.tsx（含 Upload 元件、.csv 檔案篩選）
- [x] T023 [US2] 實作 beforeUpload 邏輯：阻止實際上傳，顯示 message.success「解析成功：讀取 150 筆工單」
- [x] T024 [US2] 實作上傳狀態回調：通知父元件已上傳成功（透過 onUploadSuccess prop）
- [x] T025 [US2] 建立 Simulation 頁面基礎結構於 src/pages/Simulation/index.tsx（含 SimulationState 狀態管理）
- [x] T026 [US2] 整合 FileUploader 至 Simulation 頁面，上傳成功後啟用「執行 AI 模擬」按鈕

**Checkpoint**: 使用者可上傳 CSV 檔案並看到成功訊息，模擬按鈕變為可點擊

---

## Phase 5: User Story 3 - 執行 AI 排程模擬並查看進度 (Priority: P1) 🎯 MVP

**Goal**: 展示具有進度回饋的運算過程動畫，製造 AI 運算專業印象

**Independent Test**: 點擊模擬按鈕後觀察進度動畫與文字變化

### Implementation for User Story 3

- [x] T027 [US3] 建立 SimulationProgress 元件於 src/components/SimulationProgress/index.tsx（含 Progress 進度條、動態訊息文字）
- [x] T028 [US3] 實作進度動畫邏輯：使用 useEffect + setInterval 每 0.8 秒輪播 PROGRESS_MESSAGES
- [x] T029 [US3] 實作進度百分比動畫：0% → 100% 共 2-3 秒
- [x] T030 [US3] 實作「執行 AI 模擬」按鈕於 Simulation 頁面：點擊後進入 Loading 狀態並鎖定按鈕
- [x] T031 [US3] 整合 SimulationProgress 至 Simulation 頁面：模擬中顯示進度動畫
- [x] T032 [US3] 實作模擬完成回調：2-3 秒後自動轉換至結果顯示狀態

**Checkpoint**: 點擊模擬按鈕後顯示進度動畫、文字輪播，2-3 秒後完成

---

## Phase 6: User Story 4 - 查看互動式甘特圖結果 (Priority: P1) 🎯 MVP

**Goal**: 顯示視覺化甘特圖，清楚展示機台排程與工單類型區分

**Independent Test**: 觀察甘特圖是否正確顯示機台、時間軸、工單區塊與 Tooltip

### Implementation for User Story 4

- [x] T033 [US4] 建立 workOrderToTimelineData 轉換函式於 src/data/mockGanttData.ts
- [x] T034 [US4] 建立 GanttChart 元件於 src/components/GanttChart/index.tsx（使用 react-google-charts Timeline 類型）
- [x] T035 [US4] 設定 Timeline 圖表選項：showRowLabels, groupByRowLabel, barLabelStyle
- [x] T036 [US4] 實作顏色區分邏輯：正常單=藍色(#1890ff), 急單=紅色(#ff4d4f), 樣品單=綠色(#52c41a)
- [x] T037 [US4] 實作 Tooltip 顯示：工單號、產品名稱、開始/結束時間
- [x] T038 [US4] 整合 GanttChart 至 Simulation 頁面：模擬完成後顯示甘特圖結果
- [x] T039 [US4] 設定圖表容器高度（400px 以上確保渲染）

**Checkpoint**: 甘特圖正確顯示 3 台機台、10-15 筆工單，Tooltip 可互動，顏色區分清楚

---

## Phase 7: User Story 5 - 完成 3 分鐘標準展示流程 (Priority: P2)

**Goal**: 確保完整流程順暢無技術問題，可在 3 分鐘內完成展示

**Independent Test**: 實際執行完整流程並計時驗證

### Implementation for User Story 5

- [x] T040 [US5] 優化頁面載入效能：確保首頁載入 < 3 秒
- [x] T041 [US5] 優化甘特圖渲染效能：確保甘特圖渲染 < 1 秒
- [x] T042 [US5] 實作頁面狀態保持：重新整理頁面後回到初始狀態
- [x] T043 [US5] 驗證 HashRouter 配置：確保頁面重整不產生 404
- [x] T044 [US5] 建立展示用 CSV 範例檔案於 public/demo.csv（供展示時使用）

**Checkpoint**: 完整流程可在 3 分鐘內完成，無錯誤訊息或頁面崩潰

---

## Phase 8: Polish & Deployment (收尾與部署)

**Purpose**: 最終調整與 GitHub Pages 部署

- [x] T045 [P] 更新 README.md 於專案根目錄（含功能說明、技術堆疊、啟動指令）
- [x] T046 [P] 確認 package.json homepage 設定正確
- [x] T047 執行 `npm run build` 驗證建構無錯誤
- [x] T048 執行 `npm run deploy` 部署至 GitHub Pages
- [x] T049 驗證 GitHub Pages 線上版本運作正常
- [x] T050 執行 quickstart.md Verification Checklist 完整驗證

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 無相依性 - 可立即開始
- **Foundational (Phase 2)**: 依賴 Setup 完成 - **阻擋**所有 User Story
- **User Stories (Phase 3-7)**: 全部依賴 Foundational 完成
  - US1 (Phase 3) → 必須先完成，提供基礎 Layout
  - US2 (Phase 4) → 依賴 US1 的 Simulation 頁面路由
  - US3 (Phase 5) → 依賴 US2 的上傳狀態
  - US4 (Phase 6) → 依賴 US3 的模擬完成狀態
  - US5 (Phase 7) → 整合測試，依賴 US1-US4 全部完成
- **Polish (Phase 8)**: 依賴所有 User Stories 完成

### User Story Dependencies

```
┌─────────────────┐
│  Setup (P1)     │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Foundational(P2)│
└────────┬────────┘
         ▼
┌─────────────────┐
│  US1: Layout    │ ← 首頁/導航 (P1)
└────────┬────────┘
         ▼
┌─────────────────┐
│  US2: Upload    │ ← 檔案上傳 (P1)
└────────┬────────┘
         ▼
┌─────────────────┐
│  US3: Progress  │ ← 模擬進度 (P1)
└────────┬────────┘
         ▼
┌─────────────────┐
│  US4: Gantt     │ ← 甘特圖結果 (P1)
└────────┬────────┘
         ▼
┌─────────────────┐
│  US5: E2E Test  │ ← 完整流程 (P2)
└────────┬────────┘
         ▼
┌─────────────────┐
│  Polish & Deploy│
└─────────────────┘
```

### Within Each Phase

- Setup: T001 → T002-T003 → T004-T006 [P] → T007
- Foundational: T008 → T009-T011 [P] → T012 → T013 → T014
- US1: T015-T016 [P] → T017-T019 (依序) → T020 → T021
- US2: T022-T024 (依序) → T025 → T026
- US3: T027-T029 (依序) → T030 → T031 → T032
- US4: T033 → T034-T039 (依序)
- US5: T040-T044 (可平行驗證)
- Polish: T045-T046 [P] → T047 → T048 → T049 → T050

---

## Parallel Opportunities

### Setup Phase (Phase 1)
```bash
# T004, T005, T006 可平行執行：
Task: "設定 vite.config.ts"
Task: "設定 tsconfig.json"
Task: "設定 package.json scripts"
```

### Foundational Phase (Phase 2)
```bash
# T009, T010, T011 可平行執行：
Task: "建立 MACHINES 陣列"
Task: "建立 PROGRESS_MESSAGES 陣列"
Task: "建立 DEMO_ORDERS 陣列"
```

### User Story 1 (Phase 3)
```bash
# T015, T016 可平行執行：
Task: "建立 Logo 資源"
Task: "建立導航設定"
```

### Polish Phase (Phase 8)
```bash
# T045, T046 可平行執行：
Task: "更新 README.md"
Task: "確認 package.json homepage"
```

---

## Implementation Strategy

### MVP First (User Story 1-4)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational（**關鍵** - 阻擋所有 Story）
3. 完成 Phase 3: User Story 1（首頁介面）
4. 完成 Phase 4: User Story 2（CSV 上傳）
5. 完成 Phase 5: User Story 3（模擬進度）
6. 完成 Phase 6: User Story 4（甘特圖）
7. **STOP 並驗證**: 測試完整流程
8. 若 OK，執行 Phase 8 部署

### Suggested MVP Scope

**MVP = Phase 1-6 (T001-T039)**

包含：
- 專業介面 Layout（US1）
- CSV 上傳模擬（US2）
- AI 模擬進度動畫（US3）
- 甘特圖結果展示（US4）

可延後：
- 效能優化與整合測試（US5, Phase 7）
- 文件更新與部署（Phase 8）

---

## Summary

| Phase | Task Count | Purpose |
|-------|------------|---------|
| Setup | 7 (T001-T007) | 專案初始化 |
| Foundational | 7 (T008-T014) | 基礎建設 |
| US1 | 7 (T015-T021) | 首頁介面 |
| US2 | 5 (T022-T026) | CSV 上傳 |
| US3 | 6 (T027-T032) | 模擬進度 |
| US4 | 7 (T033-T039) | 甘特圖 |
| US5 | 5 (T040-T044) | 整合驗證 |
| Polish | 6 (T045-T050) | 收尾部署 |
| **Total** | **50 tasks** | |

### Per User Story

| User Story | Priority | Tasks | Description |
|------------|----------|-------|-------------|
| US1 | P1 | 7 | 進入系統首頁並感受專業介面 |
| US2 | P1 | 5 | 匯入工單 CSV 檔案 |
| US3 | P1 | 6 | 執行 AI 排程模擬並查看進度 |
| US4 | P1 | 7 | 查看互動式甘特圖結果 |
| US5 | P2 | 5 | 完成 3 分鐘標準展示流程 |

### Independent Test Criteria

| Story | Test Criteria |
|-------|---------------|
| US1 | 載入首頁後介面呈現現代化專業感 |
| US2 | 選取 CSV 檔案後顯示成功回饋 |
| US3 | 點擊模擬按鈕後進度動畫與文字變化正常 |
| US4 | 甘特圖正確顯示機台、工單、Tooltip |
| US5 | 完整流程可在 3 分鐘內完成 |

---

## Notes

- 本 PoC 無測試任務（規格未要求）
- 所有 [P] 標記任務可平行執行
- 每個 User Story 應可獨立驗證
- 建議每完成一個 Phase 進行一次 commit
- 依照 quickstart.md 的 Verification Checklist 進行最終驗證

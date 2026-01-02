產品需求文件 (PRD): LiteAPS - 模組化彈性排程平台版本：v1.1 (Strategic Pivot & MVP Definition)狀態：已核准 (Approved)日期：2026-01-03架構師：系統設計宗師前一版本：v1.0 (Draft)1. 專案概述 (Executive Summary)1.1 背景與演進原 v1.0 提案致力於解決傳產排程的「黑盒子」問題。經架構審視後，我們確認排程問題存在兩個維度的複雜性：總體規劃（Macro）與現場執行（Micro）。為了確保系統的可落地性與未來的擴充性，v1.1 版本正式引入**「模組化架構 (Modular Architecture)」**。1.2 產品願景打造一個**「離線/在線 彈性模擬排程平台 (Offline/Online Agile Simulation Platform)」**。本系統不只是一個排程工具，而是一個可組合的供應鏈操作系統。使用者可從單一產線的「小排程」切入，逐步擴充至全廠的「大排程」運籌。1.3 核心價值主張彈性模擬 (Elastic Simulation)：透過 Snapshot 機制，讓生管在不影響現場作業的情況下，進行無限次的 What-if 沙盒推演。人機協作 (Hybrid Intelligence)：演算法處理運算繁重的填空題，人類負責處理突發狀況與決策（拖拉/釘選）。模組化成長 (Modular Growth)：MVP 專注於現場交付，未來無縫接軌 ERP 進行總體規劃。2. 產品架構藍圖 (Product Architecture Blueprint)本系統由底層平台與兩大應用模組構成：2.1 底層核心 (Core Platform)Data Hub：統一的資料交換中心，負責處理 CSV/API 的吞吐。Simulation Engine：共用的演算法核心（有限產能邏輯、時間軸運算）。Scenario Manager：管理不同模擬方案的快照與權限。2.2 應用模組 (Application Modules)模組名稱LiteAPS-Micro (小排程)LiteAPS-Macro (大排程)當前狀態Phase 1 MVP 核心範疇規劃中 (Phase 3)目標客群車間主任、生管員 (Planner)生產經理、廠長關注維度單一工作中心 (Work Center)全廠/多車間協同解決問題機台派工順序、換線最佳化、急單插隊訂單交期承諾、物料供需平衡、產能負荷輸入資料已確認的工單池 (Flat List)客戶訂單 (Sales Order)、BOM、Routing輸出結果機台甘特圖、每日派工單各車間需求單、預計出貨日3. Phase 1 MVP 功能需求 (Functional Requirements)本階段專注於實作 LiteAPS-Micro 模組。3.1 專案與情境管理 (Scenario Management)FR-1.1 方案隔離：每次匯入或建立新排程，系統自動產生獨立的 ScenarioID。所有修改皆不影響原始資料或其他方案。FR-1.2 狀態管理：方案具備 Draft (編輯中)、Locked (模擬計算中)、Published (已發佈) 狀態。3.2 資料輸入 (Data Ingestion)FR-2.1 扁平化工單匯入：MVP 支援 CSV 上傳。必要欄位：OrderNo, ProductID, Qty, DueDate, StandardTime (標準工時), Priority.架構師註記：暫不處理複雜的 BOM 結構，將每一張工單視為獨立個體。FR-2.2 機台資源設定：定義本方案可用的機台列表 (Machine List) 與工作行事曆 (Calendar, e.g., 08:00-17:00)。3.3 互動式排程畫布 (The Canvas)FR-3.1 視覺化甘特圖：Y 軸：機台 (Machine)。X 軸：時間 (Time)。圖塊：代表工單，長度 = Qty * StandardTime。FR-3.2 拖拉互動 (Drag & Drop)：使用者可將工單從「待排區」拖入「機台軸」。亦可將甘特圖上的工單在不同機台或時間點間搬移。FR-3.3 衝突處理策略 (Collision Handling)：採用 「覆蓋與警告模式 (Overlay with Warning)」。允許使用者將工單放置在已有工單的時段（重疊）。系統需即時以紅色邊框/陰影標示衝突區域，但不強制回彈，保留人為調整彈性。FR-3.4 釘選與鎖定 (Pinning)：使用者確認某工單位置後，可執行「釘選 (Pin)」。被釘選的工單，在後續的「自動運算」中位置不可被演算法移動。3.4 自動演算核心 (Simulation Logic)FR-4.1 人機協作演算法：Step 1 保留：鎖定所有 IsPinned = true 的工單位置。Step 2 填空：針對剩餘工單，依 DueDate 或 Priority 排序。Step 3 投放：尋找機台最早的「非衝突空檔 (Free Slot)」填入。Step 4 報告：若無法排入（產能不足），將工單標記為 Unscheduled 並列出原因。4. 系統架構設計 (System Architecture)4.1 技術堆疊 (Tech Stack)Frontend: React (TypeScript) + react-big-calendar (Customized) 或 Vis.js。關鍵技術：使用 Virtualization (虛擬捲動) 以支撐單次渲染 1,000+ DOM 元素。Backend: ASP.NET Core 8 WebAPI.Database: SQL Server (採用 EF Core Code First)。Cache/State: MemoryCache (MVP 階段用於暫存運算中的鎖定狀態)。4.2 實體關聯圖 (ER Diagram - Conceptual)為支援未來的模組化，資料庫設計預留了擴充欄位。程式碼片段erDiagram
Scenario ||--|{ WorkOrder : contains
Scenario ||--|{ MachineConfig : uses
Scenario {
guid ScenarioID
string Name
string Type "Micro/Macro"
string Status
datetime CreatedAt
}
WorkOrder {
int OrderID
guid ScenarioID
string OrderNo
int ParentOrderID "預留給 Macro 模組拆單用"
int RoutingStep "預留給製程順序"
string ProductID
float Duration
datetime DueDate
boolean IsPinned
int AssignedMachineID
datetime StartTime
datetime EndTime
}
4.3 演算流程圖 (Sequence Logic)程式碼片段sequenceDiagram
participant User
participant Frontend
participant API
participant Scheduler
participant DB
User->>Frontend: 拖拉工單 A 到 機台 1 (10:00)
Frontend->>Frontend: 檢查衝突 (顯示紅框)
User->>Frontend: 點擊 "釘選" (Pin)
Frontend->>API: POST /schedule/pin (OrderA, Time, Machine)
API->>DB: 更新 OrderA (IsPinned=true)
User->>Frontend: 點擊 "自動排程剩餘工單"
Frontend->>API: POST /schedule/auto-fill
API->>Scheduler: 載入 Snapshot (包含 Pinned 工單)
Scheduler->>Scheduler: 執行 Heuristic 填空演算法
Scheduler-->>API: 返回計算結果
API->>DB: 批量寫入排程結果
API-->>Frontend: 返回新甘特圖資料
Frontend->>User: 更新畫面 (動畫展示)
5. 非功能性需求 (Non-Functional Requirements)NFR-01 效能：1,000 張工單的自動排程運算需在 5 秒內 完成 (因為是 Heuristic 算法，非全域最佳解，速度應極快)。甘特圖拖拉延遲 (Latency) 低於 100ms。NFR-02 隔離性：不同使用者的「沙盒」必須完全隔離，A 的試算絕不能影響 B 的畫面。6. 執行路線圖 (Roadmap)Phase 1: MVP (LiteAPS-Micro) [本文件範圍]目標：單一產線排程、CSV 匯入、甘特圖互動、Excel 匯出。交付物：可運行的 Web 應用程式 (Docker Image)。Phase 2: Connectivity & Multi-Tenancy目標：多車間管理、API 介面開放 (準備接 ERP)。功能：多帳號權限管理、Work Center 切換。Phase 3: The Brain (LiteAPS-Macro)目標：全廠級大排程。功能：路由串接 (Routing)、物料檢查 (MRP Logic)、總體交期預測。
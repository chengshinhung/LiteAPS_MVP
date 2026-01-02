# Research: LiteAPS 排程模組 PoC 系統

**Feature Branch**: `001-scheduling-poc`
**Date**: 2026-01-03
**Status**: Complete

## Overview

本文件記錄 PoC 系統技術堆疊的研究結果，包含最佳實踐、配置方式與潛在陷阱。

---

## 1. react-google-charts Timeline

### Decision
使用 `react-google-charts` 的 Timeline 圖表類型實現甘特圖視覺化。

### Rationale
- 無授權費用，適合 PoC 階段
- 內建 Tooltip 支援
- 資料格式簡單，符合「Schema-First」原則
- 支援響應式寬度

### Alternatives Considered
| 方案 | 優點 | 缺點 | 結論 |
|------|------|------|------|
| DHTMLX Gantt | 功能豐富、拖拉支援 | 需授權費用 | PoC 階段不適用 |
| vis-timeline | 開源、高度可客製化 | 學習曲線較高 | 備選方案 |
| react-google-charts | 免費、簡單、足夠 PoC 展示 | 功能較基礎 | ✅ 選用 |

### Key Configuration

```typescript
// 資料格式 (4 欄)
type TimelineData = [
  string,  // Resource/Machine
  string,  // Task Name
  Date,    // Start Time
  Date     // End Time
];

// 圖表選項
const options = {
  timeline: {
    showRowLabels: true,
    colorByRowLabel: false,  // 使用自訂顏色
    groupByRowLabel: true,
    showBarLabels: true,
    rowLabelStyle: { fontName: 'Helvetica', fontSize: 14 },
  },
  colors: ['#1890ff', '#ff4d4f', '#52c41a'],  // 藍=正常, 紅=急單, 綠=其他
  backgroundColor: '#fafafa',
};
```

### Pitfalls to Avoid
- **月份從 0 開始索引**: `new Date(2026, 0, 3)` 是 1 月 3 日
- **容器需明確高度**: Chart 元件必須有高度才會渲染
- **資料欄數一致性**: 所有資料列必須有相同欄數

### Package Version
- `react-google-charts`: ^5.2.1

---

## 2. Ant Design 5.0 + Vite

### Decision
使用 Ant Design 5.0 作為 UI 框架，無需額外 Vite 配置。

### Rationale
- CSS-in-JS 開箱即用，無需配置 Less loader
- 完整的 Layout、Upload、Progress、Message 元件
- 符合 PRD 指定的技術堆疊

### Key Components Usage

#### Layout 結構
```tsx
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;

// 響應式側邊欄
<Sider 
  collapsible 
  breakpoint="lg"
  collapsedWidth={80}
>
  <Menu theme="dark" mode="inline" items={menuItems} />
</Sider>
```

#### Upload 模擬 (無實際上傳)
```tsx
const uploadProps: UploadProps = {
  accept: '.csv',
  beforeUpload: (file) => {
    // 阻止實際上傳
    message.success(`解析成功：讀取 150 筆工單`);
    return false;
  },
  showUploadList: false,
};
```

#### Progress/Message
```tsx
// 使用 App.useApp() hooks (推薦)
const { message, notification } = App.useApp();

// 進度條
<Progress percent={percent} status="active" />

// 全螢幕 Spin
<Spin fullscreen spinning={loading} tip="處理中..." />
```

### Pitfalls to Avoid
- **Message API 需 App 包覆**: 在 App 層級加入 `<App>` 包覆元件
- **ConfigProvider 主題**: 若需自訂主題，使用 `ConfigProvider`

### Package Version
- `antd`: ^5.24.x

---

## 3. React Router HashRouter

### Decision
使用 HashRouter 實現客戶端路由，確保 GitHub Pages 相容性。

### Rationale
- GitHub Pages 為靜態檔案託管，不支援伺服器端路由
- HashRouter 使用 URL hash (`/#/path`) 處理路由
- 頁面重整不會產生 404 錯誤

### Key Configuration

```tsx
// main.tsx
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// App.tsx - 路由結構
<Routes>
  <Route path="/" element={<AppLayout />}>
    <Route index element={<Navigate to="/simulation" replace />} />
    <Route path="simulation" element={<SimulationView />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="resources" element={<Resources />} />
  </Route>
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

### Pitfalls to Avoid
- **不要使用 BrowserRouter**: GitHub Pages 會回傳 404
- **路由狀態傳遞**: 使用 `useNavigate` 的 `state` 參數傳遞資料

### Package Version
- `react-router-dom`: ^7.x

---

## 4. GitHub Pages 部署

### Decision
使用 `gh-pages` npm 套件進行自動化部署。

### Rationale
- 一鍵部署，簡化 CI/CD 流程
- 自動建立 `gh-pages` 分支
- 與 Vite 整合良好

### Key Configuration

#### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/LiteAPS_MVP/',  // ⚠️ 必須與 repo 名稱一致
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
```

#### package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://[username].github.io/LiteAPS_MVP"
}
```

### Deployment Steps
1. `npm run deploy` - 建構並部署
2. GitHub Repo > Settings > Pages > Source: `gh-pages` branch
3. 等待約 1-2 分鐘後存取 `https://[username].github.io/LiteAPS_MVP`

### Pitfalls to Avoid
- **base path 必須精確**: 包含開頭和結尾的 `/`
- **首次部署後需設定 GitHub Pages source**
- **branch 衝突**: 若遇到錯誤，執行 `npx gh-pages-clean`

### Package Version
- `gh-pages`: ^6.3.0
- `vite`: ^6.x

---

## 5. TypeScript Strict Mode

### Decision
啟用 TypeScript strict mode 並使用嚴格的類型檢查。

### Rationale
- 提升程式碼品質與可維護性
- 編譯時期捕捉潛在錯誤
- 符合 Constitution 的 Development Standards

### Key Configuration

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

### Type Definitions for Chart Data

```typescript
// src/types/index.ts

export type OrderType = 'normal' | 'urgent' | 'sample';

export interface WorkOrder {
  id: string;
  resourceId: string;  // Machine ID
  title: string;       // Order display name
  product: string;     // Product name
  start: Date;
  end: Date;
  type: OrderType;
  color: string;
}

export interface Machine {
  id: string;
  name: string;
  displayName: string;
}

// Google Charts Timeline 資料格式
export type TimelineDataRow = [string, string, Date, Date];
```

### Package Version
- `typescript`: ^5.7.x

---

## 6. Package Summary

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.x | UI Framework |
| `react-dom` | ^18.3.x | DOM Rendering |
| `typescript` | ^5.7.x | Type Safety |
| `vite` | ^6.x | Build Tool |
| `antd` | ^5.24.x | UI Components |
| `react-router-dom` | ^7.x | Client Routing |
| `react-google-charts` | ^5.2.x | Timeline Chart |
| `gh-pages` | ^6.3.x | Deployment |
| `@ant-design/icons` | ^5.x | Icon Set |

---

## 7. Mock Data Strategy

### Decision
建立真實感的假資料，設計「衝突被 AI 修正」的場景。

### Data Design Principles
1. **3 台機台**: Machine A (M-01), Machine B (M-02), Machine C (M-03)
2. **10-15 筆工單**: 混合正常單與急單
3. **時間分布**: 2026-01-03 一整天 (08:00 - 17:00)
4. **顏色區分**: 藍色=正常單, 紅色=急單, 綠色=樣品單

### Mock Scenario
設計一個「原本有交期衝突，被 AI 最佳化」的故事：
- Machine A: 滿載，高效率
- Machine B: 插入一張急單，其他工單被重新排程
- Machine C: 較輕負載，展示產能分配

---

## Conclusion

所有技術選擇已確認，無待釐清項目。可進入 Phase 1 設計與合約階段。

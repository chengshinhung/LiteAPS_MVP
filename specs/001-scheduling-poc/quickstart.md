# Quick Start: LiteAPS 排程模組 PoC 系統

**Feature Branch**: `001-scheduling-poc`
**Date**: 2026-01-03
**Estimated Setup Time**: 15-20 分鐘

---

## Prerequisites

確保您的開發環境已安裝：

| Tool | Version | Check Command |
|------|---------|---------------|
| Node.js | 18.x 或 20.x | `node --version` |
| npm | 9.x+ | `npm --version` |
| Git | 2.x+ | `git --version` |

---

## 1. Project Setup

### 建立專案

```bash
# 進入專案根目錄
cd d:\Side_Projects\LiteAPS_MVP

# 使用 Vite 建立 React + TypeScript 專案
npm create vite@latest poc -- --template react-ts

# 進入專案目錄
cd poc

# 安裝相依套件
npm install
```

### 安裝核心相依套件

```bash
# UI 框架
npm install antd @ant-design/icons

# 圖表函式庫
npm install react-google-charts

# 路由
npm install react-router-dom

# 部署工具
npm install --save-dev gh-pages
```

---

## 2. Configuration Files

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/LiteAPS_MVP/',  // GitHub Pages 部署路徑
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
```

### tsconfig.json (關鍵設定)

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
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

### package.json scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://[your-username].github.io/LiteAPS_MVP"
}
```

---

## 3. Project Structure

建立以下目錄結構：

```
poc/
├── src/
│   ├── assets/              # 靜態資源
│   │   └── logo.svg
│   ├── components/          # 共用元件
│   │   ├── AppLayout/
│   │   │   ├── index.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── FileUploader/
│   │   │   └── index.tsx
│   │   ├── SimulationProgress/
│   │   │   └── index.tsx
│   │   └── GanttChart/
│   │       └── index.tsx
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   └── index.tsx
│   │   └── Simulation/
│   │       └── index.tsx
│   ├── data/
│   │   └── mockGanttData.ts
│   ├── types/
│   │   └── index.ts
│   ├── config/
│   │   ├── navigation.ts
│   │   └── theme.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

快速建立目錄：

```bash
mkdir -p src/{assets,components/{AppLayout,FileUploader,SimulationProgress,GanttChart},pages/{Dashboard,Simulation},data,types,config}
```

---

## 4. Core Implementation Steps

### Step 1: Types Definition

建立 `src/types/index.ts`：

```typescript
export type OrderType = 'normal' | 'urgent' | 'sample';
export type SimulationStep = 'upload' | 'simulate' | 'result';

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

export interface Machine {
  id: string;
  name: string;
  displayName: string;
}
```

### Step 2: Mock Data

建立 `src/data/mockGanttData.ts` (參考 data-model.md)

### Step 3: App Entry with HashRouter

更新 `src/main.tsx`：

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App as AntApp, ConfigProvider } from 'antd';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <AntApp>
        <HashRouter>
          <App />
        </HashRouter>
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>
);
```

### Step 4: Routing Setup

更新 `src/App.tsx`：

```typescript
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import SimulationView from '@/pages/Simulation';
import Dashboard from '@/pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/simulation" replace />} />
        <Route path="simulation" element={<SimulationView />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="resources" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
```

### Step 5: Layout Component

建立 `src/components/AppLayout/index.tsx`：

```typescript
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ThunderboltOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: '儀表板', disabled: true },
    { key: '/simulation', icon: <ThunderboltOutlined />, label: '排程模擬' },
    { key: '/resources', icon: <SettingOutlined />, label: '資源管理', disabled: true },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          LiteAPS
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px', background: '#fff' }}>
          <h2>LiteAPS 排程系統 PoC</h2>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: '#fff', minHeight: 360 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
```

---

## 5. Development Commands

```bash
# 啟動開發伺服器
npm run dev

# 本地預覽 (localhost:5173)
# 開啟瀏覽器至 http://localhost:5173

# 建構生產版本
npm run build

# 部署至 GitHub Pages
npm run deploy
```

---

## 6. Verification Checklist

完成開發後，逐項驗證：

- [ ] 首頁載入時間 < 3 秒
- [ ] 導航欄顯示三個項目（僅「排程模擬」可點擊）
- [ ] CSV 上傳後顯示「解析成功：讀取 150 筆工單」
- [ ] 點擊「執行 AI 模擬」後顯示進度動畫
- [ ] 進度文字每 0.8 秒輪播
- [ ] 2-3 秒後顯示甘特圖
- [ ] 甘特圖顯示 3 台機台、10-15 筆工單
- [ ] 滑鼠懸停顯示 Tooltip
- [ ] 不同類型工單顏色區分（藍/紅/綠）
- [ ] 頁面重整不產生 404 (HashRouter)
- [ ] GitHub Pages 部署成功

---

## 7. Troubleshooting

### 問題：`npm run deploy` 失敗

```bash
# 清除 gh-pages 快取
npx gh-pages-clean
npm run deploy
```

### 問題：Chart 不顯示

確保容器有明確高度：

```tsx
<Chart
  chartType="Timeline"
  width="100%"
  height="400px"  // ⚠️ 必須設定高度
  // ...
/>
```

### 問題：路由重整 404

確認使用 `HashRouter` 而非 `BrowserRouter`。

### 問題：Ant Design 樣式問題

確保在 `main.tsx` 中正確包覆 `ConfigProvider` 和 `App`。

---

## Next Steps

完成 PoC 開發後：

1. 使用 `/speckit.tasks` 生成 tasks.md 細部任務
2. 執行開發與測試
3. 部署至 GitHub Pages
4. 準備 3 分鐘展示劇本
5. 向高階主管展示系統

# LiteAPS 排程模組 PoC

LiteAPS 排程系統的概念驗證原型 (Proof of Concept)。
本系統為純前端應用，模擬 AI 排程運算過程與結果展示。

## 功能特色

- **專業儀表板介面**：現代化 UI 設計
- **CSV 工單匯入**：模擬資料匯入流程
- **AI 運算模擬**：擬真的運算進度回饋
- **互動式甘特圖**：視覺化排程結果，支援 Tooltip 與顏色區分

## 技術堆疊

- React 18
- TypeScript
- Vite
- Ant Design 5.0
- React Google Charts
- React Router DOM (HashRouter)

## 快速開始

1. 安裝相依套件：
   ```bash
   npm install
   ```

2. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

3. 建構專案：
   ```bash
   npm run build
   ```

4. 部署至 GitHub Pages：
   ```bash
   npm run deploy
   ```

## 展示流程

1. 進入首頁，點擊「排程模擬」。
2. 點擊「選擇 CSV 檔案」，選擇 `public/demo.csv` 或任意 CSV。
3. 等待上傳成功訊息。
4. 點擊「執行 AI 排程模擬」。
5. 觀察進度動畫與訊息。
6. 查看生成的甘特圖結果。

## License

MIT

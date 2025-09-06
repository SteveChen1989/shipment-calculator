# PWA 快速整合指南

把這 4 個檔案放到和你的 HTML 相同的資料夾：
- `index-pwa.html`（可改名或直接把你原本的頁面改成這個內容）
- `manifest.webmanifest`
- `sw.js`
- `icons/` 目錄底下的 `icon-192.png`, `icon-512.png`

**最重要的 3 件事：**
1. 在 `<head>` 放入：
   ```html
   <link rel="manifest" href="manifest.webmanifest">
   <meta name="theme-color" content="#0ea5e9">
   <link rel="apple-touch-icon" href="icons/icon-192.png">
   ```
2. 在頁面載入時註冊 Service Worker：
   ```html
   <script>
   if ('serviceWorker' in navigator) {{
     window.addEventListener('load', () => {{
       navigator.serviceWorker.register('./sw.js');
     }});
   }}
   </script>
   ```
3. 以 HTTPS 伺服器開啟（本機可用 `npx http-server -S` 或部署到 GitHub Pages/Cloudflare Pages/Vercel）。

安裝測試步驟：
- 用手機 Chrome/Edge/Android WebView：打開頁面 > 選單 >「加入主畫面」。
- iOS Safari：打開頁面 > 分享 >「加入主畫面」。

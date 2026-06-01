# ENV_CHECKLIST.md

## 環境變數清單

| Variable | 用途 | Local | Preview | Production | 機密等級 | 來源 / 取得方式 |
|---|---|---|---|---|---|---|
|  |  |  |  |  | public / secret |  |

## 機密等級說明

- **public**: 可以出現在前端 bundle（`NEXT_PUBLIC_*`、`VITE_*`）
- **secret**: 只能在 server-side，不可提交 git，不可出現在 console log

## 不可提交項

- [ ] `.env` / `.env.local` / `.env.production` 已加入 `.gitignore`
- [ ] 無 API key 出現在程式碼、commit history 或 CI log

## Provider Setup

| Provider | 設定步驟 | Dashboard URL | 備註 |
|---|---|---|---|
|  |  |  |  |

## 部署前確認

- [ ] Local smoke：所有必要 env 已設定，`npm run dev` 可啟動
- [ ] Preview：env 已設定到 Vercel / Netlify / CI preview 環境
- [ ] Production：env 已設定，rotation 策略已記錄
- [ ] 無 env 使用 fallback 默認值而未記錄

# API_CONTRACT.md

## 概覽

- API 風格：REST / GraphQL / tRPC / Server Actions
- base URL：
- 版本策略：
- auth 方式：

## Routes / Actions

| Method | Path / Action | 用途 | Auth | Request Body | Response | Error Shape | Idempotent | 備註 |
|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |  |

## Error Shape

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

## Webhook

| Event | Payload | 驗證方式 | Retry | 備註 |
|---|---|---|---|---|
|  |  |  |  |  |

## Rate Limiting

- 限制方式：
- 限額：
- 超限回應：

## Pagination

- 方式：cursor / offset
- 預設 page size：
- 最大 page size：

## 權限矩陣

| Route / Action | anonymous | user | admin | service | 備註 |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 外部 API 依賴

| Provider | 用途 | Auth | Rate Limit | Fallback | 備註 |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

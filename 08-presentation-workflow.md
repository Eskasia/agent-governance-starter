# 08 Presentation Workflow

適用：簡報、PPT、slide deck、發表頁、產品介紹、客戶提案、研究報告、一頁紙、白皮書、履歷、作品集、landing page。

## 工具分流

| 需求 | 使用工具 / skill | 產出 |
|---|---|---|
| 正式 PowerPoint / Google Slides / PPTX | `Presentations` plugin | `.pptx` 或 Google Slides |
| 文件、表格、簡報混合產出 | `paperjsx` | PPTX / DOCX / XLSX / PDF |
| 高質感網頁 PPT、橫向翻頁、雜誌風、Swiss style、發布會風 | `guizang-ppt-skill` | 單一 HTML slide deck |
| 高質感文件排版、一頁紙、白皮書、履歷、作品集、landing page、markdown slides | `kami` | HTML / PDF / static landing page / slide deck |
| 需要影片化簡報或動態敘事 | HyperFrames / Remotion | MP4 / video composition |

## PRESENTATION_BRIEF 必填

- 目標：銷售、教學、發表、募資、內部同步、研究報告。
- 觀眾：誰看、懂多少、最在意什麼。
- 交付格式：PPTX / Google Slides / HTML deck / PDF / MP4 / static HTML page。
- 風格：正式商務、產品 demo、雜誌風、瑞士風、研究型、教學型。
- 頁數：建議 6-12 頁；超過 15 頁要先切章節。
- 內容來源：PROJECT_BRIEF、SPEC、CONTEXT、資料表、截圖、研究素材。
- 必須出現：品牌、主張、流程圖、數據、截圖、CTA。
- 不要出現：未驗證數字、假客戶、過度行銷詞、無來源的 AI 承諾。

## Guizang PPT 使用規則

- GitHub：https://github.com/op7418/guizang-ppt-skill
- skill 名稱：`guizang-ppt-skill`
- 適合「HTML 網頁簡報」，不是傳統 `.pptx` 編輯檔。
- 風格優先使用：
  - `電子雜誌 × 電子墨水`：內容型、敘事型、品牌感。
  - `瑞士國際主義`：產品發表、數據型、工程感。
- 必須提供可 review 的本機 HTML 路徑或預覽 URL。
- 完成後用 Browser/Chrome 檢查 desktop/mobile、翻頁、字體溢出、圖片載入、console error。

## Kami 使用規則

- GitHub：https://github.com/tw93/Kami
- skill 名稱：`kami`
- 適合把已有內容做成「可交付的紙面或網頁 artifact」：one-pager、white paper、resume/CV、portfolio、letter、equity report、changelog、slide deck、landing page。
- 中文文件預設走繁體中文輸出；多語內容要特別檢查字體、換行、標點與 PDF 匯出。
- Landing page 屬於靜態 HTML 原型或發表頁，不取代正式產品前端 repo；方向確認後再回到正式專案實作。
- 使用前先鎖定：語言、模板、輸出格式、頁數或長度、視覺驗收方式、驗證命令。
- 必須提供可 review 的本機 HTML/PDF 路徑或預覽 URL，並用 Browser/Chrome 檢查 desktop/mobile、字體溢出、圖片載入、console error。

## 驗收

- 每頁只傳達一個重點。
- 標題、圖、數字、CTA 能被 5 秒掃讀。
- 所有資料有來源或明確標為 mock。
- 匯出格式符合使用場景。
- HTML deck 需能離線打開或明確列出外部資源依賴。

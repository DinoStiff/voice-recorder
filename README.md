# 🚕 Taipei AI Tour Guide (Hackathon Backend)

這是一個專為黑客松設計的強大後端 API 與資料爬蟲系統，用於提供高品質的台北旅遊景點、美食推薦，以及社群輿情洞察資料。

## 🌟 核心特色 (Core Features)

1. **社群探勘與輿情產生器 (`social_scraper.py`)**：
   - 即時將 100+ 筆景點包裝為逼真的論壇貼文格式 (含標題、網址、交通建議)。
   - **動態引擎**：每次更新時，會自動擷取當前時間來計算店家是否營業 (`is_open_now`)，並自動賦予每個地點符合行情的推估消費 (`average_cost`)。
2. **防呆過濾 API (`/api/fetch_context`)**：
   - 作為過濾無效資訊的前線防火牆。只要前端傳入現在的「時間」跟「天氣」，API 就能自動把（如：已經關門的博物館，或是正下著雨但純戶外的景點）直接從資料陣列中剔除。這能幫助下一層的 AI Agent 省下龐大的推論 Token 成本，讓預測更精準。
3. **9 大主流 EMOJI 標籤字典**：
   - 內建 `api/taipei_dict.json` 包含百大觀光聖地，且完美映射了 9 種前端過濾 Tag（如 `🍜 在地美食`, `🛍️ 商圈購物` 等），與介面 100% 吻合！
4. **直覺化配對介面 (Tinder-like Swipe UI)**：
   - **左滑右滑選景點**：我們引入了類似交友軟體般超強互動性的「左滑/右滑」操作體驗，讓使用者挑選行程時像玩遊戲一樣無痛且直覺。
5. **GPS 座標準心與安心旅宿防護網**：
   - **定位推薦系統**：藉由定位系統動態掃描使用者附近的範圍，主動推送周遭的地標選項。
   - **合法登記認證**：完美對接政府合法旅宿資料，徹底排除高風險的日租套房。
   - **C/P 值霸主比對引擎**：系統內接超強即時算力，會動態交叉比對評價與房價，精準計算出每個住宿點的「最高性價比 (CP 值)」，幫旅客找到最省錢又高級的選擇！

## 🚀 快速開始 (Quick Start)

### 1. 啟動背景爬蟲與快取
若你需要單獨手動刷新最新的資料，只要執行這隻 Python 腳本：
```bash
python social_scraper.py
```
> 執行後，最新生成的景點資訊將被輸出至 `api/social_sentiment_mock.json`。

### 2. 啟動 API 伺服器
採用 FastAPI 架構，且內建開機自動爬取與背景「每 30 分鐘自動推進」的迴圈機制：
```bash
# 若尚未安裝相依套件請先： pip install -r requirements.txt
uvicorn api.index:app --reload
```

## 📡 API 路由說明 (API Endpoints)

### `POST /api/fetch_context`
給予環境上下文，讓後端回傳適合的精華景點名單與輿情結果。
**Request Body**:
```json
{
  "time": "15:30",
  "weather": "雨"
}
```
**Response**:
```json
{
  "valid_pois": [ ...被篩短、去除了室外景點的高質量陣列... ],
  "social_trends": [ ...百大論壇貼文輿情結果... ]
}
```

---
*Built for the Hackathon. Ready for the future!*

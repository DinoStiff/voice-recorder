const express = require('express');
const uploadApp = require('./api/upload.js');
const path = require('path');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config();

const app = express();

// 優先處理本地的 upload API
app.use('/api/upload', uploadApp);

// 將其他的 /api 請求全部轉發到 Python Backend (Port 8000)
app.use('/api', createProxyMiddleware({
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
    // 注意：Express app.use('/api') 會剝離前綴，所以我們需要補回去
    pathRewrite: {
        '^/': '/api/', 
    },
}));

// Emulate Vercel Static routing
app.use(express.static('public'));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/user/:id/record', (req, res) => res.sendFile(path.join(__dirname, 'public', 'record.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Local dev server running on port ${PORT}`);
    console.log(`Make sure to also run 'fastapi dev api/index.py' on port 8000 for Python features locally!`);
});

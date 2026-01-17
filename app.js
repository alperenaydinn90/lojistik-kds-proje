const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// İçe aktarmalar
const apiRouter = require('./routers/index');
const pageRouter = require('./routers/pages');
const hataYakalayici = require('./middlewares/errorHandler');

// Middleware
app.use(cors());
app.use(express.json()); // JSON veri okuma
app.use(express.static(path.join(__dirname, 'public'))); // CSS ve JS dosyaları için

// Rotaları Bağla
app.use('/api', apiRouter); // API istekleri /api ile başlar
app.use('/', pageRouter);   // Sayfa istekleri

// Hata Yönetimi (En sonda olmalı)
app.use(hataYakalayici);

app.listen(port, () => {
    console.log(`--------------------------------------------------`);
    console.log(`🚀 Akıllı Lojistik KDS ${port} portunda yayında!`);
    console.log(`🌍 Link: http://localhost:${port}`);
    console.log(`--------------------------------------------------`);
});
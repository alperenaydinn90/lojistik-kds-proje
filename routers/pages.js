const express = require('express');
const router = express.Router();
const path = require('path');

const viewsDir = path.join(__dirname, '../views');

// Ana Sayfa (localhost:5000/ isteği buraya gelir)
router.get('/', (req, res) => {
    res.sendFile(path.join(viewsDir, 'index.html'));
});

// Diğer sayfalar
router.get('/trafik', (req, res) => res.sendFile(path.join(viewsDir, 'trafik.html')));
router.get('/performans', (req, res) => res.sendFile(path.join(viewsDir, 'performans.html')));
router.get('/decision', (req, res) => res.sendFile(path.join(viewsDir, 'decision.html')));
router.get('/navbar.html', (req, res) => res.sendFile(path.join(viewsDir, 'navbar.html')));

module.exports = router;
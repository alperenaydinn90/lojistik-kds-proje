const express = require('express');
const router = express.Router();
const kontrolcu = require('../controllers/lojistikController');

// Frontend bu adrese istek atıyor: /api/dashboard
router.get('/dashboard', kontrolcu.getDashboard);

// İptal işlemi için
router.post('/iptal', kontrolcu.iptalEt);

module.exports = router;
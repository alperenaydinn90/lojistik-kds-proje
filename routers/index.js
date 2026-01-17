const router = require('express').Router();
const apiRoutes = require('./routes');

// Tüm API isteklerini buraya yönlendir
router.use(apiRoutes);

module.exports = router;
const { APIError } = require('../utils/error');

const hataYakalayici = (err, req, res, next) => {
    // Hataları konsola yazdır
    console.error(`[HATA] ${new Date().toLocaleString()} - ${err.message}`);

    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            basarili: false,
            mesaj: err.message
        });
    }

    return res.status(500).json({
        basarili: false,
        mesaj: 'Sunucu tarafında beklenmedik bir hata oluştu.'
    });
};

module.exports = hataYakalayici;
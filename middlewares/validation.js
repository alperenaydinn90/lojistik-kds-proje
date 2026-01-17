const { APIError } = require('../utils/error');

const sayfalamaKontrol = (req, res, next) => {
    const limit = parseInt(req.query.limit);
    const sayfa = parseInt(req.query.sayfa);

    if (req.query.limit && (isNaN(limit) || limit < 1 || limit > 100)) {
        return next(new APIError('Limit 1 ile 100 arasında olmalıdır', 400));
    }

    if (req.query.sayfa && (isNaN(sayfa) || sayfa < 1)) {
        return next(new APIError('Sayfa sayısı 1 veya daha büyük olmalıdır', 400));
    }

    next();
};

module.exports = { sayfalamaKontrol };
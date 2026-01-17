const logger = (req, res, next) => {
    const zaman = new Date().toISOString();
    const metod = req.method;
    const yol = req.originalUrl;

    console.log(`[LOG] ${zaman} | ${metod} ${yol}`);
    next();
};

module.exports = logger;
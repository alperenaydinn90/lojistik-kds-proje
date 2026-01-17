class APIError extends Error {
    constructor(mesaj, kod = 500) {
        super(mesaj);
        this.statusCode = kod;
    }
}
module.exports = { APIError };
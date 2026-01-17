class Response {
    constructor(data = null, message = null, status = 200) {
        this.data = data;
        this.message = message;
        this.status = status;
    }

    success(res) {
        // HTML 'success' ve 'data' bekliyor, 'basarili' ve 'veri' değil!
        return res.status(this.status || 200).json({
            success: true,
            message: this.message ?? 'İşlem başarılı',
            data: this.data
        });
    }

    error(res) {
        return res.status(this.status || 500).json({
            success: false,
            message: this.message ?? 'Bir hata oluştu',
            data: this.data
        });
    }
}

module.exports = Response;
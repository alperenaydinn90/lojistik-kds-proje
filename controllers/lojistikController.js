const lojistikServis = require('../services/lojistikServis');
const Response = require('../utils/response');

const getDashboard = async (req, res, next) => {
    try {
        // Servisten verileri çeker
        const liste = await lojistikServis.sevkiyatlarGetir(); 
        const istatistik = await lojistikServis.istatistikGetir();

        // Frontend bu yapıyı bekliyor: data.tablo ve data.ozet
        return new Response({
            tablo: liste,
            ozet: istatistik
        }).success(res);
        
    } catch (err) {
        console.error("Controller Hatası:", err);
        // Hata durumunda boş veri döner
        return new Response(null, "Veri çekilemedi: " + err.message, 500).error(res);
    }
};

const iptalEt = async (req, res, next) => {
    try {
        const { id, durum } = req.body;
        if (durum === 'Teslim Edildi') {
            return new Response(null, "HATA: Teslim edilen yük silinemez!", 400).error(res);
        }
        return new Response(null, "İşlem başarılı").success(res);
    } catch (err) {
        next(err);
    }
};

module.exports = { getDashboard, iptalEt };
const db = require('../db/mysql_connect');
const PuanlamaServisi = require('./puanlamaServisi');

const sevkiyatlarGetir = async () => {
    
    const sql = `
        SELECT 
            s.id, s.yuk_tipi, s.trafik_durumu, s.hava_durumu, s.tarih,
            m.firma_adi,
            a.plaka, a.bakim_durumu,
            sf.ad_soyad, sf.performans_puani,
            r.guzergah_adi, r.yol_risk_puani
        FROM sevkiyatlar s
        JOIN musteriler m ON s.musteri_id = m.id
        JOIN araclar a ON s.arac_id = a.id
        JOIN soforler sf ON s.sofor_id = sf.id
        JOIN rotalar r ON s.rota_id = r.id
        ORDER BY s.tarih DESC
    `;
    
    try {
        const [rows] = await db.query(sql);
        
        // Veri gelmezse boş dizi dön
        if (!rows || rows.length === 0) return [];

        return rows.map(item => {
            // Risk hesaplama
            const riskSonuc = PuanlamaServisi.riskHesapla(item);
            const kararSonuc = PuanlamaServisi.oneriGetir(riskSonuc);

            // Frontend'in beklediği format
            return {
                ...item,
                analiz: {
                    puan: riskSonuc,
                    karar: kararSonuc.karar, // Frontend 'karar' bekliyor
                    renk: kararSonuc.renk,
                    detay: kararSonuc.detay
                }
            };
        });
    } catch (error) {
        console.error("SQL Hatası:", error);
        throw error;
    }
};

const istatistikGetir = async () => {
    const [toplam] = await db.query('SELECT COUNT(*) as sayi FROM sevkiyatlar');
    return {
        toplam_is: toplam[0].sayi,
        riskli_arac: 1, // Şimdilik sabit, hata olmasın
        strateji_notu: "Sistem Aktif"
    };
};

module.exports = { sevkiyatlarGetir, istatistikGetir };
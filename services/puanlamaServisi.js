/**
 * AKILLI LOJİSTİK KARAR DESTEK MOTORU (KDS ENGINE)
 * Bu servis, veritabanından gelen ham verileri (trafik, hava, bakım, şoför)
 * işleyerek 0-100 arası bir risk skoru ve stratejik öneri üretir.
 */

class PuanlamaServisi {
    
    // KDS Parametreleri ve Ağırlık Katsayıları
    static AGIRLIKLAR = {
        TRAFIK_DURUMU: 0.35,  // Trafiğin riske etkisi %35
        HAVA_KOSULLARI: 0.25, // Hava durumunun etkisi %25
        ARAC_SAGLIGI: 0.20,   // Araç bakımının etkisi %20
        YOL_ZORLUGU: 0.15,    // Yolun zorluk derecesi %15
        SOFOR_ETKISI: 0.05    // Şoför performansı %5
    };

    // Risk Seviye Sınırları
    static SINIRLAR = {
        YUKSEK: 80,
        ORTA: 50,
        DUSUK: 20
    };

    /**
     * Risk Hesaplama Algoritması
     * @param {Object} veri - Veritabanından gelen JOIN edilmiş satır
     */
    static riskHesapla(veri) {
        let hamPuan = 0;

        // 1. ADIM: TRAFİK ANALİZİ
        let trafikPuan = 0;
        switch (veri.trafik_durumu) {
            case 'Kaza Var': trafikPuan = 100; break;
            case 'Yoğun': trafikPuan = 60; break;
            case 'Orta': trafikPuan = 30; break;
            default: trafikPuan = 0; // Açık
        }

        // 2. ADIM: HAVA DURUMU ANALİZİ
        let havaPuan = 0;
        if (veri.hava_durumu === 'Fırtına' || veri.hava_durumu === 'Kar') {
            havaPuan = 100;
        } else if (veri.hava_durumu === 'Yağmurlu' || veri.hava_durumu === 'Sisli') {
            havaPuan = 50;
        } else {
            havaPuan = 0; // Güneşli
        }

        // 3. ADIM: ARAÇ SAĞLIK DURUMU
        let aracPuan = 0;
        if (veri.bakim_durumu === 'Kritik') {
            aracPuan = 100; // Kritik araç büyük risktir
        } else if (veri.bakim_durumu === 'Orta') {
            aracPuan = 40;
        } else {
            aracPuan = 10; // İyi
        }

        // 4. ADIM: ROTA ZORLUK DERECESİ (Veritabanından gelir)
        let yolPuan = veri.yol_risk_puani || 0;

        // 5. ADIM: ŞOFÖR PERFORMANSI (Negatif Risk - Bonus)
        // Şoför puanı ne kadar yüksekse, risk o kadar düşer.
        let soforBonus = 0;
        if (veri.performans_puani > 90) soforBonus = 20;
        else if (veri.performans_puani > 80) soforBonus = 10;

        // --- AĞIRLIKLI ORTALAMA HESABI ---
        hamPuan = (trafikPuan * this.AGIRLIKLAR.TRAFIK_DURUMU) +
                  (havaPuan * this.AGIRLIKLAR.HAVA_KOSULLARI) +
                  (aracPuan * this.AGIRLIKLAR.ARAC_SAGLIGI) +
                  (yolPuan * this.AGIRLIKLAR.YOL_ZORLUGU);

        // Şoför bonusunu düş
        hamPuan = hamPuan - (soforBonus * this.AGIRLIKLAR.SOFOR_ETKISI);

        // Sonucu 0-100 arasına sabitle (Normalize et)
        return Math.min(Math.max(Math.round(hamPuan), 0), 100);
    }

    /**
     * Puan bazlı aksiyon önerisi üretir
     */
    static oneriGetir(puan) {
        if (puan >= this.SINIRLAR.YUKSEK) {
            return { karar: "DURDUR", renk: "red", detay: "Kritik Risk! Operasyon durdurulmalı." };
        } 
        else if (puan >= this.SINIRLAR.ORTA) {
            return { karar: "DİKKAT", renk: "orange", detay: "Şartlar zorlu, rota değişimi önerilir." };
        } 
        else {
            return { karar: "UYGUN", renk: "green", detay: "Sevkiyat planlandığı gibi ilerliyor." };
        }
    }
}

module.exports = PuanlamaServisi;
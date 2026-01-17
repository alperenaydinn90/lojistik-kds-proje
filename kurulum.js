const mysql = require('mysql2/promise');

async function veritabaniKur() {
    const baglanti = await mysql.createConnection({
        host: '127.0.0.1', user: 'root', password: ''
    });

    try {
        console.log("⏳ Veritabanı Sıfırlanıyor...");
        
        await baglanti.query(`DROP DATABASE IF EXISTS lojistik_kds_db`);
        await baglanti.query(`CREATE DATABASE lojistik_kds_db`);
        await baglanti.query(`USE lojistik_kds_db`);

        // 1. Müşteriler
        await baglanti.query(`CREATE TABLE musteriler (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firma_adi VARCHAR(100),
            sektor VARCHAR(50)
        )`);

        // 2. Araçlar (Backend 'plaka' ve 'bakim_durumu' bekliyor)
        await baglanti.query(`CREATE TABLE araclar (
            id INT AUTO_INCREMENT PRIMARY KEY,
            plaka VARCHAR(20),
            tip VARCHAR(50),
            bakim_durumu VARCHAR(20) -- 'Kritik', 'İyi', 'Orta'
        )`);

        // 3. Şoförler (Backend 'ad_soyad' ve 'performans_puani' bekliyor)
        await baglanti.query(`CREATE TABLE soforler (
            id INT AUTO_INCREMENT PRIMARY KEY,
            ad_soyad VARCHAR(100),
            telefon VARCHAR(20),
            performans_puani INT
        )`);

        // 4. Rotalar (Backend 'guzergah_adi' ve 'yol_risk_puani' bekliyor)
        await baglanti.query(`CREATE TABLE rotalar (
            id INT AUTO_INCREMENT PRIMARY KEY,
            guzergah_adi VARCHAR(100),
            yol_risk_puani INT
        )`);

        // 5. Sevkiyatlar (Ana Tablo - Bağlantılar)
        await baglanti.query(`CREATE TABLE sevkiyatlar (
            id INT AUTO_INCREMENT PRIMARY KEY,
            musteri_id INT,
            arac_id INT,
            sofor_id INT,
            rota_id INT,
            yuk_tipi VARCHAR(50),
            trafik_durumu VARCHAR(50), -- 'Yoğun', 'Kaza Var'
            hava_durumu VARCHAR(50),   -- 'Yağmurlu', 'Fırtına'
            tarih DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        console.log("✅ Tablolar oluşturuldu. Veriler giriliyor...");

        // Veri Girişi
        await baglanti.query(`INSERT INTO musteriler (firma_adi) VALUES ('Trendyol'), ('Getir'), ('Migros')`);
        await baglanti.query(`INSERT INTO araclar (plaka, bakim_durumu) VALUES ('34 KDS 99', 'İyi'), ('06 ANK 06', 'Kritik'), ('35 IZM 35', 'Orta')`);
        await baglanti.query(`INSERT INTO soforler (ad_soyad, performans_puani) VALUES ('Ahmet Yılmaz', 95), ('Mehmet Demir', 70), ('Ayşe Kaya', 100)`);
        await baglanti.query(`INSERT INTO rotalar (guzergah_adi, yol_risk_puani) VALUES ('İstanbul-Ankara', 20), ('Hakkari-Van', 90), ('İzmir-Aydın', 10)`);

        // Sevkiyatları Bağla
        await baglanti.query(`INSERT INTO sevkiyatlar (musteri_id, arac_id, sofor_id, rota_id, yuk_tipi, trafik_durumu, hava_durumu) VALUES 
        (1, 1, 1, 1, 'Elektronik', 'Açık', 'Güneşli'),
        (2, 2, 2, 2, 'Gıda', 'Kaza Var', 'Fırtına'),
        (3, 3, 3, 3, 'Kimyasal', 'Yoğun', 'Yağmurlu')`);

        console.log("🏁 VERİTABANI HAZIR! Veriler %100 yüklendi.");

    } catch (e) {
        console.error("❌ HATA:", e.message);
    } finally {
        await baglanti.end();
    }
}

veritabaniKur();
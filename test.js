const mysql = require('mysql2/promise');

async function testEt() {
    console.log("------------------------------------------------");
    console.log("🕵️‍♂️ BAĞLANTI TESTİ BAŞLIYOR...");
    console.log("------------------------------------------------");

    // 1. ADIM: Sunucuya Bağlanma (DBngin Açık mı?)
    let baglanti;
    try {
        baglanti = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '', 
            port: 3306 // DİKKAT: DBngin'de port 3307 ise burayı 3307 yap!
        });
        console.log("✅ 1. ADIM BAŞARILI: DBngin (MySQL) çalışıyor.");
    } catch (e) {
        console.log("❌ 1. ADIM HATALI: DBngin'e bağlanılamadı!");
        console.log("SEBEP: DBngin kapalı olabilir veya Port numarası (3306) yanlıştır.");
        console.log("Hata Detayı:", e.message);
        return;
    }

    // 2. ADIM: Veritabanı Var mı? (lojistik_kds_db)
    try {
        await baglanti.query('USE lojistik_kds_db');
        console.log("✅ 2. ADIM BAŞARILI: 'lojistik_kds_db' veritabanı bulundu.");
    } catch (e) {
        console.log("❌ 2. ADIM HATALI: Veritabanı YOK!");
        console.log("ÇÖZÜM: 'node kurulum.js' komutunu çalıştırmamışsın.");
        return;
    }

    // 3. ADIM: Tablolar ve Veriler Var mı?
    try {
        const [satirlar] = await baglanti.query('SELECT count(*) as sayi FROM sevkiyatlar');
        const kayitSayisi = satirlar[0].sayi;
        
        if (kayitSayisi > 0) {
            console.log(`✅ 3. ADIM BAŞARILI: Tablolar dolu. İçeride ${kayitSayisi} tane sevkiyat var.`);
            console.log("------------------------------------------------");
            console.log("🎉 SONUÇ: VERİTABANI %100 SAĞLAM. Sorun HTML veya Tarayıcıda.");
        } else {
            console.log("⚠️ 3. ADIM EKSİK: Tablo var ama İÇİ BOŞ.");
            console.log("ÇÖZÜM: 'node kurulum.js' komutunu tekrar çalıştır.");
        }
    } catch (e) {
        console.log("❌ 3. ADIM HATALI: 'sevkiyatlar' tablosu yok!");
        console.log("ÇÖZÜM: 'node kurulum.js' çalıştırarak tabloları kur.");
    } finally {
        if(baglanti) baglanti.end();
    }
}

testEt();
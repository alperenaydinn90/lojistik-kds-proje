// İstemci Tarafı Puanlama Motoru
class PuanlamaMotoru {
    static skorHesapla(veri) {
        let puan = 0;
        // Basit simülasyon puanlaması
        if(veri.trafik === 'Yoğun') puan += 30;
        if(veri.hava === 'Kötü') puan += 20;
        return Math.min(puan, 100);
    }

    static renkGetir(puan) {
        if(puan > 70) return '#e74c3c'; // Kırmızı
        if(puan > 40) return '#f39c12'; // Turuncu
        return '#27ae60'; // Yeşil
    }
}
# 🚛 Filo Yönetim Karar Destek Sistemi (Lojistik KDS)

## 📄 Proje Açıklaması

Bu proje, **Yönetim Bilişim Sistemleri - Karar Destek Sistemleri (KDS)** dersi kapsamında geliştirilmiş, lojistik operasyonlarında veriye dayalı stratejik karar vermeyi sağlayan sunucu taraflı bir yazılım projesidir. Sistem; araç durumu, şoför performansı ve çevresel faktörleri (hava, trafik) analizerek yöneticiye **Risk Skoru** ve **Aksiyon Önerileri** sunar.

Uygulama, **MVC (Model-View-Controller)** mimarisine uygun olarak tasarlanmış olup, REST prensiplerine uygun API uç noktaları içermektedir. Kod yapısı okunabilirlik, sürdürülebilirlik ve genişletilebilirlik esas alınarak geliştirilmiştir.

---

## 🎬 Senaryo Tanımı

Büyük ölçekli lojistik operasyonlarında; araç arızaları, ani hava değişimleri ve rota riskleri nedeniyle teslimat süreçlerinde aksamalar yaşanmaktadır. Manuel takip yöntemleri, risklerin önceden tespit edilmesinde yetersiz kalmaktadır.

Bu proje kapsamında geliştirilen sistem, lojistik verileri analizerek:

* **Canlı Operasyon Takibi:** Anlık sevkiyat durumlarını görselleştirir.
* **Risk Analizi:** Çok Kriterli Karar Verme (MCDM) algoritmalarıyla operasyonel risk puanı hesaplar.
* **Stratejik Karar Destek:** Kritik durumlarda yöneticiye "Durdur", "İzle" veya "Onayla" önerileri sunar.

Amaç, operasyonel körlüğü gidererek filo güvenliğini artırmak ve maliyetleri düşürmektir.

---

📷 Ekran Görüntüleri

### 1. Yönetim Paneli (Dashboard)
![Dashboard Ekranı](screenshots/Dashboard.png)

### 2. Yeni Sevkiyat Ekleme
![Sevkiyat Ekleme](screenshots/sevkiyatGirisi.png)

### 3. Filo Durumu
![Filo Ekranı](screenshots/filoVeAraclar.png)

### 4. Sistem Ayarları
![Filo Ekranı](screenshots/sistemAyarlari.png)


## 🛠 Kurulum

Bu proje Node.js ve MySQL tabanlıdır.

### Gereksinimler

* Node.js (v18 veya üzeri)
* npm
* MySQL Veritabanı (DBngin, XAMPP veya Yerel Sunucu)

### Kurulum Adımları

1. **Projeyi klonlayın:**

```bash
git clone [https://github.com/alperenaydinn90/lojistik-kds-proje.git](https://github.com/KULLANICI_ADIN/lojistik-kds-proje.git)
cd lojistik-kds-proje

Bağımlılıkları yükleyin:

Bash

npm install
Ortam değişkenlerini ayarlayın:

Proje dizinindeki .env.example dosyasını kopyalayarak .env dosyasını oluşturun.

Bash

cp .env.example .env
.env dosyası içerisine veritabanı bilgilerinizi girin. (Mac/DBngin için 127.0.0.1 önerilir).

Veritabanını Kurun (Önemli):

Bash

node kurulum.js
Uygulamayı başlatın:

Bash

npm start
Uygulama varsayılan olarak şu adreste çalışır: http://localhost:5001

## API Endpoint Listesi

![API ENDPOINT LISTESI](screenshots/api_endpoints.png)

⚖️ İş Kuralları (Business Rules)
Sistem, karar destek mekanizmasında aşağıdaki katı kuralları uygular:

1. Olumsuz Hava Koşullarında Risk Eskalasyonu
Bir sevkiyatın rotasında "Fırtına" veya "Yoğun Kar" tespit edildiğinde, diğer faktörler (araç yaşı, şoför puanı) ne kadar iyi olursa olsun Risk Skoru otomatik olarak Kritik (>80) seviyesine çekilir. Yönetici onayı olmadan sevkiyat başlatılamaz.

HTTP Status: 200 OK

Mesaj: "Hava muhalefeti nedeniyle operasyon askıya alındı."

2. Kritik Bakım Durumundaki Araç Kısıtlaması
Veritabanında bakım durumu "Kritik" olarak işaretlenmiş bir araca, sistem tarafından uzun mesafe (>300km) yük ataması yapılması engellenir. Bu kural, iş güvenliği gereği "Hard Constraint" olarak tanımlanmıştır.

HTTP Status: 422 Unprocessable Entity

Mesaj: "Kritik bakım durumundaki araca uzun mesafe görevi atanamaz."

📊 ER Diyagramı

Uygulamanın veritabanı ilişkisel şeması aşağıdaki gibidir. (Müşteriler, Araçlar, Şoförler, Rotalar ve Sevkiyatlar arasındaki ilişkiler)

![ER Diyagramı](screenshots/er_diyagrami.png)


Projede kullanılan hassas veriler .env.example dosyasında şablon olarak tanımlanmıştır. Güvenlik sebebiyle .env dosyası repoya eklenmemiştir.



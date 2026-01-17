document.addEventListener('DOMContentLoaded', () => {
    navbariYukle();
    sayfayiBaslat();
});

async function navbariYukle() {
    try {
        const resp = await fetch('/navbar.html');
        const html = await resp.text();
        document.getElementById('navbar-container').innerHTML = html;
    } catch (e) { console.error("Navbar yüklenemedi", e); }
}

function sayfayiBaslat() {
    const yol = window.location.pathname;
    if (yol === '/' || yol === '/index.html') {
        dashboardVerileriniCek();
    } else if (yol === '/decision') {
        kararDestekVerileriniCek();
    }
}

async function dashboardVerileriniCek() {
    // modüler yapı bozulmasın.
    console.log("Dashboard yüklendi.");
}

async function kararDestekVerileriniCek() {
    // decision.html için veri çekme simülasyonu
    console.log("Karar destek modülü aktif.");
}
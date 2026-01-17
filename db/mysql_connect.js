const mysql = require('mysql2');
require('dotenv').config();

const havuz = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// BAĞLANTI TESTİ (Bunu ekledik)
havuz.getConnection((err, connection) => {
    if (err) {
        console.error('❌ VERİTABANI HATASI:', err.code);
        console.error('Hata Detayı:', err.message);
    } else {
        console.log('✅ VERİTABANI BAĞLANTISI BAŞARILI!');
        connection.release();
    }
});

module.exports = havuz.promise();
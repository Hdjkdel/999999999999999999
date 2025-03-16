// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyB9z_DMGLF4KGfE573PTkc_2f86GlwEMjg",
    authDomain: "softv-a62b4.firebaseapp.com",
    databaseURL: "https://softv-a62b4-default-rtdb.firebaseio.com",
    projectId: "softv-a62b4",
    storageBucket: "softv-a62b4.appspot.com",
    messagingSenderId: "976431864674",
    appId: "1:976431864674:web:d3a52ccf8c13c45a146a3b"
};

// Firebase başlat
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let keyCache = null; // Key'leri önbelleğe almak için değişken

// Sayfa açıldığında key'leri çek ve kaydet
function loadKeys() {
    return database.ref("keys").once("value").then(snapshot => {
        if (snapshot.exists()) {
            keyCache = snapshot.val(); // Tüm key'leri önbelleğe al
        }
    }).catch(error => {
        console.error("Firebase hata:", error);
    });
}

// Sayfa yüklendiğinde key'leri al
loadKeys();

// Eğer localStorage'da key varsa, otomatik giriş yap
window.onload = function () {
    let savedKey = localStorage.getItem("userKey");
    if (savedKey) {
        document.getElementById("password").value = savedKey;
        checkKey(savedKey, true); // Otomatik giriş yap
    }
};

// Formun gönderilmesini dinle
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let key = document.getElementById("password").value.trim();
    checkKey(key);
});

function checkKey(key, isAutoLogin = false) {
    let errorMessage = document.getElementById("errorMessage");

    if (!key) {
        errorMessage.innerText = "Lütfen bir key girin.";
        return;
    }

    // **Önbellekten kontrol et** (Firebase'e tekrar gitmeden)
    if (keyCache) {
        let validKey = Object.values(keyCache).find(k => k.value === key && k.active);

        if (validKey) {
            localStorage.setItem("userKey", key); // Key'i kaydet (otomatik giriş için)
            window.location.href = "index909.html"; // **index909.html sayfasına yönlendir**
        } else {
            if (!isAutoLogin) {
                errorMessage.innerText = "Geçersiz veya pasif key!";
            }
        }
    } else {
        // Eğer önbellekte yoksa Firebase'den çek
        database.ref("keys").once("value").then(snapshot => {
            if (snapshot.exists()) {
                keyCache = snapshot.val();
                checkKey(key, isAutoLogin); // Tekrar kontrol et (Firebase'den güncel veriyle)
            } else {
                errorMessage.innerText = "Hiç key bulunamadı!";
            }
        }).catch(error => {
            console.error("Firebase hatası:", error);
            errorMessage.innerText = "Bağlantı hatası!";
        });
    }
}

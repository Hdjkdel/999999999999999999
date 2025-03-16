// Seçilen coinleri tutan dizi
let selectedCoins = [];

// Coin'e tıklandığında çalışan fonksiyon
function toggleCoin(element) {
  const coin = element.getAttribute("data-coin");

  // Eğer coin zaten seçilmişse, listeden çıkar ve parlaklığı sıfırla
  if (selectedCoins.includes(coin)) {
    selectedCoins = selectedCoins.filter(c => c !== coin);
    element.classList.remove("selected");
  } else {
    // Coin seçilmemişse, listeye ekle ve parlaklığını artır
    selectedCoins.push(coin);
    element.classList.add("selected");
  }

  // Seçimlere göre parlaklığı güncelle
  updateBrightness();
}

// Tüm coin'lerin parlaklığını güncelle
function updateBrightness() {
  const coins = document.querySelectorAll(".coin");

  coins.forEach(coin => {
    const coinName = coin.getAttribute("data-coin");

    // Eğer coin seçilmişse tam parlaklık yap, seçilmemişse karart
    if (selectedCoins.includes(coinName)) {
      coin.classList.remove("dimmed");
    } else {
      coin.classList.add("dimmed");
    }
  });
}

// Start butonuna basıldığında çalışan fonksiyon
function startProcess() {
  if (selectedCoins.length === 0) {
    alert("⚠️ Legendary Alert! You must select at least one coin before starting! ⚠️");
  } else {
    window.location.href = "indexx.html";
  }
}
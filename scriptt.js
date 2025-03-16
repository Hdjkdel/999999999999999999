const coins = [
    { name: "BTC", color: "btc", logo: "https://i.imgur.com/363d2W2.png", chance: 0.0000000000000000000000000000000001, found: false, value: 170 },
    { name: "ETH", color: "eth", logo: "https://i.imgur.com/I4V9ywr.png", chance: 0.0000000000000001, found: false, value: 004 },
    { name: "TRX", color: "trx", logo: "https://i.imgur.com/v4huAvo_d.webp?maxwidth=760&fidelity=grand", chance: 0.000000000000000001, found: false, value: 105 },
    { name: "BNB", color: "bnb", logo: "https://i.imgur.com/gwrIQTZ_d.webp?maxwidth=760&fidelity=grand", chance: 0.000000000001, found: false, value: 367 },
    { name: "USDT", color: "usdt", logo: "https://i.imgur.com/jJrwIvV.png", chance: 0.0000000000000000001, found: false, value: 129 },
    { name: "SOL", color: "sol", logo: "https://i.imgur.com/he7NxNK.png", chance: 0.0000000000000000001, found: false, value: 159 },
    { name: "DOGE", color: "doge", logo: "https://i.imgur.com/baWhshZ_d.webp?maxwidth=760&fidelity=grand", chance: 0.00000000000001, found: false, value: 51 },
    { name: "MATIC", color: "matic", logo: "https://i.imgur.com/ALUdSY9.png", chance: 0.000000000000, found: false, value: 4 },
];

const englishWords = [
    "abandon", "ability", "able", "about", "above", "absent", "absorb",
    "water", "wave", "way", "wealth", "weapon", "yard", "year", "yellow", "yes",
    "yet", "you", "young", "youth", "zebra", "zero", "zone", "zoo"
];

let inspCount = Math.floor(Math.random() * (1 - 1 + 1)) + 1; // 1M - 10M arası başlangıç
let foundCount = 0;
let totalValue = 0;

const inspCountEl = document.getElementById("insp-count");
const foundCountEl = document.getElementById("found-count");
const totalValueEl = document.getElementById("total-value");
const walletDisplay = document.getElementById("wallet-display");
const foundWallets = document.getElementById("found-wallets");

let intervalId = null;

function generateWalletAddress() {
    // Seed-phrase: 12 random English words
    const seedPhrase = Array.from({ length: 12 }, () =>
        englishWords[Math.floor(Math.random() * englishWords.length)]
    ).join(" ");
    return `*seed-phrase: ${seedPhrase}`;
}

function addFoundWallet(coin) {
    foundCount++;
    const coinData = coins.find((c) => c.name === coin);

    const walletElement = document.createElement("div");
    walletElement.classList.add("found-wallet", coinData.color);

    walletElement.innerHTML = `
        <img src="${coinData.logo}" alt="${coin}" />
        ${coin} - ${coinData.value.toFixed(2)}$
    `;

    foundWallets.appendChild(walletElement);

    foundCountEl.textContent = foundCount;
    totalValue += coinData.value;
    totalValueEl.textContent = totalValue.toFixed(2) + "$";
}

function startScanning() {
    intervalId = setInterval(() => {
        const walletAddress = generateWalletAddress();
        const addressDiv = document.createElement("div");
        addressDiv.textContent = walletAddress;
        walletDisplay.appendChild(addressDiv);

        // Ekranın yüksekliği aşıldığında en üstteki adresi kaldır
        while (walletDisplay.scrollHeight > walletDisplay.clientHeight) {
            walletDisplay.removeChild(walletDisplay.firstChild);
        }

        inspCount++;

        // Her coin için rastgele bulunma olasılığı
        coins.forEach((coin) => {
            if (!coin.found && Math.random() < coin.chance) { // Eğer olasılık sağlanırsa ve coin henüz bulunmadıysa
                addFoundWallet(coin.name); // Coin'e özel sabit değer ekle
                coin.found = true; // Coin'in bulunduğunu işaretle
            }
        });

        inspCountEl.textContent = inspCount;
    }, 50); // 50ms hızla döngü
}

function toggleScan() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    } else {
        startScanning();
    }
}

document.getElementById("start-stop-btn").addEventListener("click", toggleScan);
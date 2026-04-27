// 1. Firebaseの機能をインポート（必要な分だけ）
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 2. 山田さんのプロジェクト専用の「接続キー」
const firebaseConfig = {
  apiKey: "AIzaSyCFLoxAtq1XzjNjWSGop8pLT6hUw6z8prw",
  authDomain: "cafe-app-firebase-5fb26.firebaseapp.com",
  projectId: "cafe-app-firebase-5fb26",
  storageBucket: "cafe-app-firebase-5fb26.firebasestorage.app",
  messagingSenderId: "512184508181",
  appId: "1:512184508181:web:4db0dc3f4ffdff4241131c",
  measurementId: "G-8272DNLWTY"
};

// 3. Firebaseを起動
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. 接続確認用のログ
console.log("Firebaseとの接続準備が整いました！", db);
const seatList = document.getElementById("seatList");

// ---------------- データ読み込み ----------------
function loadSeats() {
  const data = localStorage.getItem("seats");
  return data ? JSON.parse(data) : [];
}

// ---------------- データ保存 ----------------
function saveSeats(seats) {
  localStorage.setItem("seats", JSON.stringify(seats));
}

// ---------------- 描画 ----------------
function render() {
  const seats = loadSeats();
  seatList.innerHTML = "";

  seats.forEach(seat => {
    const li = document.createElement("li");
    
    // 全体をリセット
    li.className = ""; 

    if (seat.available) {
      li.classList.add("available");
      li.innerHTML = `<span>🟢 空席 <strong>${seat.name}</strong></span>`;
      
      const reserveBtn = document.createElement("button");
      reserveBtn.textContent = "予約する";
      reserveBtn.addEventListener("click", () => {
        const userName = prompt("予約名を入力してください");
        if (!userName) return;
        seat.reservedBy = userName;
        seat.available = false;
        saveSeats(seats);
        render();
      });
      li.appendChild(reserveBtn);
      
    } else if (seat.reservedBy) {
      li.classList.add("reserved");
      li.innerHTML = `<span>🟡 予約済(${seat.reservedBy}) <strong>${seat.name}</strong></span>`;
      
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "キャンセル";
      cancelBtn.addEventListener("click", () => {
        if(confirm("予約をキャンセルしますか？")) {
          seat.reservedBy = null;
          seat.available = true;
          saveSeats(seats);
          render();
        }
      });
      li.appendChild(cancelBtn);
      
    } else {
      li.classList.add("occupied");
      li.innerHTML = `<span>🔴 利用中 <strong>${seat.name}</strong></span>`;
    }

    seatList.appendChild(li);
  });
}

// ---------------- 初期表示 ----------------
render();

// 🔄 3秒ごとに更新
setInterval(render, 3000);
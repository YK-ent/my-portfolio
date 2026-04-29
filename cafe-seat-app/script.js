// 1. Firebaseの機能をインポート
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot ,query ,orderBy} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 2. 接続キー（客側と同じものでOK）
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
console.log("店側もFirebase接続完了！", db);
// ---------------- DOM取得 ----------------
const seatList = document.getElementById("seatList");
const seatNameInput = document.getElementById("seatName");
const addSeatBtn = document.getElementById("addSeatBtn");
const searchInput = document.getElementById("search");
const showAllBtn = document.getElementById("showAll");
const showAvailableBtn = document.getElementById("showAvailable");

let seats = [];
let nextId = 1;

// ---------------- 保存・読み込み ----------------
function saveSeats() {
  localStorage.setItem("seats", JSON.stringify(seats));
  localStorage.setItem("nextSeatId", nextId);
}

function loadSeats() {
  const data = localStorage.getItem("seats");
  const savedId = localStorage.getItem("nextSeatId");
  if (data) seats = JSON.parse(data);
  if (savedId) nextId = Number(savedId);
}

// ---------------- リスト描画 ----------------
function render(filterAvailable = false) {
  seatList.innerHTML = "";
  const keyword = searchInput.value.trim();

  const filtered = seats.filter(seat => {
    if (filterAvailable && !seat.available) return false;
    if (!keyword) return true;
    return seat.name.includes(keyword);
  });

  filtered.forEach(seat => {
    const li = document.createElement("li");

    // --- ここから：状態判定とクラス付与 ---
    let statusIcon = "🔴";
    let statusText = "利用中";
    li.classList.remove("available", "occupied", "reserved");

    if (seat.available) {
      statusIcon = "🟢";
      statusText = "空席";
      li.classList.add("available");
    } else if (seat.reservedBy) {
      statusIcon = "🟡";
      statusText = `予約済(${seat.reservedBy})`;
      li.classList.add("reserved");
    } else {
      li.classList.add("occupied");
    }

    // アイコン、テキスト、席名をまとめて入れる
    li.innerHTML = `<span>${statusIcon} ${statusText}</span> <strong>${seat.name}</strong>`;

    // --- ここから：操作ボタンの作成 ---
    const toggleBtn = document.createElement("button");
    
    if (seat.reservedBy) {
      toggleBtn.textContent = "予約を解除";
      toggleBtn.addEventListener("click", () => {
        if(confirm("予約をキャンセルして空席に戻しますか？")) {
          seat.reservedBy = null;
          seat.available = true;
          saveSeats();
          render(filterAvailable);
        }
      });
    } else {
      toggleBtn.textContent = seat.available ? "利用中にする" : "空席にする";
      toggleBtn.addEventListener("click", () => {
        seat.available = !seat.available;
        saveSeats();
        render(filterAvailable);
      });
    }

    li.appendChild(toggleBtn);
    seatList.appendChild(li);
  });
}

// ---------------- 新規席追加 ----------------
addSeatBtn.addEventListener("click", () => {
  const name = seatNameInput.value.trim();
  if (!name) return alert("席名を入力してください");

  seats.push({ id: nextId++, name, available: true });
  seatNameInput.value = "";
  saveSeats();
  render();
});

// Enterキーで席追加
seatNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addSeatBtn.click(); // クリックと同じ処理を呼ぶ
  }
});

// ---------------- 検索 ----------------
searchInput.addEventListener("input", () => render());

// ---------------- フィルタ ----------------
showAllBtn.addEventListener("click", () => render(false));
showAvailableBtn.addEventListener("click", () => render(true));


// ---------------- 初期表示 ----------------
loadSeats();
render();

// ---------------- リアルタイム監視 (Firebase版) ----------------
const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
  console.log("クラウドで更新がありました！");
  
  // 1. まずは最新の予約データをすべて取得する
  const orders = snapshot.docs.map(doc => doc.data());

  // 2. 既存の席データ（localStorage）に予約情報を反映させる
  loadSeats();
  
  orders.forEach(order => {
    // 席名が一致するものを探して「予約済」にする
    const targetSeat = seats.find(s => s.name === order.seatName);
    if (targetSeat && targetSeat.available) {
      targetSeat.available = false;
      targetSeat.reservedBy = order.userName;
    }
  });

  // 3. 最後に「画面を再描画」する！（これが重要）
  localStorage.setItem("seats", JSON.stringify(seats)); // ローカルも更新しておく
  render(); 
  
  console.log("画面を最新の状態に更新しました！");
});
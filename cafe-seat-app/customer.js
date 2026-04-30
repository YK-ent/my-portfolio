import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFLoxAtq1XzjNjWSGop8pLT6hUw6z8prw",
  authDomain: "cafe-app-firebase-5fb26.firebaseapp.com",
  projectId: "cafe-app-firebase-5fb26",
  storageBucket: "cafe-app-firebase-5fb26.firebasestorage.app",
  messagingSenderId: "512184508181",
  appId: "1:512184508181:web:4db0dc3f4ffdff4241131c",
  measurementId: "G-8272DNLWTY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const seatList = document.getElementById("seatList");

// ---------------- 描画関数 ----------------
function render(seatsData) {
  seatList.innerHTML = "";
  
  seatsData.forEach(seat => {
    const li = document.createElement("li");
    li.className = seat.status === "available" ? "available" : (seat.status === "reserved" ? "reserved" : "occupied");

    if (seat.status === "available") {
      li.innerHTML = `<span>🟢 空席 <strong>${seat.name}</strong></span>`;
      const btn = document.createElement("button");
      btn.textContent = "予約する";
      btn.onclick = async () => {
        const userName = prompt("予約名を入力してください");
        if (userName) {
          await updateDoc(doc(db, "seats", seat.id), {
            status: "reserved",
            reservedBy: userName
          });
        }
      };
      li.appendChild(btn);
    } else if (seat.status === "reserved") {
      li.innerHTML = `<span>🟡 予約済(${seat.reservedBy}) <strong>${seat.name}</strong></span>`;
    } else {
      li.innerHTML = `<span>🔴 利用中 <strong>${seat.name}</strong></span>`;
    }
    seatList.appendChild(li);
  });
}

// ---------------- リアルタイム監視 ----------------
const q = query(collection(db, "seats"), orderBy("timestamp", "asc"));

onSnapshot(q, (snapshot) => {
  const seatsData = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  render(seatsData);
});
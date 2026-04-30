import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const seatNameInput = document.getElementById("seatName");
const addSeatBtn = document.getElementById("addSeatBtn");

// ---------------- リスト描画 ----------------
function render(seatsData) {
  seatList.innerHTML = "";
  
  seatsData.forEach(seat => {
    const li = document.createElement("li");

    let statusIcon = "🔴";
    let statusText = "利用中";
    li.className = ""; 

    if (seat.status === "available") {
      statusIcon = "🟢";
      statusText = "空席";
      li.classList.add("available");
    } else if (seat.status === "reserved") {
      statusIcon = "🟡";
      statusText = `予約済(${seat.reservedBy})`;
      li.classList.add("reserved");
    } else {
      li.classList.add("occupied");
    }

    li.innerHTML = `<span>${statusIcon} ${statusText}</span> <strong>${seat.name}</strong>`;

    const toggleBtn = document.createElement("button");
    
    if (seat.status === "reserved") {
      toggleBtn.textContent = "予約を解除";
      toggleBtn.addEventListener("click", async () => {
        if(confirm("予約をキャンセルして空席に戻しますか？")) {
          await updateDoc(doc(db, "seats", seat.id), {
            status: "available",
            reservedBy: ""
          });
        }
      });
    } else {
      toggleBtn.textContent = seat.status === "available" ? "利用中にする" : "空席にする";
      toggleBtn.addEventListener("click", async () => {
        const nextStatus = seat.status === "available" ? "occupied" : "available";
        await updateDoc(doc(db, "seats", seat.id), {
          status: nextStatus,
          reservedBy: ""
        });
      });
    }

    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = async () => {
      if(confirm("この席を完全に削除しますか？")) {
        await deleteDoc(doc(db, "seats", seat.id));
      }
    };

    li.appendChild(toggleBtn);
    li.appendChild(delBtn);
    seatList.appendChild(li);
  }); 
}

// ---------------- 新規席追加 ----------------
addSeatBtn.addEventListener("click", async () => {
  const name = seatNameInput.value.trim();
  if (!name) return alert("席名を入力してください");

  // 席名をIDにしてFirebaseに新規作成
  await setDoc(doc(db, "seats", name), {
    name: name,
    status: "available",
    reservedBy: "",
    timestamp: new Date()
  });
  
  seatNameInput.value = "";
});

// ---------------- リアルタイム監視 (Firebase) ----------------
const q = query(collection(db, "seats"), orderBy("timestamp", "asc"));

onSnapshot(q, (snapshot) => {
  const seatsData = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  render(seatsData); 
});
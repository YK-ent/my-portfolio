import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, query, orderBy, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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

    const btnContainer = document.createElement("div");

    if(seat.status === "reserved") {
      // 予約済みの時：解除ボタン＋入店ボタン
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "予約解除";
      cancelBtn.onclick = async () => {
        if(confirm("予約をキャンセルしますか？")) {
          // ★修正：reservedByを空にする
          await updateDoc(doc(db, "seats", seat.id), { status: "available", reservedBy: "" });
        }
      };
      btnContainer.appendChild(cancelBtn);

      // ★修正：bottumではなくbutton
      const startBtn = document.createElement("button");
      startBtn.textContent = "入店（利用中へ）";
      startBtn.style.backgroundColor = "#ff4757"; 
      startBtn.style.color = "white";
      startBtn.onclick = async () => {
        await updateDoc(doc(db, "seats", seat.id), { status: "occupied", reservedBy: "" });
      };
      btnContainer.appendChild(startBtn);

    } else {
      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = seat.status === "available" ? "利用中にする" : "空席にする";

      toggleBtn.onclick = async () => {
        const actionText = seat.status === "available" ? "「利用中」に切り替えますか？" : "「空席」に戻しますか？";

        if(confirm(actionText)) {
          const nextStatus = seat.status === "available" ? "occupied" : "available";
          await updateDoc(doc(db, "seats", seat.id), { status: nextStatus, reservedBy: "" });
        }
      };
      btnContainer.appendChild(toggleBtn);
    }

    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = async () => {
      if(confirm("この席を完全に削除しますか？")) {
        await deleteDoc(doc(db, "seats", seat.id));
      }
    };

    li.appendChild(btnContainer);
    li.appendChild(delBtn);
    seatList.appendChild(li); // ★これも最後に必要！
  }); 
}

// ---------------- 新規席追加 ----------------
const addNewSeat = async () => {
  const name = seatNameInput.value.trim();
  if(!name) return alert("席名を入力してください");

  const seatRef = doc(db, "seats", name);
  const seatSnap = await getDoc(seatRef);

  if(seatSnap.exists()) {
    alert(`[${name}]はすでに登録されています。別の名前をつけてください。`);
    return;
  }

  await setDoc(doc(db, "seats", name), {
    name: name,
    status: "available",
    reservedBy: "",
    timestamp: new Date()
  });

  // ★修正：Inputのスペルミス修正
  seatNameInput.value = "";
};

addSeatBtn.addEventListener("click", addNewSeat);
seatNameInput.addEventListener("keydown", (e)=> {
  if(e.key === "Enter") {
    addNewSeat();
  }
});

// リアルタイム監視
const q = query(collection(db, "seats"), orderBy("timestamp", "asc"));
onSnapshot(q, (snapshot) => {
  const seatsData = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  render(seatsData); 
});
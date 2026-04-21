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
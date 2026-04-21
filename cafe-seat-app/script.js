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
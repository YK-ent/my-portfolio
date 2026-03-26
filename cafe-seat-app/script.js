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
    li.textContent = seat.name;
    li.className = seat.available ? "available" : "occupied";

    // 利用中/空席切替ボタン
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = seat.available ? "利用中にする" : "空席にする";
    toggleBtn.addEventListener("click", () => {
      seat.available = !seat.available;
      saveSeats();
      render(filterAvailable);
    });

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

// ---------------- 検索 ----------------
searchInput.addEventListener("input", () => render());

// ---------------- フィルタ ----------------
showAllBtn.addEventListener("click", () => render(false));
showAvailableBtn.addEventListener("click", () => render(true));

// ---------------- 初期表示 ----------------
loadSeats();
render();
console.log("JS読み込まれました");

const input = document.getElementById("name");
const button = document.getElementById("addBtn");
const list = document.getElementById("list");
const searchInput = document.getElementById("search");

let employees = [];

function render() {
  list.innerHTML = "";

  const keyword = searchInput.value;

  const filtered = employees.filter(emp =>
    emp.includes(keyword)
  );

  filtered.forEach(emp => {
    const li = document.createElement("li");
    li.textContent = emp;

    //削除ボタンを作成
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.style.marginLeft = "10px";

     // 削除ボタンにクリックイベント
    deleteBtn.addEventListener("click", () => {
      employees = employees.filter(e => e !== emp); // 配列から削除
      render(); // 画面更新
    });

    li.appendChild(deleteBtn)
    list.appendChild(li);
  });
}

button.addEventListener("click", () => {
    const name = input.value.trim();
    if(!name) return;

  employees.push(name);
  render();
  input.value = ""; // 入力欄を空にする
});

searchInput.addEventListener("input", () => {
   render();
});


console.log("JS読み込まれました");

const input = document.getElementById("name");
const button = document.getElementById("addBtn");
const list = document.getElementById("list");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let employees = [];
let nextId = 1;

//描画処理
function render() {
  list.innerHTML = "";

  const keyword = searchInput.value;

  let filtered = employees.filter(emp =>
    emp.name.includes(keyword)
  );

  //SORT
  const sortValue = sortSelect.value;
  filtered.sort((a, b) => {
    if(sortValue === "name") {
      return a.name.localeCompare(b.name);
    }
    return a.id - b.id;
  });

  filtered.forEach(emp => {
    const li = document.createElement("li");
    li.textContent = `${emp.id}: ${emp.name}`;

    //削除ボタンを作成
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.style.marginLeft = "10px";
    

     // 削除ボタンにクリックイベント
    deleteBtn.addEventListener("click", () => {
      if(confirm("本当に削除しますか？")) {
        deleteEmployee(emp.id);
        render();
      }
    });

    li.appendChild(deleteBtn)
    list.appendChild(li);
  });
}


//データ操作
function addEmployee(name) {
  employees.push({
    id: nextId++,
    name: name
  });
}

function deleteEmployee(id) {
  employees = employees.filter(e => e.id !== id);
}

//追加ボタン
button.addEventListener("click", () => {
  const name = input.value.trim();
  if(!name) return;

  addEmployee(name);
  render();
  input.value = "";
})

//検索
searchInput.addEventListener("input", render);

//Enterキー
input.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    button.click();
  }
});

//ソート変更
sortSelect.addEventListener("change", render);

//初期表示
render();


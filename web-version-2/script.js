console.log("JS読み込まれました");

const input = document.getElementById("name");
const button = document.getElementById("addBtn");
const list = document.getElementById("list");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let employees = [];
let nextId = 1;

//保存
function saveEmployees() {
  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.setItem("nextId", nextId);
}

//読み込み
function loadEmployees() {
  const data = localStorage.getItem("employees");
  const savedId = localStorage.getItem("nextId");

  if (data) {
    employees = JSON.parse(data);
  }

  if (savedId) {
    nextId = Number(savedId);
  }
}

//データ操作
function addEmployee(name) {
  employees.push({
    id: nextId++,
    name: name
  });

  saveEmployees();
}

function deleteEmployee(id) {
  employees = employees.filter(e => e.id !== id);
  saveEmployees();
}

//ボタン作成共通関数
function createButton(label, onClick, style = "") {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.style = style;
  btn.addEventListener("click", onClick);
  return btn;
}

//1社員カード描画（render内で使用)
function renderEmployeeCard(emp) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = `${emp.id}: ${emp.name}`;
  li.appendChild(span);

  //編集ボタン
  const editBtn = createButton("編集", () => startEdit(emp, span, li), "margin-left:5px;");
  li.appendChild(editBtn);

  //削除ボタン
  const deleteBtn = createButton("削除", () => {
    if(confirm("本当に削除しますか？")) {
      deleteEmployee(emp.id);
      render();
    }
  }, "margin-left:5px;background-color:#ff6b6b;");
  li.appendChild(deleteBtn);

  return li;
}

//編集開始
function startEdit(emp, span, li) {
  const inputEdit = document.createElement("input");
  inputEdit.type = "text";
  inputEdit.value = emp.name;
  li.insertBefore(inputEdit, span);
  li.removeChild(span);


  // --- 編集中UI変更 ---
  li.classList.add('editing');
  const deleteBtn = li.querySelector('button:last-child'); // 削除ボタン
  deleteBtn.disabled = true;
  deleteBtn.style.opacity = 0.5;

  inputEdit.focus();

  inputEdit.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveEdit(emp, inputEdit, li);
  });

  inputEdit.addEventListener("blur", () => saveEdit(emp, inputEdit, li));
}

// 編集保存
function saveEdit(emp, inputEdit, li) {
  const newName = inputEdit.value.trim();

  if (!newName) {
    errorMessage.textContent = "名前を入力してください";
    inputEdit.focus();
    return;
  }

  if (employees.some(e => e.id !== emp.id && e.name === newName)) {
    errorMessage.textContent ="同じ名前の社員が既に存在します";
    inputEdit.focus();
    return;
  }

  emp.name = newName;
  saveEmployees();

   // --- 編集後UIリセット ---
  li.classList.remove('editing');
  const deleteBtn = li.querySelector('button:last-child');
  deleteBtn.disabled = false;
  deleteBtn.style.opacity = 1;

  errorMassage.textContent = "";
  render();
}

// ---------------- 描画処理（既存renderを置き換え） ----------------
function render() {
  list.innerHTML = "";

  const keyword = searchInput.value.trim();

  let filtered = employees.filter(emp => emp.name.includes(keyword));

  const sortValue = sortSelect.value;
  filtered.sort((a, b) => {
    if (sortValue === "name") return a.name.localeCompare(b.name);
    return a.id - b.id;
  });

  filtered.forEach(emp => {
    const li = renderEmployeeCard(emp);
    list.appendChild(li);
  });
}

const errorMessage = document.getElementById("error-message");

//追加ボタン(空欄・重複チェック追加)
button.addEventListener("click", () => {
  const name = input.value.trim();

  if(!name) {
    alert("名前を入力してください");
    return;
  }

  if (employees.some(e => e.name === name)) {
    alert("同じ名前の社員がすでに存在します");
    return;
  }

  addEmployee(name);
  input.value = "";
  errorMessage.textContent = "";
  render();
});

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
loadEmployees();
render();


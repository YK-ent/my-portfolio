// 社員データ（最初はサンプル）
let employees = [
    { name: "田中", score: 85, attendance: 95 },
    { name: "佐藤", score: 60, attendance: 80 },
    { name: "鈴木", score: 72, attendance: 65 },
    { name: "山本", score: 48, attendance: 50 }
];

// 評価関数
function evaluate(emp) {
    if (emp.score >= 80 && emp.attendance >= 90) return "優秀";
    if (emp.score >= 60) return "普通";
    return "要改善";
}

// 評価に応じたCSSクラス取得
function getEvaluationClass(emp) {
    const evalText = evaluate(emp);
    if (evalText === "優秀") return "excellent";
    if (evalText === "普通") return "average";
    return "needs-improvement";
}

// テーブル描画
function renderTable() {
    const tbody = document.querySelector("#employee-table tbody");
    tbody.innerHTML = "";
    employees.forEach((emp, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.score}</td>
            <td>${emp.attendance}</td>
            <td class="${getEvaluationClass(emp)}">${evaluate(emp)}</td> <!-- 追加: 評価色 -->
            <td><button class="delete-btn" data-index="${index}">削除</button></td> <!-- 追加: 削除ボタン -->
        `;
        tbody.appendChild(tr);
    });


// 削除ボタンのクリックイベント
document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = btn.getAttribute("data-index");
            employees.splice(idx, 1); // 配列から削除
            renderTable(); // 再描画
        });
    });
}

// 社員追加フォーム処理
document.getElementById("add-employee-form").addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("name").value;
    const score = Number(document.getElementById("score").value);
    const attendance = Number(document.getElementById("attendance").value);

    employees.push({ name, score, attendance });
    renderTable();

    this.reset(); // 入力欄リセット
});

// 点数順ソートボタン
document.getElementById("sort-score").addEventListener("click", () => {
    employees.sort((a, b) => b.score - a.score); // 高い順
    renderTable();
});


// 初期表示
renderTable();
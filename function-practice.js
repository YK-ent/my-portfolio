let employees = [
    { name: "田中", score: 85, attendance: 95},
    { name: "佐藤", score: 60, attendance: 80},
    { name: "鈴木", score: 72, attendance: 65},
    { name: "山本", score: 48, attendance: 50},
];

function evaluate(emp) {
    if(emp.score >= 80 && emp.attendance >= 90) {
        return "優秀";
    } else if (emp.score >= 60 ) {
        return "普通";  
    }　else {
        return "要改善";
    }
}

employees.forEach(emp => {
    console.log(emp.name + " : " + evaluate(emp));
});

//タイトル表示
function showEmployees() {
    console.log("社員評価一覧");
    console.log("------------------");
    employees.forEach(emp => {
        console.log(emp.name + " : " + evaluate(emp));
    });
}

showEmployees();

//優秀な社員だけ表示
function showTopEmployees() {
    console.log("優秀社員");
    console.log("------------------");
    employees.forEach(emp => {
if(evaluate(emp) === "優秀") {
    console.log(emp.name);
}
    })
}

showTopEmployees();
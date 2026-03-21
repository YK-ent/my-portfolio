let employees = [
    { name: "田中", score: 85, attendance: 95},
    { name: "佐藤", score: 60, attendance: 80},
    { name: "鈴木", score: 72, attendance: 65},
    { name: "山本", score: 48, attendance: 50},
];

function evaluate(emp) {
    if (emp.score >= 80 && emp.attendance >= 90) {
        return "優秀";
    } else if (emp.score >= 60) {
        return "普通";
    } else {
        return "要改善"
    }
}

//社員一覧表示
function showEmployees() {
    employees.forEach(emp => {
        console.log(emp.name + " : " + evaluate(emp));
    });
}

//優秀社員だけ表示
function showTopEmployees() {
    console.log("優秀社員");
    console.log("--------------");

    let topEmployees = employees.filter(emp => evaluate(emp) === "優秀");

    topEmployees.forEach(emp => {
        console.log(emp.name);
    });
}

//点数ランキング
function showScoreRanking() {
    console.log("点数ランキング");
    console.log("---------------");

    employees.sort((a, b) => b.score - a.score);

    employees.forEach(emp => {
        console.log(emp.name + " " + emp.score);
    });
}

//出勤率ランキング
function showAttendanceRanking() {
    console.log("出勤率ランキング");
    console.log("------------------");

    employees.sort((a, b) => b.attendance - a.attendance);

    employees.forEach(emp => {
        console.log(emp.name + " " + emp.attendance);
    });
}

//showEmployees();

//showTopEmployees();

//showScoreRanking();

//showAttendanceRanking();

function showMenu() {
    console.log("社員管理アプリ");
    console.log("--------------");
    console.log("1. 社員一覧");
    console.log("2. 優秀社員");
    console.log("3. 点数ランキング");
    console.log("4. 出勤率ランキング");
}

let menuNumber = 1;

showMenu();
console.log("");

if (menuNumber === 1) {
    showEmployees();
}

if (menuNumber === 2) {
    showTopEmployees();
}

if (menuNumber === 3) {
    showScoreRanking();
}

if (menuNumber === 4) {
    showAttendanceRanking();
}

//社員追加
function addEmployees(name, score, attendance) {
    employees.push({
        name: name,
        score: score,
        attendance: attendance
    });

    console.log("社員を追加しました");
}

addEmployees("高橋", 90, 98);
showEmployees();

//社員検索
function findEmployee(name) {
    let emp = employees.find(e => e.name === name);

    if(emp) {
      console.log(emp.name + " が見つかりました");
      console.log("score: " + emp.score);
      console.log("attendance: " + emp.attendance);  
    } else {
        console.log("社員が見つかりません");
    }
}

findEmployee("田中");

//社員削除
function removeEmployee(name) {
    let index = employees.findIndex(emp => emp.name === name);

    if(index !== -1) {
        employees.splice(index, 1);
        console.log(name + " を削除しました");
    } else {
        console.log("社員が見つかりません");
    }
}

removeEmployee("山本");
showEmployees();
const prompt = require("prompt-sync")();

let employees = [
    { name: "田中", score: 85, attendance: 95},
    { name: "佐藤", score: 60, attendance: 80},
    { name: "鈴木", score: 72, attendance: 65},
    { name: "山本", score: 48, attendance: 50}
];

function evaluate(emp) {
    if (emp.score >= 80 && emp.attendance >= 90) {
        return "優秀";
    } else if (emp.score >= 60) {
        return "普通";
    } else {
        return "要改善";
    }
}

function showEmployees() {
    console.log("社員一覧");
    console.log("--------------");

    employees.forEach(emp => {
        console.log(emp.name + " : " + evaluate(emp));
    });
}

function showTopEmployees() {
    console.log("優秀社員");
    console.log("--------------");

    let topEmployees = employees.filter(emp => evaluate(emp) === "優秀");

    topEmployees.forEach(emp => {
        console.log(emp.name);
    });
}

function showScoreRanking() {
    console.log("点数ランキング");
    console.log("--------------");

    let sorted = [...employees].sort((a, b) => b.score - a.score);

    sorted.forEach(emp => {
        console.log(emp.name + " :" + emp.score);
    });
}

function showAttendanceRanking() {
    console.log("出勤率ランキング");
    console.log("--------------");

    let sorted = [...employees].sort((a, b) => b.attendance - a.attendance);

    sorted.forEach(emp => {
        console.log(emp.name + " :" + emp.attendance);
    });
}

function addEmployee() {

    let name = prompt("名前を入力: ");
    let score = Number(prompt("点数を入力: "));
    let attendance = Number(prompt("出勤率を入力: "));

    employees.push({
        name: name,
        score: score,
        attendance: attendance
    });

    console.log("社員を追加しました。");
}

function findEmployee() {
    let name = prompt("検索する社員名: ");

    let emp = employees.find(e => e.name === name);
    
    if(emp){
        console.log(emp.name + " が見つかりました");
        console.log("score: " + emp.score);
        console.log("attendance: " + emp.attendance);
    } else {
        console.log("社員が見つかりませんでした。");
    }
}

function removeEmployees(){

    let name = prompt("削除する社員名: ");

    let index = employees.findIndex(emp => emp.name === name);

    if(index !== -1){
        employees.splice(index, 1);
        console.log(name + " を削除しました。");
    } else {
        console.log("社員が見つかりませんでした。");
    }
}

function showMenu(){

    console.log("");
    console.log("社員管理アプリ");
    console.log("--------------");
    console.log("1. 社員一覧");
    console.log("2. 優秀社員");
    console.log("3. 点数ランキング");
    console.log("4. 出勤率ランキング");
    console.log("5. 社員追加");
    console.log("6. 社員検索");
    console.log("7. 社員削除");
}

showMenu();

let menuNumber = Number(prompt("番号を入力してください"));

if(menuNumber ==1){
    showEmployees();
}

if(menuNumber ==2){
    showTopEmployees();
}

if(menuNumber ==3){
    showScoreRanking();
}

if(menuNumber ==4){
    showAttendanceRanking();
}

if(menuNumber ==5){
    addEmployee();
}

if(menuNumber ==6){
    findEmployee();
}

if(menuNumber ==7){
    removeEmployees();
}
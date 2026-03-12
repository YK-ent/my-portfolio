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

function showEmployees() {
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
    console.log("---------------");

    employees.sort((a, b) => b.score - a.score);

    employees.forEach(emp => {
        console.log(emp.name + " " + emp.score);
    });
}

function showAttendanceRanking() {
    console.log("出勤率ランキング");
    console.log("------------------");

    employees.sort((a, b) => b.attendance - a.attendance);

    employees.forEach(emp => {
        console.log(emp.name + " " + emp.attendance);
    });
}

showEmployees();
console.log("");

showTopEmployees();
console.log("");

showScoreRanking();
console.log("");

showAttendanceRanking();
console.log("");

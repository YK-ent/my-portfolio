let employees = [
    {name: "田中", score: 85, attendance: 95},
    {name: "佐藤", score: 60, attendance: 80},  
    {name: "鈴木", score: 72, attendance: 65},
    {name: "山本", score: 48, attendance: 50},
];

employees.sort((a, b) => b.score - a.score);

console.log("点数順(高い順)");
employees.forEach(emp => console.log(emp.name, emp.score));

employees.sort((a, b) => b.attendance - a.attendance);

console.log("出勤率(高い順)");
employees.forEach(emp => console.log(emp.name, emp.attendance));
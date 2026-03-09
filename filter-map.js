let employees = [
    { name: "田中", score: 85, attendance: 95 },
    { name: "佐藤", score: 60, attendance: 80 },
    { name: "鈴木", score: 72, attendance: 65 },
    { name: "山本", score: 48, attendance: 50 },
];

let names = employees.map(emp => emp.name);

console.log(names);

let topEmployees = employees.filter(emp => emp.score >= 80);
console.log(topEmployees);

let topNames = employees
.filter(emp => emp.score >= 80)
.map(emp => emp.name);

console.log(topNames);

let topNames2 = employees
.filter(emp => emp.attendance >= 90)
.map(emp => emp.name);

console.log(topNames2);
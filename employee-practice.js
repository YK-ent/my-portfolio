let employee= [
    {name: "田中", score: 85, attendance: 95},
    {name: "佐藤", score: 60, attendance: 80},
    {name: "鈴木", score: 72, attendance: 65},
    {name: "山本", score: 48, attendance: 50},
];

for(let i = 0; i < employee.length; i++) {
    let emp = employee[i];
    if(emp.score >= 80 && emp.attendance >= 80) {
        console.log(`${emp.name} : 優秀`);
    } else if(emp.score >= 60) {
        console.log(`${emp.name} : 普通`);
    } else {
        console.log(`${emp.name} : 要改善`);
    }
}
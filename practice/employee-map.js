let employees = [
  {name: "田中", score: 85, attendance: 95},
  {name: "佐藤", score: 60, attendance: 80},
  {name: "鈴木", score: 72, attendance: 65},
  {name: "山本", score: 48, attendance: 50},
];

let employeeNames = employees.map(emp => emp.name);

console.log("社員名リスト:");
console.log(employeeNames);

let updatedScores = employees.map(emp => ({...emp, score: emp.score + 10}));

console.log("点数を10点加算した新しい社員情報:");
console.log(updatedScores);
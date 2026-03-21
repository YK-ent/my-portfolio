let employees = [
    {name: "田中", score: 85, attendance: 95},
    {name: "佐藤", score: 60, attendance: 80},
    {name: "鈴木", score: 72, attendance: 65},
    {name: "山本", score: 48, attendance: 50},
];

// 名前が「山本」の社員を探す
let yamamoto = employees.find(emp => emp.name === "山本");

console.log(yamamoto);

// 点数が60点未満の社員を探す
let lowScore = employees.find(emp => emp.score < 60);

if (lowScore) {
    console.log("見つかりました", lowScore.name);
} else {
    console.log("該当なし");
}
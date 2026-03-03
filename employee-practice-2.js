let employee = [
    {name: "田中", score: 85, attendance: 95},
    {name: "佐藤", score: 60, attendance: 80},
    {name: "鈴木", score: 72, attendance: 65},
    {name: "山本", score: 48, attendance: 50},
];

function evaluate(emp) {
    if(emp.score >= 80 && emp.attendance >= 80) return "優秀";
    else if (emp.score >= 60) return "普通";
    else return "要改善";
}

//追加用関数
function addemployee(name, score, attendance) {
    employee.push({name, score, attendance});
}

//確認
addemployee("高橋", 78, 88);//新しい社員追加

//全社員の評価を表示
for(let i = 0; i < employee.length; i++) {
    let emp = employee[i];
    console.log(`${emp.name} : ${evaluate(emp)}`);
}

//削除用関数
function removeemployee(name) {
    employee = employee.filter(emp => emp.name !== name);
}

//例：山本を削除
removeemployee("山本");

//確認
for( let i = 0; i < employee.length; i++) {
    let emp = employee[i];
    console.log(`${emp.name} : ${evaluate(emp)}`);
}

//優秀だけ表示
let topemployee = employee.filter(emp => evaluate(emp) === "優秀");
console.log("優秀な社員");
topemployee.forEach(emp => console.log(emp.name));

//普通だけ表示
let normalemployee = employee.filter(emp => evaluate(emp) === "普通");
console.log("普通の社員:");
normalemployee.forEach(emp => console.log(emp.name));
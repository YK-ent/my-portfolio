let name = "Ken";
let age =26;

console.log(name);
console.log(age);
age = 26;
console.log("2026年の年齢:", age)
age = 27;
console.log("2027年の年齢:", age);
console.log("名前:", name);
const country = "Japan";
console.log("国:", country);

let isStudent = true;
console.log("学生か？:", isStudent);

isStudent = false;
console.log("学生か？:", isStudent);

{
    let name = "yamada";
    const country = "USA";
    console.log("ブロック内　名前:", name);
    console.log("ブロック外　国:", country);
}
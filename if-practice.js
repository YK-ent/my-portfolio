let age = 15

if(age >= 18){
    console.log("成人です");
} else{
    console.log("未成年です");
}

let score = 86;
let attendance = 60;

if(attendance < 70) {
    console.log("不可");
} else if(score >= 80) {
    console.log("優");
} else if(score >= 70) {
    console.log("良");
} else if(score >= 60) {
    console.log("可");
}　else {
    console.log("不可");
}

let a = 10;
let b = "10";

console.log(a == b);
console.log(a === b);
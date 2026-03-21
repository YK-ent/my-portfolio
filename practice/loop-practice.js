for (let i = 0; i < 5; i++) {
    console.log(i);
}

let i =0;
while(i<5) {
    console.log(i);
    i++;
}

let fruits = ["りんご", "みかん", "バナナ"];

for(let i = 0; i < fruits.length; i++) {
    console.log("for文:", fruits[i]);
}

let j = 0;
while (j < fruits.length) {
    console.log("while文:", fruits[j]);
    j++;
}

//実務風練習問題
let scores =[85, 60, 72, 48, 90];

for(let i = 0; i <scores.length; i++) {
    let employeeNumber = i + 1; //社員番号は１からスタート

    if(scores[i] >= 80) {
        console.log(`社員${employeeNumber};優秀`);
    }
    else if(scores[i] >= 60) {
        console.log(`社員${employeeNumber};普通`);
    } else {
        console.log(`社員${employeeNumber};要改善`);
    }
}

//while文を使う練習問題
let userInput = "";

while(userInput !== "yes" && userInput !== "no") {
    // 実際の業務ではここでユーザー入力を取得
    // 例: userInput = prompt("yes か no を入力してください");

    // 今回は練習なので仮に手動で値を代入してテスト
    userInput = "no"; // ここを "no" に変えてtest

    if(userInput !== "yes" && userInput !== "no") {
        console.log("入力が間違っています。もう一度入力してください");

    }
}

console.log("正しい入力:", userInput);

let orderInput = ["abc", "123", "確認する"]; 
let index = 0;
let userorder = "";

while (userorder !== "確認する" && userorder !== "キャンセル") {
    userorder = orderInput[index];
    index++;

    if(userorder !== "確認する" && userorder !== "キャンセル") {
        console.log("入力が間違っています。もう一度入力してください", userorder);
    }
}   

console.log("ユーザーが選んだ操作;", userorder);


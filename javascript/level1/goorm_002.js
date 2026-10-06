/**
 * [level1] 인공지능 청소기
 */

// Run by Node.js

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let totalCases = -1;
let inputs = [];

rl.on("line", function (line) {
  if (totalCases < 0) {
    totalCases = Number(line);
  } else {
    inputs.push(line);
  }
  if (inputs.length >= totalCases) {
    rl.close();
  }
}).on("close", function () {
  for (let input of inputs) {
    const [x, y, sec] = input.split(" ").map((t) => Number(t));
    const minMoves = Math.abs(x) + Math.abs(y);
    // 이동 시간과 최소 이동 시간의 차이가 0 이상 짝수이면 가능, 그렇지 않으면 불가능
    console.log(minMoves <= sec && (sec - minMoves) % 2 === 0 ? "YES" : "NO");
  }

  process.exit();
});

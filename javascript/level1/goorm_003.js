/**
 * [level1] 소금물의 농도 구하기
 */

// Run by Node.js
const readline = require("readline");

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  for await (const line of rl) {
    let [n, m] = line.split(" ").map((t) => Number(t));
    // 기존 0.07N / N 소금물에서 0.07N / (N + M) 으로 변경됨
    const result = ((0.07 * n) / (n + m)) * 100;
    const answer = (Math.floor(result * 100) / 100).toFixed(2); // 소수 2번째 자리까지 표현하기 위함
    console.log(answer);
    rl.close();
  }

  process.exit();
})();

/**
 * [level2] 장마
 */

// Run by Node.js
const readline = require("readline");

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  const inputs = [];

  for await (const line of rl) {
    inputs.push(line);
  }

  const [n, m] = inputs[0].split(" ").map((t) => Number(t));
  let heights = inputs[1].split(" ").map((t) => Number(t));
  let rainedDays = Array.from({ length: n + 1 }, () => 0); // 구간합 구현을 위한 배열

  for (let day = 1; day <= m; day++) {
    const [start, end] = inputs[day + 1].split(" ").map((t) => Number(t));
    rainedDays[start - 1]++;
    rainedDays[end]--;

    // 3의 배수마다 배수 시스템을 작동시키며, 구간합을 heights에 적용시킨다
    if (day % 3 === 0) {
      for (let index = 1; index < n; index++) {
        rainedDays[index] += rainedDays[index - 1];
      }

      for (let index = 0; index < n; index++) {
        if (rainedDays[index] > 0) {
          heights[index] += rainedDays[index] - 1; // -1은 배수 시스템의 작동을 의미함
        }
        rainedDays[index] = 0; // 초기화
      }
    }
  }

  // 남은 비에 대해 모두 적용
  for (let index = 1; index < n; index++) {
    rainedDays[index] += rainedDays[index - 1];
  }

  for (let index = 0; index < n; index++) {
    heights[index] += rainedDays[index];
  }

  console.log(heights.join(" "));

  process.exit();
})();

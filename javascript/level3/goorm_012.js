/**
 * [level3] 거리두기
 */

// Run by Node.js
const readline = require("readline");

const MODULO = 100000007;

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let input = "";
  for await (const line of rl) {
    input = line;
  }

  const N = Number(input);
  // 한 줄에 나오는 5가지 경우에 대해 모두 dp 형태로 유지한다
  let dpNone = [0, 1],
    dpLeft = [0, 1],
    dpCenter = [0, 1],
    dpRight = [0, 1],
    dpTwin = [0, 1];

  for (let i = 2; i <= N; i++) {
    dpNone[i] =
      (dpNone[i - 1] +
        dpLeft[i - 1] +
        dpCenter[i - 1] +
        dpRight[i - 1] +
        dpTwin[i - 1]) %
      MODULO;
    dpLeft[i] = (dpNone[i - 1] + dpCenter[i - 1] + dpRight[i - 1]) % MODULO;
    dpCenter[i] =
      (dpNone[i - 1] + dpLeft[i - 1] + dpRight[i - 1] + dpTwin[i - 1]) % MODULO;
    dpRight[i] = (dpNone[i - 1] + dpLeft[i - 1] + dpCenter[i - 1]) % MODULO;
    dpTwin[i] = (dpNone[i - 1] + dpCenter[i - 1]) % MODULO;
  }

  const result =
    (dpNone[N] + dpLeft[N] + dpCenter[N] + dpRight[N] + dpTwin[N]) % MODULO;
  console.log(result);

  process.exit();
})();

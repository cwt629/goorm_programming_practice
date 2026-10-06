/**
 * [level1] 딱지놀이
 */

// Run by Node.js
const readline = require("readline");

const SHAPE_STAR = 3,
  SHAPE_CIRCLE = 2,
  SHAPE_SQUARE = 1,
  SHAPE_TRIANGLE = 0; // 인덱스 기준

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  const lines = [];

  for await (const line of rl) {
    lines.push(line);
  }

  let { a, b, totalRounds } = extractInputData(lines);

  for (let round = 0; round < totalRounds; round++) {
    // 매 라운드마다 개수 비교
    if (a[round][SHAPE_STAR] !== b[round][SHAPE_STAR]) {
      console.log(a[round][SHAPE_STAR] < b[round][SHAPE_STAR] ? "B" : "A");
      continue;
    }
    if (a[round][SHAPE_CIRCLE] !== b[round][SHAPE_CIRCLE]) {
      console.log(a[round][SHAPE_CIRCLE] < b[round][SHAPE_CIRCLE] ? "B" : "A");
      continue;
    }
    if (a[round][SHAPE_SQUARE] !== b[round][SHAPE_SQUARE]) {
      console.log(a[round][SHAPE_SQUARE] < b[round][SHAPE_SQUARE] ? "B" : "A");
      continue;
    }
    if (a[round][SHAPE_TRIANGLE] !== b[round][SHAPE_TRIANGLE]) {
      console.log(
        a[round][SHAPE_TRIANGLE] < b[round][SHAPE_TRIANGLE] ? "B" : "A",
      );
      continue;
    }
    console.log("D"); // 모두 비김
  }

  process.exit();
})();

function extractInputData(lines) {
  let totalRounds = Number(lines[0]);
  let childA = [],
    childB = [];

  for (let round = 0; round < totalRounds; round++) {
    let inputA = lines[round * 2 + 1],
      inputB = lines[round * 2 + 2];

    // A 입력 분석하기
    let shapesA = [0, 0, 0, 0];
    let tokensA = inputA.split(" ").map((t) => Number(t));
    let totalA = tokensA[0];
    for (let i = 1; i <= totalA; i++) {
      shapesA[tokensA[i] - 1]++;
    }

    let shapesB = [0, 0, 0, 0];
    let tokensB = inputB.split(" ").map((t) => Number(t));
    let totalB = tokensB[0];
    for (let i = 1; i <= totalB; i++) {
      shapesB[tokensB[i] - 1]++;
    }

    // 결과 넣어주기
    childA.push(shapesA);
    childB.push(shapesB);
  }

  return { a: childA, b: childB, totalRounds: totalRounds };
}

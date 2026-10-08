/**
 * [level3] 경쟁 배타의 원리
 */

// Run by Node.js
const readline = require("readline");

const SQUARE_SIZE = 1000;

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let inputs = [];

  for await (const line of rl) {
    inputs.push(line);
  }

  const [totalSpecies, K] = inputs[0].split(" ").map((t) => Number(t));
  // 이차원 구간합 방식으로 표시한다
  let species = Array.from({ length: SQUARE_SIZE + 1 }, () =>
    Array.from({ length: SQUARE_SIZE + 1 }, () => 0),
  );

  for (let i = 1; i <= totalSpecies; i++) {
    const [startRow, startCol, endRow, endCol] = inputs[i]
      .split(" ")
      .map((t) => Number(t));
    // endRow와 endCol을 포함하지 않는 영역임
    species[startRow][startCol]++;
    species[startRow][endCol]--;
    species[endRow][startCol]--;
    species[endRow][endCol]++;
  }

  // 구간합 로직
  for (let row = 0; row <= SQUARE_SIZE; row++) {
    for (let col = 1; col <= SQUARE_SIZE; col++) {
      species[row][col] += species[row][col - 1];
    }
  }
  for (let col = 0; col <= SQUARE_SIZE; col++) {
    for (let row = 1; row <= SQUARE_SIZE; row++) {
      species[row][col] += species[row - 1][col];
    }
  }

  // 전체 영역을 탐색하면서, 정확히 K마리가 위치하는 영역의 개수를 구한다
  let answer = 0;
  for (let row = 0; row < SQUARE_SIZE; row++) {
    for (let col = 0; col < SQUARE_SIZE; col++) {
      if (species[row][col] === K) answer++;
    }
  }

  console.log(answer);

  process.exit();
})();

/**
 * [level3] [현대모비스][예선] ADAS 시스템
 */

/*
문제가 해결되지 않음!

예시 2의 경우 우선순위 설명대로 움직이면,
E에 도달하지 못한 채 막다른 길에 다다르게 된다.
근데 막다른 길에 다다랐을 때 끝낸다고 가정하면
정답이 나오지 않는다.

문제에 무언가 사양이 부족해보인다.
막다른 길에 도달했을 때 어떻게 해야 하는지...
아니면 다음 블록으로 이동했을 때에도, 이전 블록에서 넣은 이동 후보가 유지되는 형태일까?
좀 이상해보임... 그래도 일단은 내 코드를 저장해놓자.
*/

// Run by Node.js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let inputs = [];
	
	for await (const line of rl) {
		inputs.push(line);
	}

	const [totalRow, totalCol] = inputs[0].split(" ").map((t) => Number(t));
	let road = [];
	for (let row = 0; row < totalRow; row++){
		road[row] = inputs[row + 1].split("").map((roadType, col) => ({
			row: row,
			col: col,
			type: roadType,
			risk: 0,
			visited: false
		}));
	}

	// 주변 8지점을 체크하며, 각 지점의 위험 점수를 계산한다
	for (let row = 0; row < totalRow; row++){
		for (let col = 0; col < totalCol; col++){
			// S나 E점인 경우, 그대로 0점이다
			if (road[row][col].type === "S" || road[row][col].type === "E") continue;
			
			if (row > 0 && col > 0 && road[row - 1][col - 1].type === "P") road[row][col].risk++;
			if (row > 0 && road[row - 1][col].type === "P") road[row][col].risk++;
			if (row > 0 && col < totalCol - 1 && road[row - 1][col + 1].type === "P") road[row][col].risk++;
			if (col > 0 && road[row][col - 1].type === "P") road[row][col].risk++;
			if (col < totalCol - 1 && road[row][col + 1].type === "P") road[row][col].risk++;
			if (row < totalRow - 1 && col > 0 && road[row + 1][col - 1].type === "P") road[row][col].risk++;
			if (row < totalRow - 1 && road[row + 1][col].type === "P") road[row][col].risk++;
			if (row < totalRow - 1 && col < totalCol - 1 && road[row + 1][col + 1].type === "P") road[row][col].risk++;

			// 현재 지점이 P-점인 경우, 점수가 3점 감점된다
			if (road[row][col].type === "P") road[row][col].risk -= 3;
		}
	}

	// 시작 지점을 반환하는 함수
	const getStart = () => {
		for (let row = 0; row < totalRow; row++){
			for (let col = 0; col < totalCol; col++){
				if (road[row][col].type === "S")
					return {row, col};
			}
		}
		return null;
	}
	
	// 다음 지점을 우선순위에 따라 결정하는 함수
	const getNextPoint = (currentRow, currentCol) => {
		let point = null;
		let candidates = [{row: currentRow - 1, col: currentCol}, {row: currentRow, col: currentCol - 1}, {row: currentRow, col: currentCol + 1}, {row: currentRow + 1, col: currentCol}];

		for (let {row, col} of candidates){
			if (row < 0 || col < 0 || row >= totalRow || col >= totalCol) continue;
			if (road[row][col].visited) continue;
			if (!point) {
				point = {row, col};
				continue;
			}

			// 우선순위를 따진다
			// 1. 둘 중 E점인 것이 있다면, 그 점으로 설정
			if (road[point.row][point.col].type === "E") break;
			if (road[row][col].type === "E"){
				point = {row, col};
				break;
			}

			// 2. 새로운 점이 P점이라면, 기존 점과 비교
			if (road[row][col].type === "P"){
				// 기존 점이 P점이 아니었다면, 이번 점으로 설정
				if (road[point.row][point.col].type !== "P"){
					point = {row, col};
					continue;
				}
				// 기존 점도 P점이었다면, 같은 경우에 대한 우선순위는 이미 candidates 순서로 설정해두었으므로 별도 비교 필요 없음
			}

			// 3. 새로운 점이 일반점인 경우 -> 이미 우선순위는 candidates 순서에 설정되었으므로 별도 작업 필요 없음
		}

		return point;
	}

	// S점에서부터 이동을 시작한다
	let current = getStart();
	road[current.row][current.col].visited = true;
	let totalRisk = 0;

	while (road[current.row][current.col].type !== "E"){
		const nextPoint = getNextPoint(current.row, current.col);
		if (!nextPoint) break;
		
		const {row: nextRow, col: nextCol} = nextPoint;

		totalRisk += road[nextRow][nextCol].risk;
		road[nextRow][nextCol].visited = true;
		current = {row: nextRow, col: nextCol};
	}

	if (totalRisk < 0) totalRisk = 0;

	console.log(totalRisk);
	
	process.exit();
})();

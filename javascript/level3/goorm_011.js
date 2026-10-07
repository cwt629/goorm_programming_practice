/**
 * [level3] 불이야!!
 */

// Run by Node.js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let inputs = [];
	
	for await (const line of rl) {
		inputs.push(line);
	}

	const [maxRow, maxCol] = inputs[0].split(" ").map((t) => Number(t));
	let room = [];
	let visited = [];
	let start;
	for (let row = 0; row < maxRow; row++){
		room[row] = inputs[row + 1].split("");
		visited[row] = Array.from({length: maxCol}, () => false);

		for (let col = 0; col < maxCol; col++){
			// 시작점 찾기
			if (room[row][col] === "&"){
				start = {row: row, col: col};
			}
			// #인 경우, visited = true로 취급하여 방문하지 못하도록 처리
			if (room[row][col] === "#"){
				visited[row][col] = true;
			}
		}
	}

	let bfsQueue = [{row: start.row, col: start.col, moves: 0}];
	let isDone = false;

	// BFS 방식으로, 구름이가 이동한다고 가정하고 불에 다다르는 최소 시간을 구한다
	while (bfsQueue.length > 0){
		const {row, col, moves} = bfsQueue.shift();

		// 오른쪽
		if (col < maxCol - 1 && !visited[row][col + 1]){
			if (room[row][col + 1] === "@"){
				console.log(moves);
				isDone = true;
				break;
			}
			bfsQueue.push({row: row, col: col + 1, moves: moves + 1});
			visited[row][col + 1] = true;
		}

		// 아래쪽
		if (row < maxRow - 1 && !visited[row + 1][col]){
			if (room[row + 1][col] === "@"){
				console.log(moves);
				isDone = true;
				break;
			}
			bfsQueue.push({row: row + 1, col: col, moves: moves + 1});
			visited[row + 1][col] = true;
		}
		
		// 왼쪽
		if (col > 0 && !visited[row][col - 1]){
			if (room[row][col - 1] === "@"){
				console.log(moves);
				isDone = true;
				break;
			}
			bfsQueue.push({row: row, col: col - 1, moves: moves + 1});
			visited[row][col - 1] = true;
		}

		// 위쪽
		if (row > 0 && !visited[row - 1][col]){
			if (room[row - 1][col] === "@"){
				console.log(moves);
				isDone = true;
				break;
			}
			bfsQueue.push({row: row - 1, col: col, moves: moves + 1});
			visited[row - 1][col] = true;
		}
	}

	// 여기까지도 @ 부분을 만나지 못했다면, -1 출력
	if (!isDone)
		console.log(-1);
	
	process.exit();
})();

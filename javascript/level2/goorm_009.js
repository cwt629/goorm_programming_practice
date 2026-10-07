/**
 * [level2] 블록 게임
 */

// Run by Node.js
const readline = require('readline');

const MAX_SIZE = 1000; // N <= 1000이므로, 블록의 행/열 인덱스는 +- 1000을 넘을 수 없음

class Block {
	constructor(row, col, score){
		this.row = row;
		this.col = col;
		this.score = score;
	}
}

class BlockMap {
	constructor(){
		this.occupied = Array.from({length: MAX_SIZE * 2 + 1}, () => (
			Array.from({length: MAX_SIZE * 2 + 1}, () => false)
		)); // 특정 위치가 이미 먹혀 있는지를 바로 알기 위해 이차원 배열 별도 구성
		this.blocks = []; // stack 형태로 블록들의 배치 순서 저장
	}

	getTopBlock(){
		if (this.blocks.length === 0) return null;
		return this.blocks[this.blocks.length - 1];
	}

	getAdjustedCoord(inputRow, inputCol){
		return {row: inputRow + MAX_SIZE, col: inputCol + MAX_SIZE};
	}

	addBlock(row, col, score){
		const block = new Block(row, col, score);
		this.blocks.push(block);
		const {row: adjustedRow, col: adjustedCol} = this.getAdjustedCoord(row, col);
		this.occupied[adjustedRow][adjustedCol] = true;
	}

	removeRecentBlock(){
		const currentBlock = this.blocks.pop();
		const {row: adjustedRow, col: adjustedCol} = this.getAdjustedCoord(currentBlock.row, currentBlock.col);
		this.occupied[adjustedRow][adjustedCol] = false;
	}

	placeBlock(row, col, score){
		const {row: adjustedRow, col: adjustedCol} = this.getAdjustedCoord(row, col);
		// 이미 occupy되어 있는 경우, 해당 블록까지 최근의 모든 블록을 제거한다
		while (this.occupied[adjustedRow][adjustedCol] && this.blocks.length > 0){
			this.removeRecentBlock();
		}

		// 해당 블록을 놓는다
		this.addBlock(row, col, score);
	}

	getTotalScore(){
		return this.blocks.reduce((acc, cur) => (acc + cur.score), 0);
	}
}

(async () => {
	let rl = readline.createInterface({ input: process.stdin });

	let inputs = [];
	
	for await (const line of rl) {
		inputs.push(line);
	}

	const totalActions = Number(inputs[0]);
	const commands = inputs[1].split("");
	const scores = inputs[2].split(" ").map((t) => Number(t));

	const blockMap = new BlockMap();
	blockMap.addBlock(0, 0, 1); // 초기에 0,0 지점에 1점짜리 블록 배치

	for (let i = 0; i < totalActions; i++){
		const command = commands[i];
		const recentBlock = blockMap.getTopBlock();
		let current = {row: recentBlock.row, col: recentBlock.col};

		// 다음 위치를 구한다
		switch(command){
			case "L":
				current.col--;
				break;

			case "R":
				current.col++;
				break;

			case "U":
				current.row--;
				break;

			case "D":
				current.row++;
				break;
		}

		blockMap.placeBlock(current.row, current.col, scores[i]);
	}

	console.log(blockMap.getTotalScore());
	
	process.exit();
})();

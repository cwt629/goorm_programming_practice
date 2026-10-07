/**
 * [level2] 0커플
 */

// Run by Node.js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let inputs = [];
	let result = 0;
	
	for await (const line of rl) {
		inputs.push(line);
	}

	const totalNumber = Number(inputs[0]);
	const scores = inputs[1].split(" ").map((t) => Number(t))

	const {max: maxScore, min: minScore} = getMaxAndMin(scores);
	// 가장 큰 숫자
	const maxAbs = Math.abs(maxScore), minAbs = Math.abs(minScore);
	let matches = Array.from({length: (maxAbs > minAbs)? maxAbs + 1 : minAbs + 1}, () => 0);

	// matches 배열에 각 숫자의 절대값을 인덱스로 하여 값을 더해준다
	for (let score of scores){
		const index = Math.abs(score);
		matches[index] += score;
	}

	// matches 중 0이 아닌 값들에 대해, 그 값들을 모두 더해준다
	for (let matchValue of matches){
		if (matchValue !== 0){
			result += matchValue;
		}
	}

	console.log(result);
	
	process.exit();
})();

function getMaxAndMin(arr){
	let max = arr[0], min = arr[0];
	for (let i = 1; i < arr.length; i++){
		if (arr[i] > max) max = arr[i];
		if (arr[i] < min) min = arr[i];
	}

	return {max, min};
}

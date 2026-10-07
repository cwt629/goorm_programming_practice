/**
 * [level2] 계수기 만들기
 */

// Run by Node.js

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let inputs = [];

const extractInputData = () => {
	if (inputs.length !== 4) return;

	const digit = Number(inputs[0]);
	const maxNums = inputs[1].split(" ").map((t) => Number(t));
	let current = inputs[2].split(" ").map((t) => Number(t));
	const addCount = Number(inputs[3]);

	return {digit, maxNums, current, addCount};
}

rl.on("line", function(line) {
	inputs.push(line);
	if (inputs.length >= 4){
		rl.close();
	}
}).on("close", function() {
	let {digit, maxNums, current, addCount} = extractInputData();
	
	for (let i = digit - 1; i >= 0; i--){
		// 현재 위치만 따졌을 때 몇번 누르는 것과 같은지 확인
		let currentCount = addCount % (maxNums[i] + 1);
		current[i] += currentCount;
		if (current[i] > maxNums[i]){
			if (i > 0) {
				current[i - 1] += Math.floor(current[i] / (maxNums[i] + 1));
			}
			current[i] %= (maxNums[i] + 1);
		}
		addCount = Math.floor((addCount - currentCount) / (maxNums[i] + 1));
	}

	console.log(current.slice(0, digit).join(""));
	
	process.exit();
});
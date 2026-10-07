/**
 * [level2] 어려운 문제
 */

// Run by Node.js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });

	let input;
	
	for await (const line of rl) {
		input = Number(line);
	}

	// 해당 input 전까지 한자리수 팩토리얼 값을 dp 형태로 저장
	let oneDigitFactorials = [1];
	for (let num = 1; num <= input; num++){
		let current = num * oneDigitFactorials[num - 1];
		while (current >= 10){
			current = addDigits(current);
		}

		oneDigitFactorials[num] = current;
	}

	console.log(oneDigitFactorials[input]);
	
	process.exit();
})();

function addDigits(number){
	let result = 0;
	while (number > 0){
		result += number % 10;
		number = Math.floor(number / 10);
	}

	return result;
}
/**
 * [level3] 단풍나무
 */

// Run by Node.js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let inputs = [];
	
	for await (const line of rl) {
		inputs.push(line);
	}

	const parkSize = Number(inputs[0]);
	let park = [];
	for (let i = 0; i < parkSize; i++){
		park[i] = inputs[i + 1].split(" ").map((t) => Number(t));
	}
	// 모든 단풍나무가 물들지 않은 공간을 매번 세는 것을 개선하기 위해, count 형태로 관리한다
	let notBloomedCount = 0;
	for (let row = 0; row < parkSize; row++){
		for (let col = 0; col < parkSize; col++){
			if (park[row][col] > 0) notBloomedCount++;
		}
	}

	let day;
	for (day = 0; notBloomedCount > 0; day++){
		let additionalBlooms = Array.from({length: parkSize}, () => (
			Array.from({length: parkSize}, () => 0)
		));

		for (let row = 0; row < parkSize; row++){
			for (let col = 0; col < parkSize; col++){
				// 현위치에 모든 단풍나무가 물들면 주변의 S를 깎는 형태로 발상을 바꾼다
				if (park[row][col] === 0){
					// 오른쪽
					if (col < parkSize - 1) additionalBlooms[row][col + 1]++;
					// 아래쪽
					if (row < parkSize - 1) additionalBlooms[row + 1][col]++;
					// 왼쪽
					if (col > 0) additionalBlooms[row][col - 1]++;
					// 위쪽
					if (row > 0) additionalBlooms[row - 1][col]++;
				}
			}
		}

		// park에 적용한다
		for (let row = 0; row < parkSize; row++){
			for (let col = 0; col < parkSize; col++){
				// 이미 0인 경우, count 계산의 혼동 방지를 위해 넘어간다
				if (park[row][col] === 0) continue;

				park[row][col] -= additionalBlooms[row][col];
				if (park[row][col] <= 0){
					park[row][col] = 0;
					notBloomedCount--;
				}
			}
		}
	}

	console.log(day);
	
	process.exit();
})();

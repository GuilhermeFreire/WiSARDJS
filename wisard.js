((global) => {
	let $ = global.document;

	let board = $.querySelector("#board");
	let boardRect = board.getBoundingClientRect();
	let context = board.getContext('2d');
	board.addEventListener("mousemove", (event) => {
		let x = event.clientX - boardRect.left;
		let y = event.clientY - boardRect.top;
		let r = 5;
		let isLeftClicked = Boolean(event.buttons & 0b1);

		//console.log("X: " + x, "Y: " + y, "isLeftClicked: " + isLeftClicked);

		if(isLeftClicked){
			draw(x, y, r);		
		}
		
	});

	let btn = $.querySelector("#done");
	btn.addEventListener("click", (event) =>{
		let pixelArray = context.getImageData(0, 0, board.width, board.height);
		let retina = downScale(pixelArray);
	});


	function draw(x, y, r){
		console.log("X: " + x, "Y: " + y, "r: " + r);
		console.log("drawing");
		context.beginPath();
		context.arc(x, y, r, 0, 2 * Math.PI, false);
		context.fillStyle = 'red';
		context.fill();
	}

	function downScale(array){
		let smallArray = new Uint32Array(64);
		let finalArray = new Uint8Array(64);
		for(let i = 0; i < board.width; i+=3){
			for(let j = 0; j < board.height; j+=3){
				if(array[i*board.width + j] != 0){
					smallArray[Math.floor(i/15) *64 + Math.floor(j/15)]++;
				}
			}
		}
		for(let k = 0; k < smallArray.length; k++){
			finalArray[k] = (smallArray[k] > 12)? 1 : 0;
		}
		return finalArray;
	}


})(window);
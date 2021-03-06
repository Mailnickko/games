$(document).ready(function() {
/*==============================================
				Variables
==============================================*/
	var canvas = document.getElementById("snakeCanvas");
	var ctx = canvas.getContext("2d");
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;

	var cellWidth = 15;
	var direction; 
	var snake_array;
	var food;
	var score;

/*==============================================
				Event Handler
==============================================*/

	document.addEventListener('keydown', keyDownHandler, false);

	function keyDownHandler(e) {
		var key = e.which;

		if(key == 37 && direction != "right") {
			direction = "left";
		} else if (key == 38 && direction != "down") {
			direction = "up";
		} else if (key == 39 && direction != "left") {
			direction = "right";
		} else if (key == 40 && direction != "up") {
			direction = "down";
			console.log("down");
			console.log(direction);

		}
	}

/*==============================================
				Functions
==============================================*/

	function init() {
		direction = "right";
		create_snake();
		create_food();
		score = 0;
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}
	init();

	function create_snake() {
		var length = 5;
		snake_array = [];
		for (var i = length; i >= 0; i--) {
			snake_array.push({x:i, y:0});
		}
	}

	function create_food() {
		food = {
			x: Math.round(Math.random()*(canvasWidth - cellWidth)/cellWidth),
			y: Math.round(Math.random()*(canvasHeight - cellWidth)/cellWidth)
		}
	}

	function paint() {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

	//snake movement(queue)
		var nextX = snake_array[0].x;
		var nextY = snake_array[0].y;

		if (direction == "right") {
				nextX++;
		} else if (direction == "left") {
				nextX--;
		} else if (direction =="up") {
				nextY--;
		} else if (direction == "down") {
				nextY++;
		}

		if(nextX == -1 || nextX == canvasWidth/cellWidth || nextY == -1 || nextY == canvasHeight/cellWidth || check_collision(nextX, nextY, snake_array)) {
			init();
			return;
		}

		if(nextX == food.x && nextY == food.y) {
			var tail = {
				x: nextX,
				y: nextY
			};
			score++;
			create_food();
		} else {
	//remove the "tail" of snake
			var tail = snake_array.pop();
			tail.x = nextX;
			tail.y = nextY;
		}

	//reinsert in front of head cell
		snake_array.unshift(tail);

		for(var i = 0; i < snake_array.length; i++) {
			var snakePart = snake_array[i];
			paint_cells(snakePart.x, snakePart.y);
		}

		paint_cells(food.x, food.y);

		var score_text = "Score: " + score;
		ctx.fillText(score_text, 5, canvasHeight - 5);
	}

	function paint_cells(x, y) {
		ctx.fillStyle = "green";
		ctx.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
	}

	function check_collision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
});
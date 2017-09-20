
function startGame(){
  document.addEventListener('keydown', function(keyPressed){
    snake.keyboardEvent = keyPressed;
  });
  document.addEventListener('keydown', gameArea.pauseAndResume);
  document.addEventListener('keydown', function(key){
      if(key.code === 'ArrowUp' || key.code === 'ArrowDown' || key.code === 'Space'){
        key.preventDefault();
      }
    });
  gameArea.start();
}

function updateGameArea(){
  if(snake.living){
    gameArea.clear();
    snake.changeDirection(snake.keyboardEvent);
    snake.addBodyPart();
    snake.moveHead();
    if(snake.foodCollision === false){
      snake.removeBodyPart();
    }
    snake.foodCollision = false;
    snake.render('lime', '#28af28');
    snake.detectCollision();
    food.render();
    document.getElementById('score').innerHTML = gameArea.score;
  }
}

var gameArea = {
  score: 0,
  paused: false,
  start: function(){
    gameArea.canvas = document.getElementById('gameCanvas');
    gameArea.canvas.width = 602;
    gameArea.canvas.height = 602;
    gameArea.ctx = gameArea.canvas.getContext('2d');
    gameArea.interval = setInterval(updateGameArea, 100);
  },
  clear: function(){
    gameArea.ctx.fillStyle = 'black';
    gameArea.ctx.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
  },
  pauseAndResume: function(keyPressed){
    if(keyPressed.code === 'Space'){
      if(gameArea.paused === false && snake.living){
        clearInterval(gameArea.interval);
        gameArea.ctx.fillStyle = 'white';
        gameArea.ctx.font = "64px Arial Black";
        gameArea.ctx.fillText('Paused', 171, 78);
        gameArea.paused = true;
      } else{
        gameArea.interval = setInterval(updateGameArea, 100);
        gameArea.paused = false;
      }
    }
  }
}

var food = {
  coordinates: [[294, 294]],
  create: function(){
    var randomX = Math.round(Math.random() * gameArea.canvas.width / 14) * 14 - 14;
    var randomY = Math.round(Math.random() * gameArea.canvas.height / 14) * 14 - 14;
    food.coordinates = [[randomX, randomY]];
  },
  render: function(){
    gameArea.ctx.fillStyle = 'gold';
    gameArea.ctx.fillRect(food.coordinates[0][0] + 1, food.coordinates[0][1] + 1, 12, 12);
  },
  preventFoodBodyPartCollision: function(){
    snake.bodyParts.forEach(bodyPart => {
      if(food.coordinates[0].toString() === bodyPart.toString() || food.coordinates[0].toString() === snake.head.toString()){
        food.create();
        food.preventFoodBodyPartCollision();
      }
    });
  }
}

function Thing(){
  this.coordinates = [];
  this.create = function(){
    var randomX = Math.round(Math.random() * gameArea.canvas.width / 14) * 14 - 12;
    var randomY = Math.round(Math.random() * gameArea.canvas.height / 14) * 14 - 12;
    this.coordinates.unshift([randomX, randomY]);
  }
  this.render = function(color){
    this.coordinates.forEach(coord => {
      gameArea.ctx.fillStyle = color;
      gameArea.ctx.fillRect(coord[0], coord[1], 12, 12);
    });
  }
}

var snake = {
  living: true,
  head: [0, 294],
  bodyParts: [],
  direction: 'right',
  keyboardEvent: {code: 'ArrowRight'},
  foodCollision: false,
  render: function(headColor, bodyColor){
    gameArea.ctx.fillStyle = headColor;
    gameArea.ctx.fillRect(snake.head[0] + 1, snake.head[1] + 1, 12, 12);
    snake.bodyParts.forEach(coord => {
      gameArea.ctx.fillStyle = bodyColor;
      gameArea.ctx.fillRect(coord[0] + 1, coord[1] + 1, 12, 12);
    });
  },
  changeDirection: function(keyPressed){
    if((keyPressed.code === 'ArrowRight' || keyPressed.code === 'KeyD') && (snake.direction !== 'left' || snake.bodyParts.length === 0)){
      snake.direction = 'right';
    } else if((keyPressed.code === 'ArrowLeft' || keyPressed.code === 'KeyA') && (snake.direction !== 'right' || snake.bodyParts.length === 0)){
      snake.direction = 'left';
    } else if((keyPressed.code === 'ArrowUp' || keyPressed.code === 'KeyW') && (snake.direction !== 'down' || snake.bodyParts.length === 0)){
      snake.direction = 'up';
    } else if((keyPressed.code === 'ArrowDown' || keyPressed.code === 'KeyS') && (snake.direction !== 'up' || snake.bodyParts.length === 0)){
      snake.direction = 'down';
    }
  },
  detectCollision: function(){
    // collision with self
    snake.bodyParts.forEach(bodyPart => {
      if(snake.head.toString() === bodyPart.toString()){
        clearInterval(gameArea.interval);
        snake.render('red', 'red');
        snake.living = false;
      }
    });
    // collision with canvas border
    if(snake.head[0] > gameArea.canvas.width - 1 || snake.head[0] < 0 || snake.head[1] > gameArea.canvas.height - 1 || snake.head[1] < 0){
      clearInterval(gameArea.interval);
      snake.render('red', 'red');
      snake.living = false;
    }
    // collision with food
    if(snake.head.toString() === food.coordinates.toString()){
      snake.foodCollision = true;
      food.create();
      food.preventFoodBodyPartCollision();
      gameArea.score += 1;
    }
  },
  moveHead: function(){
    if(snake.direction === 'right'){
      snake.head = [snake.head[0] + 14, snake.head[1]];
    } else if(snake.direction === 'left'){
      snake.head = [snake.head[0] - 14, snake.head[1]];
    } else if(snake.direction === 'up'){
      snake.head = [snake.head[0], snake.head[1] - 14];
    } else if(snake.direction === 'down'){
      snake.head = [snake.head[0], snake.head[1] + 14];
    }
  },
  addBodyPart: function(){
    snake.bodyParts.unshift(snake.head.slice());
  },
  removeBodyPart: function(){
    snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);
  }
};
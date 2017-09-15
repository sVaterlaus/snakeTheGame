
function startGame(){
  document.addEventListener('keydown',  function(event){
    snake.keyboardEvent = event;
  });
  gameArea.start();
}

function updateGameArea(){
  gameArea.clear();
  snake.changeDirection(snake.keyboardEvent);
  snake.addBodyPart();
  snake.moveHead();
  snake.removeBodyPart();
  snake.render('green', 'rgb(0, 180, 0)');
  snake.detectCollision();
}

var gameArea = {
  start: function(){
    gameArea.canvas = document.getElementById('gameCanvas');
    gameArea.canvas.width = 596;
    gameArea.canvas.height = 596;
    gameArea.ctx = gameArea.canvas.getContext('2d');
    gameArea.interval = setInterval(updateGameArea, 125);
  },
  clear: function(){
    gameArea.ctx.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
  }
}

var snake = {
  head: [1, 1],
  bodyParts: [[1, 8],[1, 15],[1, 22],[1, 29],[1, 36]],
  direction: 'right',
  keyboardEvent: {code: 'ArrowRight'},
  render: function(headColor, bodyColor){
    gameArea.ctx.fillStyle = headColor;
    gameArea.ctx.fillRect(snake.head[0], snake.head[1], 6, 6);
    snake.bodyParts.forEach(function(coord){
      var x = coord[0];
      var y = coord[1];
      gameArea.ctx.fillStyle = bodyColor;
      gameArea.ctx.fillRect(x, y, 6, 6);
    });
  },
  changeDirection: function(event){
    if((event.code === 'ArrowRight' || event.code === 'KeyD') && (snake.direction !== 'left' || snake.bodyParts.length === 0)){
      snake.direction = 'right';
    } else if((event.code === 'ArrowLeft' || event.code === 'KeyA') && (snake.direction !== 'right' || snake.bodyParts.length === 0)){
      snake.direction = 'left';
    } else if((event.code === 'ArrowUp' || event.code === 'KeyW') && (snake.direction !== 'down' || snake.bodyParts.length === 0)){
      snake.direction = 'up';
    } else if((event.code === 'ArrowDown' || event.code === 'KeyS') && (snake.direction !== 'up' || snake.bodyParts.length === 0)){
      snake.direction = 'down';
    }
  },
  detectCollision: function(){
    // collision with self
    snake.bodyParts.forEach(function(bodyPart){
      if(snake.head.toString() === bodyPart.toString()){
        clearInterval(gameArea.interval);
        snake.render('red', 'red');
      }
    });
    // collision with canvas border
    if(snake.head[0] > gameArea.canvas.width || snake.head[0] < 0 || snake.head[1] > gameArea.canvas.height || snake.head[1] < 0){
      clearInterval(gameArea.interval);
      snake.render('red', 'red');
    }
  },
  moveHead: function(){
    if(snake.direction === 'right'){
      snake.head = [snake.head[0] + 7, snake.head[1]];

    } else if(snake.direction === 'left'){
      snake.head = [snake.head[0] - 7, snake.head[1]];

    } else if(snake.direction === 'up'){
      snake.head = [snake.head[0], snake.head[1] - 7];

    } else if(snake.direction === 'down'){
      snake.head = [snake.head[0], snake.head[1] + 7];
    }
  },
  addBodyPart: function(){
    snake.bodyParts.unshift(snake.head.slice());
  },
  removeBodyPart: function(){
    snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);
  }
};

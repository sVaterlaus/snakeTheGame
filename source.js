
function startGame(){
  document.addEventListener('keydown',  function(event){
    snake.keyboardEvent = event;
  });
  gameArea.start();
}

function updateGameArea(){
  gameArea.clear();
  snake.changeDirection(snake.keyboardEvent);
  snake.move();
  snake.render();
  snake.detectCollision();
  // out of bounds:
  if(snake.head[0] > gameArea.canvas.width || snake.head[0] < 0 | snake.head[1] > gameArea.canvas.height || snake.head[1] < 0){
    clearInterval(gameArea.interval);
  }
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
  bodyParts: [],
  direction: 'right',
  keyboardEvent: {code: 'ArrowRight'},
  render: function(){
    gameArea.ctx.fillStyle = 'rgb(0, 180, 0)';
    gameArea.ctx.fillRect(snake.head[0], snake.head[1], 6, 6);
    snake.bodyParts.forEach(function(coord){
      var x = coord[0];
      var y = coord[1];
      gameArea.ctx.fillStyle = 'rgb(0, 180, 0)';
      gameArea.ctx.fillRect(x, y, 6, 6);
    });
  },
  changeDirection: function(event){
    if((event.code === 'ArrowRight' || event.code === 'KeyD') && snake.direction !== 'left'){
      snake.direction = 'right';
    } else if((event.code === 'ArrowLeft' || event.code === 'KeyA') && snake.direction !== 'right'){
      snake.direction = 'left';
    } else if((event.code === 'ArrowUp' || event.code === 'KeyW') && snake.direction !== 'down'){
      snake.direction = 'up';
    } else if((event.code === 'ArrowDown' || event.code === 'KeyS') && snake.direction !== 'up'){
      snake.direction = 'down';
    }
  },
  detectCollision: function(){
    snake.bodyParts.forEach(function(bodyPart){
      if(snake.head.toString() === bodyPart.toString()){
        clearInterval(gameArea.interval);
      }
    });
  },
  move: function(){
    if(snake.direction === 'right'){
      // copy the head to front of body
      snake.bodyParts.unshift(snake.head.slice());
      // move original head according to snake.direction
      snake.head = [snake.head[0] + 7, snake.head[1]];
      // remove last bodypart of snake
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);

    } else if(snake.direction === 'left'){
      snake.bodyParts.unshift(snake.head.slice());
      snake.head = [snake.head[0] - 7, snake.head[1]];
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);

    } else if(snake.direction === 'up'){
      snake.bodyParts.unshift(snake.head.slice());
      snake.head = [snake.head[0], snake.head[1] - 7];
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);

    } else if(snake.direction === 'down'){
      snake.bodyParts.unshift(snake.head.slice());
      snake.head = [snake.head[0], snake.head[1] + 7];
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);
    }
  }
};
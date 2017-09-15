
var snake = {
  length: 1,
  bodyParts: [[297, 297], [290, 297], [283, 297], [276, 297], [269, 297]],
  direction: 'right',
  keyboardEvent: {code: 'ArrowRight'},
  render: function(){
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
    snake.bodyParts.slice(1, snake.bodyParts.length).forEach(function(coord){
      if(snake.bodyParts[0].toString() === coord.toString()){
        clearInterval(gameArea.interval);
      }
    });
  },
  move: function(){
    if(snake.direction === 'right'){
      snake.bodyParts.unshift(snake.bodyParts[0].slice());
      snake.bodyParts[0] = [snake.bodyParts[0][0] + 7, snake.bodyParts[0][1]];
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);

    } else if(snake.direction === 'left'){
      snake.bodyParts.unshift(snake.bodyParts[0].slice());
      snake.bodyParts[0] = [snake.bodyParts[0][0] - 7, snake.bodyParts[0][1]];
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);

    } else if(snake.direction === 'up'){
      snake.bodyParts.unshift(snake.bodyParts[0].slice());
      snake.bodyParts[0] = [snake.bodyParts[0][0], snake.bodyParts[0][1] - 7];
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);

    } else if(snake.direction === 'down'){
      snake.bodyParts.unshift(snake.bodyParts[0].slice());
      snake.bodyParts[0] = [snake.bodyParts[0][0], snake.bodyParts[0][1] + 7];
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);
    }
  }
};

function startGame(){
  document.addEventListener('keydown',  function(event){
    snake.keyboardEvent = event;
  });
  gameArea.start();
}

var gameArea = {
  start: function(){
    gameArea.canvas = document.getElementById('gameCanvas');
    gameArea.canvas.width = 600;
    gameArea.canvas.height = 600;
    gameArea.ctx = gameArea.canvas.getContext('2d');
    gameArea.interval = setInterval(updateGameArea, 125);
  },
  clear: function(){
    gameArea.ctx.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
  }
}

function updateGameArea(){
  gameArea.clear();
  snake.changeDirection(snake.keyboardEvent);
  snake.move();
  snake.render();
  snake.detectCollision();

  // out of bounds:
  if(snake.bodyParts[0][0] > gameArea.canvas.width || snake.bodyParts[0][0] < 0 | snake.bodyParts[0][1] > gameArea.canvas.height || snake.bodyParts[0][1] < 0){
    clearInterval(gameArea.interval);
  }
}


var snake = {
  length: 1,
  bodyParts: [[297, 297], [290, 297], [283, 297], [276, 297], [269, 297]],
  direction: 'right',
  move: {
    up: function(){
      snake.bodyParts.unshift(snake.bodyParts[0].slice());
      snake.bodyParts[0] = [snake.bodyParts[0][0], snake.bodyParts[0][1] - 7];
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);
    },
    right: function(){
      snake.bodyParts.unshift(snake.bodyParts[0].slice());
      snake.bodyParts[0] = [snake.bodyParts[0][0] + 7, snake.bodyParts[0][1]];
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);
    },
    down: function(){
      snake.bodyParts.unshift(snake.bodyParts[0].slice());
      snake.bodyParts[0] = [snake.bodyParts[0][0], snake.bodyParts[0][1] + 7];
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);
    },
    left: function(){
      snake.bodyParts.unshift(snake.bodyParts[0].slice());
      snake.bodyParts[0] = [snake.bodyParts[0][0] - 7, snake.bodyParts[0][1]];
      snake.bodyParts.pop(snake.bodyParts[snake.bodyParts.length - 1]);
    }
  },
  render: function(){
    this.bodyParts.forEach(function(coord){
      var x = coord[0];
      var y = coord[1];
      gameArea.ctx.fillStyle = 'rgb(0, 180, 0)';
      gameArea.ctx.fillRect(x, y, 6, 6);
    });
  }
};

function startGame(){
  gameArea.start();
}

var gameArea = {
  start: function(){
    this.canvas = document.getElementById('gameCanvas');
    this.canvas.width = 1200;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
    this.interval = setInterval(updateGameArea, 125);
  },
  clear: function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function updateGameArea(){
  gameArea.clear();
  snake.move.down();
  snake.render();

  // temporary interval limit
  if(snake.bodyParts[0][1] > 600){
    clearInterval(gameArea.interval);
  }
}

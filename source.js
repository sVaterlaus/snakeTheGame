
var snake = {
  length: 1,
  bodyParts: [[297, 297], [290, 297], [283, 297], [276, 297], [269, 297]],
  direction: 'right',
  render: function(){
    this.bodyParts.forEach(function(coord){
      var x = coord[0];
      var y = coord[1];
      gameArea.ctx.fillStyle = 'rgb(0, 180, 0)';
      gameArea.ctx.fillRect(x, y, 6, 6);
    });
  },
  changeDirection: function(event){
    if(event.code === 'ArrowRight' || event.code === 'KeyD'){
      snake.direction = 'right';
    } else if(event.code === 'ArrowLeft' || event.code === 'KeyA'){
      snake.direction = 'left';
    } else if(event.code === 'ArrowUp' || event.code === 'KeyW'){
      snake.direction = 'up';
    } else if(event.code === 'ArrowDown' || event.code === 'KeyS'){
      snake.direction = 'down';
    }
  },
  move: function(){
    if(this.direction === 'right'){
      this.bodyParts.unshift(this.bodyParts[0].slice());
      this.bodyParts[0] = [this.bodyParts[0][0] + 7, this.bodyParts[0][1]];
      this.bodyParts.pop(this.bodyParts[this.bodyParts.length - 1]);

    } else if(this.direction === 'left'){
      this.bodyParts.unshift(this.bodyParts[0].slice());
      this.bodyParts[0] = [this.bodyParts[0][0] - 7, this.bodyParts[0][1]];
      this.bodyParts.pop(this.bodyParts[this.bodyParts.length - 1]);

    } else if(this.direction === 'up'){
      this.bodyParts.unshift(this.bodyParts[0].slice());
      this.bodyParts[0] = [this.bodyParts[0][0], this.bodyParts[0][1] - 7];
      this.bodyParts.pop(this.bodyParts[this.bodyParts.length - 1]);

    } else if(this.direction === 'down'){
      this.bodyParts.unshift(this.bodyParts[0].slice());
      this.bodyParts[0] = [this.bodyParts[0][0], this.bodyParts[0][1] + 7];
      this.bodyParts.pop(this.bodyParts[this.bodyParts.length - 1]);
    }
  }
};

function startGame(){
  document.addEventListener('keydown',  snake.changeDirection);
  gameArea.start();
}

var gameArea = {
  start: function(){
    this.canvas = document.getElementById('gameCanvas');
    this.canvas.width = 600;
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
  snake.move();
  snake.render();

  // out of bounds:
  if(snake.bodyParts[0][0] > gameArea.canvas.width || snake.bodyParts[0][0] < 0 | snake.bodyParts[0][1] > gameArea.canvas.height || snake.bodyParts[0][1] < 0){
    clearInterval(gameArea.interval);
  }
}

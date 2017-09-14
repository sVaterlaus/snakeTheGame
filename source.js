
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
  snake.move();
  snake.render();

  // temporary interval limit
  if(snake.bodyParts[0][0] > 600){
    clearInterval(gameArea.interval);
  }
}

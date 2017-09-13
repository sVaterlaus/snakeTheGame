
var snake = {
  length: 1,
  bodyParts: [[297, 297], [290, 297], [283, 297]],
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
      this.bodyParts = this.bodyParts.map(function(coord){
        return [coord[0] + 7, coord[1]];
      });
    } else if(this.direction === 'left'){
      this.bodyParts = this.bodyParts.map(function(coord){
        return [coord[0] - 7, coord[1]];
      });
    } else if(this.direction === 'up'){
      this.bodyParts = this.bodyParts.map(function(coord){
        return [coord[0], coord[1] - 7];
      });
    } else if(this.direction === 'down'){
      this.bodyParts = this.bodyParts.map(function(coord){
        return [coord[0], coord[1] + 7];
      });
    }
  }
};

function startGame(){
  gameArea.start();
}

var gameArea = {
  canvas: document.createElement('canvas'),
  start: function(){
    this.canvas.width = 1200;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
  console.log("updated: " + snake.bodyParts);
  if(snake.bodyParts[0][0] > 800){
    clearInterval(gameArea.interval);
  }
}

// snake object is failing to render.
// make seperate js file that properly renders snake object as it is above.

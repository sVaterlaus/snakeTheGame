
function startGame(){
  document.addEventListener('keydown', function(keyPress){
    gameArea.keyboardEvent = keyPress;
    gameArea.preventDefault();
    gameArea.pauseOrResume();
  });
  gameArea.start();
}

function updateGameArea(){
  if(snake.living){
    gameArea.clear();
    snake.changeDirection();
    snake.addBodyPart();
    snake.moveHead();
    if(snake.foodCollision === false){
      snake.removeBodyPart();
    }
    snake.foodCollision = false;
    snake.render('lime', '#28af28');
    snake.detectCollision();
    food.render();
    // poison.render();
    document.getElementById('score').innerHTML = gameArea.score;
  }
}

var gameArea = {
  score: 0,
  paused: false, //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SHOULD BEGIN "PAUSED" ON PAGE REFRESH.
  keyboardEvent: {code: 'ArrowRight'},
  start: function(){
    gameArea.canvas = document.getElementById('gameCanvas');
    gameArea.canvas.width = 602;
    gameArea.canvas.height = 602;
    gameArea.ctx = gameArea.canvas.getContext('2d');
    gameArea.interval = setInterval(updateGameArea, 100);
  },
  clear: function(){
    gameArea.ctx.fillStyle = 'black'; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< NECESSARY LINE?
    gameArea.ctx.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
  },
  preventDefault: function(){
    let k = gameArea.keyboardEvent.code;
    if(k === 'ArrowUp' || k === 'ArrowDown' || k === 'Space'){
      gameArea.keyboardEvent.preventDefault();
    }
  },
  pauseOrResume: function(){
    if(gameArea.keyboardEvent.code === 'Space'){
      if(!gameArea.paused && snake.living){
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
    var randomX = Math.round(Math.random() * (gameArea.canvas.width - 14) / 14) * 14;
    var randomY = Math.round(Math.random() * (gameArea.canvas.width - 14) / 14) * 14;
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

// var poison = {
//   coordinates: [],
//   create: function(){
//     var randomCoord = Math.round(Math.random() * (gameArea.canvas.width - 14) / 14) * 14;
//     poison.coordinates.unshift([randomCoord, randomCoord]);
//   },
//   render: function(){
//     poison.coordinates.forEach(coord => {
//       gameArea.ctx.fillStyle = 'red';
//       gameArea.ctx.fillRect(coord[0] + 1, coord[1] + 1, 12, 12);
//     })
    
//   },
//   preventPoisonBodyPartCollision: function(){
//     snake.bodyParts.forEach(bodyPart => {
//       if(poison.coordinates[0].toString() === bodyPart.toString() || poison.coordinates[0].toString() === snake.head.toString()){
//         poison.create();
//         poison.preventPoisonBodyPartCollision();
//       }
//     });
//   }
// }

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
  changeDirection: function(){
    let k = gameArea.keyboardEvent.code;
    if((k === 'ArrowRight' || k === 'KeyD') && (snake.direction !== 'left' || snake.bodyParts.length === 0)){
      snake.direction = 'right';
    } else if((k === 'ArrowLeft' || k === 'KeyA') && (snake.direction !== 'right' || snake.bodyParts.length === 0)){
      snake.direction = 'left';
    } else if((k === 'ArrowUp' || k === 'KeyW') && (snake.direction !== 'down' || snake.bodyParts.length === 0)){
      snake.direction = 'up';
    } else if((k === 'ArrowDown' || k === 'KeyS') && (snake.direction !== 'up' || snake.bodyParts.length === 0)){
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
      // poison.create();
      food.preventFoodBodyPartCollision();
      // poison.preventPoisonBodyPartCollision();
      gameArea.score += 1;
    }
      // collision with poison
    // poison.coordinates.forEach(coord => {
    //   if(snake.head.toString() === coord.toString()){
    //     clearInterval(gameArea.interval);
    //     snake.render('red', 'red');
    //     snake.living = false;
    //   }
    // })
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


function startGame(){
  document.addEventListener('keydown', function(keyPress){
    gameArea.keyboardEvent = keyPress;
    gameArea.preventDefault();
    gameArea.pauseOrResume();
  });
  gameArea.start();
}

function nextFrame(){
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
    poison.render();
    document.getElementById('score').innerHTML = gameArea.score;
  }
}

function preventSpawnOverlap(newSpawn){
  let allGameCoords = [];
  for(let i in arguments){
    arguments[i].coords.forEach(coord => allGameCoords.push(coord.toString()));
  snake.bodyParts.forEach(bodyPart => allGameCoords.push(bodyPart.toString()));
  allGameCoords.push(snake.head.toString());
  }
  (function overlapCheck(){
    newSpawn.create();
    if(allGameCoords.includes(newSpawn.coords[0].toString())){
      overlapCheck();
    }
  })();
}

let gameArea = {
  score: 0,
  paused: false,
  keyboardEvent: {code: 'ArrowRight'},
  start: function(){
    gameArea.canvas = document.getElementById('gameCanvas');
    gameArea.canvas.width = 602;
    gameArea.canvas.height = 602;
    gameArea.ctx = gameArea.canvas.getContext('2d');
    gameArea.interval = setInterval(nextFrame, 100);
  },
  clear: function(){
    gameArea.ctx.fillStyle = 'black';
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
        gameArea.interval = setInterval(nextFrame, 100);
        gameArea.paused = false;
      }
    }
  }
}

let food = {
  coords: [[294, 294]],
  create: function(){
    let randomX = Math.round(Math.random() * (gameArea.canvas.width - 14) / 14) * 14;
    let randomY = Math.round(Math.random() * (gameArea.canvas.width - 14) / 14) * 14;
    food.coords = [[randomX, randomY]];
  },
  render: function(){
    gameArea.ctx.fillStyle = 'gold';
    gameArea.ctx.fillRect(food.coords[0][0] + 1, food.coords[0][1] + 1, 12, 12);
  }
}

let poison = {
  coords: [],
  create: function(){
    let randomX = Math.round(Math.random() * (gameArea.canvas.width - 14) / 14) * 14;
    let randomY = Math.round(Math.random() * (gameArea.canvas.width - 14) / 14) * 14;
    poison.coords.unshift([randomX, randomY]);
  },
  render: function(){
    poison.coords.forEach(coord => {
      gameArea.ctx.fillStyle = 'red';
      gameArea.ctx.fillRect(coord[0] + 1, coord[1] + 1, 12, 12);
    });
  }
}

let snake = {
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
    if(snake.head.toString() === food.coords.toString()){
      snake.foodCollision = true;
      preventSpawnOverlap(poison, food);
      preventSpawnOverlap(food, poison);
      gameArea.score += 1;
    }
    // collision with poison
    poison.coords.forEach(coord => {
      if(snake.head.toString() === coord.toString()){
        clearInterval(gameArea.interval);
        snake.render('red', 'red');
        snake.living = false;
      }
    })
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

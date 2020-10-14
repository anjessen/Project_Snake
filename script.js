//import "/style.css"

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let speed = 800;
let direction = 'n';
const gridElem = 40; //20 * 20
const snake = [[9, 9],[8, 9],[7, 9]];
let apple = [5, 5];
let score = 0;

const drawMap = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 800, 800);
};

const drawSnake = () => {
    ctx.fillStyle = "green";
    for (let body of snake) {
      ctx.fillRect(
        body[0] * gridElem,
        body[1] * gridElem,
        gridElem - 2,
        gridElem - 2
      );
    }
  };

const drawApple = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem);
  };

window.addEventListener("keydown", event => {
    switch (event.key) {
      case "ArrowRight": {
        direction = "e";
        break;
      }
      case "ArrowLeft": {
        direction = "o";
        break;
      }
      case "ArrowUp": {
        direction = "n";
        break;
      }
      case "ArrowDown": {
        direction = "s";
        break;
      }
    }
  });

  const gameover = () => {
    if (
      snake[0][0] > 19 ||
      snake[0][0] < 0 ||
      snake[0][1] > 19 ||
      snake[0][1] < 0
    ) {
      return true;
    } else {
      const [head, ...body] = snake;
      for (let bodyElem of body) {
        if (bodyElem[0] === head[0] && bodyElem[1] === head[1]) {
          return true;
        }
      }
    }
    return false;
  };

  const generateApple = () => {
    const [x, y] = [
      Math.trunc(Math.random() * 20),
      Math.trunc(Math.random() * 20),
    ];
    for (let body of snake) {
      if (body[0] === x && body[1] === y) {
        return generateApple();
      }
    }
    score++;
    apple = [x, y];
  };

const updateSnakePosition = () => {
    let head;
    switch (direction) {
        case 'e': {
            head = [snake[0][0] + 1, snake[0][1]];
            break;
        }
        case 'o': {
            head = [snake[0][0] - 1, snake[0][1]];
            break;
        }
        case 'n': {
            head = [snake[0][0], snake[0][1] - 1];
            break;
        }
        case 's': {
            head = [snake[0][0], snake[0][1] + 1];
            break;
        }
        default: {
        }
    }
    snake.unshift(head);
    // Collision avec la pomme :
    if (head[0] === apple[0] && head[1] === apple[1]) {
      // Générer une nouvelle pomme :
      generateApple();
    } else {
      snake.pop();
    }

    return gameover();
};


  const drawScore = () => {
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.textBaseline = "top";
    ctx.fillText(score, gridElem, gridElem);
  };

const move = () => {
    if (!updateSnakePosition()) {
        drawMap();
        drawSnake();
        drawApple();
        drawScore();
        setTimeout(() => {
            requestAnimationFrame(move);
        }, 1000 - speed);
    }
    else
    {
        alert(`finished! your score is ${score}`);
    }
  };
  
  requestAnimationFrame(move);
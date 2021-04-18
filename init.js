const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = document.createElement("img");
img.src =
  "https://i.pinimg.com/originals/13/b7/13/13b713f8756a24e820a282ca71c68813.jpg";

let data = {
  ball: {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 10,
    xDelta: 3,
    yDelta: 3,
  },
  pong: {
    x: 5,
    y: 5,
    width: 10,
    height: 80,
  },
  lives: 5,
  score: 0,
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(data.ball.x, data.ball.y, data.ball.r, 0, 2 * Math.PI);
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
}

function updateBall() {
  if (data.lives < 0) {
    alert("game over");
    data = {
      ball: {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: 10,
        xDelta: 3,
        yDelta: 3,
      },
      pong: {
        x: 5,
        y: 5,
        width: 10,
        height: 80,
      },
      lives: 5,
      score: 0,
    };
  }

  if (data.ball.r + data.ball.x > canvas.width) {
    data.ball.xDelta *= -1;
  }
  if (
    data.ball.r + data.ball.y > canvas.height ||
    data.ball.y - data.ball.r < 0
  ) {
    data.ball.yDelta *= -1;
  }

  if (
    data.ball.y >= data.pong.y &&
    data.ball.y <= data.pong.y + data.pong.height &&
    data.ball.x - data.ball.r <= data.pong.x + data.pong.width
  ) {
    data.ball.xDelta *= -1;
  }

  if (data.ball.x < data.pong.x + data.pong.width) {
    data.lives -= 1;
    data.ball.x = canvas.width / 2;
    data.ball.y = canvas.height / 2;
  }

  data.ball.x += data.ball.xDelta;
  data.ball.y += data.ball.yDelta;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  drawBall();
  ctx.fillStyle = "white";
  ctx.fillRect(data.pong.x, data.pong.y, data.pong.width, data.pong.height);
  ctx.font = "20px Arial";
  ctx.fillText(data.lives, 50, 50);
  ctx.fillText(data.score, canvas.width - 100, 50);
}

function update() {
  updateBall();
}

function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}
loop();

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" && data.pong.y + data.pong.height < canvas.height) {
    data.pong.y += 10;
  } else if (e.key === "ArrowUp" && data.pong.y > 0) {
    data.pong.y -= 10;
  }
});

setInterval(() => {
  data.score += 1;
}, 1000);

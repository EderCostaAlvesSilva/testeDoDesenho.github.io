const canvas = document.getElementById('canvas');
const clear = document.getElementById('clear');

const ctx = canvas.getContext("2d");

let size = 10;
let isPressed = false;
let color = 'black';
let x, y = undefined;

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y2);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
    isPressed = false;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);

        x = x2;
        y = y2;
    }
});

clear.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


/*touch support*/
function touchDraw(e) {
    x = e.touches[0].pageX - canvas.offsetLeft;
    y = e.touches[0].pageY - canvas.offsetTop;

    posXY.push({ x: x, y: y });

    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI * 2, false);

    ctx.fillStyle = color;
    ctx.fill();

    e.preventDefault();
}

canvas.addEventListener("touchstart", function (e) {
    paint = true;
    touchDraw(e);
});

canvas.addEventListener("touchmove", function (e) {
    if (paint) {
      touchDraw(e);
      ctx.lineWidth = 2 * radius;
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.lineJoin = ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(posXY[0].x, posXY[0].y);

      for (i = 1; i < posXY.length; i++) {
        ctx.lineTo(posXY[i].x, posXY[i].y);
      }
      ctx.stroke();
    }
  });

 canvas.addEventListener("touchend", function () {
    paint = false;
    posXY = [];
  });

 canvas.addEventListener("touchend", function () {
    paint = false;
    posXY = [];
  });
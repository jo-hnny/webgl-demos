function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

const MAX = 500;

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerWidth;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  function drawCircle(context, radius) {
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;
    const fillColor = randomColor();
    context.fillStyle = fillColor;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  function draw(context, count = MAX, radius = 20) {
    for (let i = 0; i < count; i++) {
      drawCircle(context, radius);
    }
  }

  requestAnimationFrame(function update() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    draw(ctx);
    requestAnimationFrame(update);
  });
}

main();

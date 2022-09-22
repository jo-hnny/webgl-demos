import * as PIXI from "pixi.js";
import img from "./ciecle.svg";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const MAX = 500;

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
});

document.body.appendChild(app.view);

const pc = new PIXI.ParticleContainer(MAX);

app.stage.addChild(pc);

const texture = PIXI.Texture.from(img);

const imgs = [...new Array(MAX)].map(() => {
  const sp = new PIXI.Sprite(texture);

  sp.width = 30;
  sp.height = 30;

  app.stage.addChild(sp);

  return sp;
});

function render() {
  imgs.forEach((img) => {
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;
    const color = Math.random() * 0xffffff;

    img.x = x;
    img.y = y;
    img.tint = color;
  });
}

function animate() {
  render();

  requestAnimationFrame(animate);
}

animate();

render();

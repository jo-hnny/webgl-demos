import * as PIXI from "pixi.js";
import middleImg from "./assets/4-hov.svg";
import highImg from "./assets/5-hov.svg";
import lowImg from "./assets/1-hov.svg";
import { randNumber, randText } from "@ngneat/falso";
import _ from "lodash";

function main() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight - 5;

  const app = new PIXI.Application({
    width: windowWidth,
    height: windowHeight,
  });

  // app.stage.pivot.set(0, 0);

  document.body.appendChild(app.view);

  const texture = PIXI.Texture.from(lowImg, { resourceOptions: { scale: 100 } });

  const sprite = new PIXI.Sprite(texture);

  sprite.width = 100;
  sprite.height = 100;

  sprite.anchor.set(0.5, 0.5);

  sprite.position.set(windowWidth / 2, windowHeight / 2);

  app.stage.addChild(sprite);

  function handleMouseWhell(e: WheelEvent) {
    console.log(e?.deltaY);

    let zoom = 1;

    if (e.deltaY > 0) {
      zoom = 1.1;
    }

    if (e?.deltaY < 0) {
      zoom = 0.9;
    }

    // app.stage.scale.set(app.stage.scale.x * zoom, app.stage.scale.y * zoom);

    sprite.scale.set(sprite.scale.x * zoom);

    console.log(sprite.width);

    // sprite.width *= zoom;
    // sprite.height *= zoom;
  }

  const throttleHandleMouseWhell = _.throttle(handleMouseWhell, 1000 / 30);

  app.view.addEventListener("wheel", (e: WheelEvent) => {
    throttleHandleMouseWhell(e);
  });
}

main();

// 缩放
// 1. 缩放container， 画布空白

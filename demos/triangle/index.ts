import { createProgramFromSource } from "../../utils";
import vertSource from "./index.vert";
import fragSource from "./index.frag";

class Triangle {
  readonly defaultPositionData = [
    { x: -0.5, y: -0.5 },
    { x: 0.5, y: -0.5 },
    { x: 0, y: 0.5 },
  ];

  xTranslateCount = 0;

  yTranslateCount = 0;

  rotate = 0;

  gl: WebGL2RenderingContext;

  constructor(shaderSource: { vertSource: string; fragSource: string }) {
    this.init(shaderSource);

    this.handleTranslateX();
    this.handleTranslateY();
    this.handleRotate();
  }

  init({ vertSource, fragSource }: { vertSource: string; fragSource: string }) {
    const canvas = document.querySelector("canvas");
    const gl = canvas.getContext("webgl2");

    const program = createProgramFromSource(gl, vertSource, fragSource);
    gl.useProgram(program);

    const a_Position = gl.getAttribLocation(program, "a_Position");

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl = gl;
  }

  handleTranslateX() {
    const xInput = document.querySelector<HTMLInputElement>("#xTranslate");
    xInput.addEventListener("input", (e: Event) => {
      const el = e.target as HTMLInputElement;
      const value = +el.value;

      this.xTranslateCount = value;

      this.draw();
    });
  }

  handleTranslateY() {
    const xInput = document.querySelector<HTMLInputElement>("#yTranslate");
    xInput.addEventListener("input", (e: Event) => {
      const el = e.target as HTMLInputElement;
      const value = +el.value;

      this.yTranslateCount = value;

      this.draw();
    });
  }

  handleRotate() {
    const rInput = document.querySelector<HTMLInputElement>("#rotate");
    rInput.addEventListener("input", (e: Event) => {
      const el = e.target as HTMLInputElement;
      const value = +el.value;

      this.rotate = value * (Math.PI / 180);

      this.draw();
    });
  }

  handleAnimateRotate() {
    this.rotate += 0.01;
    this.draw();
    requestAnimationFrame(() => {
      this.handleAnimateRotate();
    });
  }

  draw() {
    const finalData = this.defaultPositionData
      .map(({ x, y }) => ({
        x: x * Math.cos(this.rotate) - y * Math.sin(this.rotate),
        y: x * Math.sin(this.rotate) + y * Math.cos(this.rotate),
      }))
      .map(({ x, y }) => ({
        x: x + this.xTranslateCount,
        y: y + this.yTranslateCount,
      }))
      .reduce((all, { x, y }) => [...all, x, y], []);

    const gl = this.gl;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(finalData), gl.STATIC_DRAW);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}

const triangle = new Triangle({ vertSource, fragSource });

triangle.draw();

// triangle.handleAnimateRotate();

import { createProgramFromSource } from "../../utils";
import vertSource from "./index.vert";
import fragSource from "./index.frag";

function start() {
  const canvas = document.querySelector("canvas");
  const gl = canvas.getContext("webgl2");

  const program = createProgramFromSource(gl, vertSource, fragSource);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  const a_Position = gl.getAttribLocation(program, "a_Position");

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const points = [];

  canvas.addEventListener("click", (e) => {
    handleClick(e, points, gl);
  });
}

function handleClick(
  e: MouseEvent,
  points: number[],
  gl: WebGL2RenderingContext
) {
  const { clientX, clientY } = e;
  const canvas = e.target as HTMLCanvasElement;
  const { left, top } = canvas.getBoundingClientRect();

  const x = ((clientX - left) / canvas.width) * 2 - 1;
  const y = (((clientY - top) / canvas.height) * 2 - 1) * -1;

  points.push(x);
  points.push(y);

  const pointsLen = Math.floor(points.length / 2);

  console.log("points===>>>", points, pointsLen);

  const data = new Float32Array(points);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (pointsLen < 2) {
    gl.drawArrays(gl.POINTS, 0, pointsLen);
  } else {
    gl.drawArrays(gl.LINE_STRIP, 0, pointsLen);
  }
}

start();

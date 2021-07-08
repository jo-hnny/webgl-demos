import { createProgramFromSource } from "../../utils";
import vertSource from "./index.vert";
import fragSource from "./index.frag";

function start() {
  const canvas = document.querySelector("canvas");
  const gl = canvas.getContext("webgl2");

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const program = createProgramFromSource(gl, vertSource, fragSource);
  gl.useProgram(program);

  const a_Position = gl.getAttribLocation(program, "a_Position");
  const points = [];
  canvas.addEventListener("click", (e) => {
    handleClick(e, points, gl, a_Position);
  });
}

function handleClick(
  e: MouseEvent,
  points: { x: number; y: number }[],
  gl: WebGL2RenderingContext,
  a_Position: number
) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  const { clientX, clientY } = e;
  const canvas = e.target as HTMLCanvasElement;
  const { left, top } = canvas.getBoundingClientRect();

  const x = ((clientX - left) / canvas.width) * 2 - 1;
  const y = (((clientY - top) / canvas.height) * 2 - 1) * -1;

  points.push({ x, y });

  points.forEach(({ x, y }) => {
    gl.vertexAttrib3f(a_Position, x, y, 0.0);

    gl.drawArrays(gl.POINTS, 0, 1);
  });
}

start();

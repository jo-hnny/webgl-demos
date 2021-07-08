import { createProgramFromSource } from "../../utils";
import vertSource from "./index.vert";
import fragSource from "./index.frag";

function start() {
  const canvas = document.querySelector("canvas");
  canvas.width = 500;
  canvas.height = 500;
  const gl = canvas.getContext("webgl2");

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const program = createProgramFromSource(gl, vertSource, fragSource);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.useProgram(program);

  gl.drawArrays(gl.POINTS, 0, 1);
}

start();

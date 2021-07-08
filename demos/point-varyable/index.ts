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
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

  gl.drawArrays(gl.POINTS, 0, 1);
}

start();

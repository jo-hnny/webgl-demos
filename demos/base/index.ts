import verShaderSource from "./index.vert";
import fragShaderSource from "./index.frag";
import { createShader, createProgram } from "../../utils";

function init() {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas");

  canvas.setAttribute("width", "500");
  canvas.setAttribute("height", "500");

  const gl = canvas.getContext("webgl2");

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return gl;
}

function draw(gl: WebGL2RenderingContext) {
  const vertShader = createShader(gl, gl.VERTEX_SHADER, verShaderSource);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);
  const program = createProgram(gl, vertShader, fragShader);

  // 创建buffer并且绑定数据
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  //在着色器中查找属性的位置
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution"
  );

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.useProgram(program);

  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function start() {
  const gl = init();

  draw(gl);
}

start();

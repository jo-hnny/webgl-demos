import { createProgramFromSource } from "../../utils";
import vertSource from "./index.vert";
import fragSource from "./index.frag";

function start() {
  const canvas = document.querySelector("canvas");
  canvas.width = 500;
  canvas.height = 500;

  // 获取webgl上下文
  const gl = canvas.getContext("webgl2");

  //设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 用一对着色器创建webgl program
  const program = createProgramFromSource(gl, vertSource, fragSource);
  gl.useProgram(program);

  // 绘制点
  gl.drawArrays(gl.POINTS, 0, 1);
}

start();

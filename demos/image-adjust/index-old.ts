import { createProgramFromSource } from "../../utils";
import { defaultVertSource, defaultFragSource } from "./shaders/default";
import imageUrl from "./IMG_2095.JPG";

function render(image: HTMLImageElement) {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
  const gl = canvas.getContext("webgl2");
  const program = createProgramFromSource(
    gl,
    defaultVertSource,
    defaultFragSource
  );

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord");

  const imageLocation = gl.getUniformLocation(program, "u_image");

  // const vao = gl.createVertexArray();
  // gl.bindVertexArray(vao);

  const positionBuffer = gl.createBuffer();
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setRectangle(gl, 0, 0, image.width, image.height);

  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0]),
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(texCoordAttributeLocation);
  gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE0 + 0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(imageLocation, 0);

  gl.canvas.width = image.width;
  gl.canvas.height = image.height;
  canvas.style.width = image.width / 4 + "px";
  canvas.style.height = image.height / 4 + "px";

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(program);
  // gl.bindVertexArray(vao);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function setRectangle(gl, x, y, width, height) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0]),
    gl.STATIC_DRAW
  );
}

function main() {
  const img = new Image();
  img.onload = function () {
    render(img);
  };
  img.src = imageUrl;
}

main();

import { createProgramFromSource } from "../../utils";
import { defaultFragSource, defaultVertSource } from "./shaders/default";
import imageUrl from "./IMG_2095.JPG";

class ImageAdjust {
  gl: WebGL2RenderingContext;

  programs: { key: string; program: WebGLProgram }[] = [];

  defaultCanvasStyleWidth = 500;

  constructor(canvas: HTMLCanvasElement) {
    this.init(canvas);
  }

  setImage(image: HTMLImageElement) {
    this.initCanvas(image);

    this.draw(image);
  }

  init(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl2");
    gl.clearColor(0, 0, 0, 0);

    const defaultProgram = createProgramFromSource(
      gl,
      defaultVertSource,
      defaultFragSource
    );

    this.programs.push({ key: "default", program: defaultProgram });

    this.gl = gl;
  }

  draw(image: HTMLImageElement) {
    const gl = this.gl;
    const { program } = this.programs[0];

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    this.initTexCoord(program);
    this.initTexture(program, image);
    this.initPosition(program);

    gl.useProgram(program);
    gl.bindVertexArray(vao);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  initCanvas(image: HTMLImageElement) {
    const canvas = this.gl.canvas as HTMLCanvasElement;
    canvas.width = image.width;
    canvas.height = image.height;

    canvas.style.width = `${this.defaultCanvasStyleWidth}px`;
    canvas.style.height = `${
      (image.height / image.width) * this.defaultCanvasStyleWidth
    }px`;
  }

  initPosition(program: WebGLProgram) {
    const gl = this.gl;

    const data = new Float32Array([
      -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0,
    ]);

    const a_position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  }

  initTexCoord(program: WebGLProgram) {
    const gl = this.gl;

    const data = new Float32Array([
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
    ]);

    const a_texCoord = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(a_texCoord);
    gl.vertexAttribPointer(a_texCoord, 2, gl.FLOAT, false, 0, 0);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  }

  initTexture(program: WebGLProgram, image: HTMLImageElement) {
    const gl = this.gl;
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    const imageLocation = gl.getUniformLocation(program, "u_image");
    gl.uniform1i(imageLocation, 0);
  }
}

function main() {
  const canvas = document.querySelector("canvas");
  const adjustImage = new ImageAdjust(canvas);

  const img = new Image();
  img.onload = function () {
    adjustImage.setImage(img);
  };
  img.src = imageUrl;
}

main();

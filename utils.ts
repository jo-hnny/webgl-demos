export function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const isOk = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (isOk) return shader;

  console.log(
    `create ${type === gl.VERTEX_SHADER ? "vert" : "frag"} Shader failed:`,
    gl.getShaderInfoLog(shader)
  );
  gl.deleteShader(shader);
}

export function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  const isOk = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (isOk) return program;

  console.log("createProgram failed:", gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
}

export function createProgramFromSource(
  gl: WebGL2RenderingContext,
  vertSource: string,
  fragSource: string
) {
  const vertShader = createShader(gl, gl.VERTEX_SHADER, vertSource);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragSource);

  return createProgram(gl, vertShader, fragShader);
}

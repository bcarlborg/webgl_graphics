ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 v_fragmentColor;

  uniform float u_time;

  out vec4 outColor;

  void main() {
    outColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

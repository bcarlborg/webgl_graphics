ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;
  uniform vec4 u_color;
  in vec4 fragmentColor;

  out vec4 outColor;

  void main() {
    outColor = fragmentColor;
  }
`;

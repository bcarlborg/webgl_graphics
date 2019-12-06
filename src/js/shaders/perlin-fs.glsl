ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 v_fragmentColor;
  out vec4 outColor;

  void main() {
    outColor = v_fragmentColor;
  }
`;

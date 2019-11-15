ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;
  in vec4 v_fragmentColor;
  in vec3 v_position;

  out vec4 outColor;

  void main() {
    outColor = v_fragmentColor;
  }
`;

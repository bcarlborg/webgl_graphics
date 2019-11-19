ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;
  in vec4 fragmentColor;
  in vec4 v_position;

  uniform samplerCube u_skybox;

  out vec4 outColor;

  void main() {
    outColor = fragmentColor;
  }
`;

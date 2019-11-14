ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;

  in vec4 clipCoords;
  uniform sampler2D foo_texture;
  out vec4 outColor;

  void main() {
    outColor = vec4(clipCoords.xyz, 1.0);
  }
`;

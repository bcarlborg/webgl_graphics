ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;

  in vec2 v_texcoord;
  uniform sampler2D u_textureImage;
  out vec4 outColor;

  void main() {
    outColor = texture(u_textureImage, v_texcoord);
  }
`;

ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;

  in vec2 v_texcoord;
  in vec4 v_fragmentColor;


  uniform sampler2D u_textureImage;

  out vec4 outColor;

  void main() {
    outColor = v_fragmentColor;
  }
`;

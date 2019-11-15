ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;

  in vec2 v_texcoord;
  in vec4 v_homogeneous;

  uniform sampler2D u_textureImage;
  out vec4 outColor;

  void main() {
    outColor = texture(u_textureImage, v_homogeneous.xy / v_homogeneous.w);
  }
`;

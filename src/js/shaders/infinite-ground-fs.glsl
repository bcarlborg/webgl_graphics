ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;

  in vec4 v_homogeneous;
  in vec2 v_texcoord;

  uniform sampler2D foo_texture;
  out vec4 outColor;

  void main() {
    outColor = texture(foo_texture, v_homogeneous.xy / v_homogeneous.w);
  }
`;

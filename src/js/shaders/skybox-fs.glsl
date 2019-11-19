ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;
  in vec4 fragmentColor;
  in vec4 v_position;

  uniform mat4 u_viewDirectionProjectionInverse;
  uniform samplerCube u_skybox;

  out vec4 outColor;

  void main() {
    /* outColor = fragmentColor; */
    vec4 t = u_viewDirectionProjectionInverse * v_position;
    outColor = texture(u_skybox, normalize(t.xyz / t.w));
  }
`;

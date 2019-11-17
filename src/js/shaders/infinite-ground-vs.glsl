ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 a_position;
  in vec2 a_texcoord;
  in vec4 a_homogeneous;

  uniform mat4 u_viewMatrix;
  uniform mat4 u_projectionMatrix;

  out vec2 v_texcoord;
  out vec4 v_homogeneous;

  void main() {
    v_homogeneous = a_homogeneous;
    gl_Position = u_projectionMatrix * u_viewMatrix * a_position;
  }
`;

ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 a_position;
  in vec4 a_color;
  in vec4 a_homogeneous;

  uniform mat4 worldMatrix;
  uniform mat4 u_viewMatrix;
  uniform mat4 u_projectionMatrix;

  out vec4 v_homogeneous;
  out vec4 v_fragmentColor;

  void main() {
    v_homogeneous = a_homogeneous;
    v_fragmentColor = a_color;
    gl_Position = u_projectionMatrix * u_viewMatrix * worldMatrix * a_position;
  }
`;

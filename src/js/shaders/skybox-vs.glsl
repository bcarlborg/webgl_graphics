ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec3 a_position;
  in vec4 a_color;

  uniform mat4 worldMatrix;
  uniform mat4 u_viewMatrix;
  uniform mat4 u_projectionMatrix;

  out vec4 fragmentColor;

  void main() {
    fragmentColor = a_color;
    gl_Position = vec4(a_position.xy, .9999, 1.0);
  }
`;

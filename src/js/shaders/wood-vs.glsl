ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec3 a_position;
  in vec4 a_color;

  uniform mat4 worldMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;

  out vec3 v_position;
  out vec4 v_fragmentColor;

  void main() {
    v_fragmentColor = a_color;
    v_position = a_position;
    gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(a_position, 1.0);
  }
`;

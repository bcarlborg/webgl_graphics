ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec3 a_position;
  in vec2 a_texcoord;

  uniform mat4 worldMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;

  out vec2 v_texcoord;

  void main() {
    v_texcoord = a_texcoord;
    gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(a_position, 1.0);
  }
`;

ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec3 a_position;
  in vec4 a_homogeneous;

  uniform mat4 worldMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;

  out vec2 v_texcoord;
  out vec4 v_homogeneous;

  void main() {
    v_homogeneous = a_homogeneous;
    gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(a_position, 1.0);
  }
`;

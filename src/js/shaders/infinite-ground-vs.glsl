ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec3 position;
  in vec2 texcoord;

  uniform mat4 worldMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;

  out vec4 clipCoords;

  void main() {
    gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(position, 1.0);
  }
`;

ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec3 position;
  in vec4 vertColor;

  uniform mat4 worldMatrix;
  uniform mat4 mView;
  uniform mat4 mProj;

  out vec4 fragmentColor;

  void main() {
    fragmentColor = vertColor;
    gl_Position = worldMatrix * vec4(position, 1.0);
  }
`;

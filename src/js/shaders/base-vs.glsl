ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec3 position;
  in vec4 a_vertColor;

  out vec4 fragmentColor;

  void main() {
    fragmentColor = a_vertColor;
    gl_Position = vec4(position, 1.0);
  }
`;

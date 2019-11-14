ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 position;
  out vec4 v_position;

  void main() {
    v_position = position;
    gl_Position = position;
    gl_Position.z = .9999;
  }
`;

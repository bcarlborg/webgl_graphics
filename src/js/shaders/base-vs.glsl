ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  // an attribute is an input (in) to a vertex shader.
  // It will receive data from a buffer
  in vec4 a_position;

  // all shaders have a main function
  void main() {
    // Multiply the position by the matrix.
    gl_Position = a_position;
  }
`;

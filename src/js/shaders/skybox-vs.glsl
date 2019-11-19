ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 a_position;
  in vec4 a_color;

  out vec4 v_position;

  void main() {
    vec4 adjustedPosition = a_position;
    adjustedPosition.z = 0.9999;
    v_position = adjustedPosition;

    gl_Position = adjustedPosition;
  }
`;

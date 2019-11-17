ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;
  in vec4 v_fragmentColor;
  in vec3 v_position;

  uniform float u_time;

  out vec4 outColor;

  void main() {
    float timeColorValue = abs(sin(u_time / 5000.0));
    outColor = vec4(timeColorValue, timeColorValue, timeColorValue, 1.0);
  }
`;

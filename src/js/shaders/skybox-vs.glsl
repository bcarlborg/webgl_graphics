ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec3 a_position;
  in vec4 a_color;

  uniform mat4 worldMatrix;
  uniform mat4 u_viewMatrix;
  uniform mat4 u_projectionMatrix;

  out vec4 fragmentColor;
  out vec4 v_position;

  void main() {
    fragmentColor = a_color;

    vec4 adjustedPosition = vec4(a_position.xy, .9999, 1.0);
    v_position = adjustedPosition;

    gl_Position = adjustedPosition;
  }
`;

ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec3 a_position;
  in vec4 a_color;
  in vec3 a_bary_coords

  uniform mat4 u_worldMatrix;
  uniform mat4 u_viewMatrix;
  uniform mat4 u_projectionMatrix;

  out vec4 v_color;
  out vec3 v_a_bary_coords

  void main() {
    fragmentColor = color;
    gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(position, 1.0);
  }

`;

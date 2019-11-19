ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 a_position;
  in vec4 a_color;
  in vec3 a_normal;

  uniform mat4 worldMatrix;
  uniform mat4 u_viewMatrix;
  uniform mat4 u_projectionMatrix;

  out vec4 v_fragmentColor;
  out vec3 v_worldPosition;
  out vec3 v_worldNormal;

  void main() {
    v_fragmentColor = a_color;
    v_worldPosition = (worldMatrix * a_position).xyz;
    v_worldNormal = mat3(worldMatrix) * a_normal;
    gl_Position = u_projectionMatrix * u_viewMatrix * worldMatrix * a_position;
  }
`;

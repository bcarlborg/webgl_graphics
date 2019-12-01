ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 a_position;
  in vec4 a_color;
  in vec3 a_normal;

  uniform mat4 u_worldMatrix;

  uniform u_camera {
    mat4 u_viewMatrix;
    mat4 u_projectionMatrix;
    mat4 u_viewDirectionProjectionInverse;
    vec3 u_cameraPosition;
  } camera;


  out vec4 v_fragmentColor;
  out vec3 v_worldPosition;
  out vec3 v_worldNormal;

  void main() {
    v_fragmentColor = a_color;
    v_worldPosition = (u_worldMatrix * a_position).xyz;
    v_worldNormal = mat3(u_worldMatrix) * a_normal;
    gl_Position = camera.u_projectionMatrix * camera.u_viewMatrix * u_worldMatrix * a_position;
  }
`;

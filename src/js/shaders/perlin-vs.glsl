ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 a_position;
  in vec4 a_color;
  in vec4 a_homogeneous;


  struct cameraStruct {
    mat4 viewMatrix;
    mat4 projectionMatrix;
    mat4 viewDirectionProjectionInverse;
    vec3 cameraPosition;
  };
  uniform cameraStruct camera;

  uniform mat4 u_worldMatrix;

  out vec4 v_fragmentColor;
  out vec3 v_vertexPosition;

  void main() {
    v_fragmentColor = a_color;
    gl_Position = camera.projectionMatrix * camera.viewMatrix * u_worldMatrix * a_position;
    v_vertexPosition = gl_Position.xyz;
  }
`;

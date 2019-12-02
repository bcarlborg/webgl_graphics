ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 a_position;
  in vec2 a_texcoord;
  in vec4 a_homogeneous;

  struct u_camera {
    mat4 viewMatrix;
    mat4 projectionMatrix;
    mat4 viewDirectionProjectionInverse;
    vec3 cameraPosition;
  };
  uniform u_camera camera;

  uniform mat4 u_worldMatrix;

  out vec2 v_texcoord;
  out vec4 v_homogeneous;

  void main() {
    v_homogeneous = a_homogeneous;
    gl_Position = camera.projectionMatrix * camera.viewMatrix * u_worldMatrix * a_position;
  }
`;

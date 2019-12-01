ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 a_position;
  in vec3 a_normal;

  uniform u_camera {
    mat4 viewMatrix;
    mat4 projectionMatrix;
    mat4 viewDirectionProjectionInverse;
    vec3 cameraPosition;
  } camera;

  out vec4 v_rayDir;

  void main() {
    gl_Position = a_position;
    gl_Position.z = 0.99999;
    vec4 eyeDir = inverse(camera.projectionMatrix) * a_position;
    eyeDir = vec4(eyeDir.xy, -1.0, 0.0);
    v_rayDir = inverse(camera.viewMatrix) * eyeDir;
  }
`;

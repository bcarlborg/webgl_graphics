ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;
  in vec4 v_position;

  uniform u_camera {
    mat4 u_viewMatrix;
    mat4 u_projectionMatrix;
    mat4 u_viewDirectionProjectionInverse;
    vec3 u_cameraPosition;
  } camera;

  uniform samplerCube u_skybox;

  out vec4 outColor;

  void main() {
    vec4 t = camera.u_viewDirectionProjectionInverse * v_position;
    outColor = texture(u_skybox, normalize(t.xyz / t.w));
  }
`;

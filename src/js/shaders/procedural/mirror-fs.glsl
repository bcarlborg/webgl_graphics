ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec2 v_texcoord;
  in vec3 v_worldPosition;
  in vec3 v_worldNormal;
  in vec4 v_fragmentColor;

  uniform u_camera {
    mat4 u_viewMatrix;
    mat4 u_projectionMatrix;
    mat4 u_viewDirectionProjectionInverse;
    vec3 u_cameraPosition;
  } camera;

  uniform vec3 u_reverseLightDirection;
  uniform samplerCube u_skybox;

  out vec4 outColor;

  void main() {
    vec3 worldNormal = normalize(v_worldNormal);
    vec3 eyeToSurfaceDir = normalize(v_worldPosition - camera.u_cameraPosition);
    vec3 direction = reflect(eyeToSurfaceDir, worldNormal);

    outColor = texture(u_skybox, direction);

    float light = dot(worldNormal, u_reverseLightDirection);
    /* outColor.rgb *= light; */
    /* outColor = v_fragmentColor; */
  }
`;

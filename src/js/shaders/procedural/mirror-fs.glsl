ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;

  in vec2 v_texcoord;
  in vec3 v_worldPosition;
  in vec3 v_worldNormal;
  in vec4 v_fragmentColor;

  uniform samplerCube u_skybox;
  uniform vec3 u_cameraPosition;
  uniform vec3 u_reverseLightDirection;

  out vec4 outColor;

  void main() {
    vec3 worldNormal = normalize(v_worldNormal);
    vec3 eyeToSurfaceDir = normalize(v_worldPosition - u_cameraPosition);
    vec3 direction = reflect(eyeToSurfaceDir, worldNormal);

    outColor = texture(u_skybox, direction);

    float light = dot(worldNormal, u_reverseLightDirection);
    /* outColor.rgb *= light; */
    /* outColor = v_fragmentColor; */
  }
`;

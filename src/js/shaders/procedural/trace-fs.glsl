ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 v_rayDir;

  uniform u_camera {
    mat4 u_viewMatrix;
    mat4 u_projectionMatrix;
    mat4 u_viewDirectionProjectionInverse;
    vec3 u_cameraPosition;
  } camera;

  uniform samplerCube u_skybox;

  out vec4 fragmentColor;

  void main() {
    vec4 e = vec4(camera.u_cameraPosition, 1); //< ray origin
    vec4 d = vec4(normalize(v_rayDir).xyz, 0); //< ray direction

    // computing depth from world space hit coordinates 
    // vec4 ndcHit = hit * camera.viewProjMatrix;
    // gl_FragDepth = ndcHit.z / ndcHit.w * 0.5 + 0.5;

    // nothing hit by ray, return enviroment color
    fragmentColor = texture(u_skybox, d.xyz );
  }
`;

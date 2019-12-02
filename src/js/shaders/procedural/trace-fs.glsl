ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 v_rayDir;

  uniform clippedQuadrics {
    mat4 surface;
    mat4 clipper;
  } foo;

  uniform u_camera {
    mat4 viewMatrix;
    mat4 projectionMatrix;
    mat4 viewDirectionProjectionInverse;
    vec3 cameraPosition;
  } camera;


  uniform samplerCube u_skybox;

  out vec4 fragmentColor;

  float intersectClippedQuadric(mat4 a, mat4 B, vec4 e, vec4 d){
    float aCo = dot(d * a, d);
    float bCo = dot(d * a, e) + dot(e * a, d);
    float cCo = dot(e * a, e);
    float discrim = bCo * bCo - 4.0 * aCo * cCo;
    if(discrim < 0.0){
      return -1.0;
    } else {
      float sDis = sqrt(discrim);
      float t1 = (-1.0 * bCo + sDis) / (2.0 * aCo);
      float t2 = (-1.0 * bCo - sDis) / (2.0 * aCo);
      vec4 r1 = e + d * t1;
      vec4 r2 = e + d * t2;
      if(dot(r1*B,r1) > 0.0){
        t1 = -1.0;
      }
      if(dot(r2*B,r2) > 0.0){
        t2 = -1.0;
      }
      return (t1<0.0)?t2:((t2<0.0)?t1:min(t1, t2));
    }
  }

  void main(void) {
    vec4 e = vec4(camera.cameraPosition, 1); //< ray origin
    vec4 d = vec4(normalize(v_rayDir).xyz, 0); //< ray direction
    mat4 b = mat4(
      1,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,-4
    );
    mat4 a = mat4(
      0, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, -9
    );
    float bestT = intersectClippedQuadric(a,b,e,d);

    if(bestT > 0.0){
      vec4 hit = e + d * bestT;
      vec3 normal = normalize( (hit * a + a * hit).xyz);
      fragmentColor.rgb = normal;
      // computing depth from world space hit coordinates
      vec4 ndcHit = camera.projectionMatrix * camera.viewMatrix * hit;
      gl_FragDepth = ndcHit.z / ndcHit.w * 0.5 + 0.5;
    } else {
      // nothing hit by ray, return enviroment color
      fragmentColor = texture(u_skybox, d.xyz);
      gl_FragDepth = 0.9999999;
    }
  }
`;

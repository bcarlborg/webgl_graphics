ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 v_rayDir;

  struct u_clippedQuadrics {
    mat4 surface;
    mat4 clipper;
    vec3 color;
  };
  uniform u_clippedQuadrics clippedQuadrics[8];

  struct u_camera {
    mat4 viewMatrix;
    mat4 projectionMatrix;
    mat4 viewDirectionProjectionInverse;
    vec3 cameraPosition;
  };
  uniform u_camera camera;


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
      if (dot(r1*B,r1) > 0.0) {
        t1 = -1.0;
      }
      if (dot(r2*B,r2) > 0.0) {
        t2 = -1.0;
      }
      return (t1<0.0)?t2:((t2<0.0)?t1:min(t1, t2));
    }
  }

  bool findBestHit(vec4 rayOrigin, vec4 rayDirection, out int bestIndex, out float bestT){
    bestT = 100000.0;
    bestIndex = 0;

    for (int i = 0; i < 16; i++) {
      float t = intersectClippedQuadric(
        clippedQuadrics[i].surface, clippedQuadrics[i].clipper, rayOrigin, rayDirection
      );

      if (t > 0.0 && t < bestT) {
        bestT = t;
        bestIndex = i;
      }
    }

    return bestT != 100000.0;
  }

  void main(void) {
    vec4 rayOrigin = vec4(camera.cameraPosition, 1);
    vec4 rayDirection = vec4(normalize(v_rayDir).xyz, 0);

    // pointers to be set to the indices of coresponding quad
    float bestT = 0.0;
    int bestInd = 0;

    bool hasHit = findBestHit(rayOrigin, rayDirection, bestInd, bestT);

    if (hasHit) {
      vec4 hit = rayOrigin + rayDirection * bestT;
      vec3 normal = normalize( (hit * clippedQuadrics[bestInd].surface + clippedQuadrics[bestInd].surface * hit).xyz);
      fragmentColor.rgb = normal;

      // computing depth from world space hit coordinates
      vec4 ndcHit = camera.projectionMatrix * camera.viewMatrix * hit;
      gl_FragDepth = ndcHit.z / ndcHit.w * 0.5 + 0.5;
    } else {
      // nothing hit by ray, return enviroment color
      fragmentColor = texture(u_skybox, rayDirection.xyz);
      gl_FragDepth = 0.9999999;
    }
  }





`;

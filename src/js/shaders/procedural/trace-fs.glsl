ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  #define SSIZE 2
  #define MAX_RAYS 2;
  precision highp float;

  in vec4 v_rayDir;

  struct u_lights {
    vec4 reverseLightDirection;
  };
  uniform u_lights lights[8];

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

  float intersectClippedQuadric(mat4 surface, mat4 B, vec4 rayOrigin, vec4 rayDirection) {
    float aCo = dot(rayDirection * surface, rayDirection);
    float bCo = dot(rayDirection * surface, rayOrigin)
      + dot(rayOrigin * surface, rayDirection);
    float cCo = dot(rayOrigin * surface, rayOrigin);
    float discrim = bCo * bCo - 4.0 * aCo * cCo;

    if (discrim < 0.0) {
      return -1.0;
    } else {
      float sDis = sqrt(discrim);
      float t1 = (-1.0 * bCo + sDis) / (2.0 * aCo);
      float t2 = (-1.0 * bCo - sDis) / (2.0 * aCo);
      vec4 r1 = rayOrigin + rayDirection * t1;
      vec4 r2 = rayOrigin + rayDirection * t2;
      if (dot(r1*B,r1) > 0.0) {
        t1 = -1.0;
      }
      if (dot(r2*B,r2) > 0.0) {
        t2 = -1.0;
      }

      return (t1<0.0)?t2:((t2<0.0)?t1:min(t1, t2));
    }
  }

  bool findBestHit(vec4 rayOrigin, vec4 rayDirection, out int bestIndex, out float bestT) {
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
    vec4 rayOriginStack[2];  //< ray stack, origins
    vec4 rayDirectionStack[2];  //< ray stack, directions
    vec4 rayRGBStack[2]; //< ray stack, rgb: product of reflectances/transmittances, a: light path length

    int top = 0; //< index of element on top of stack

    rayOriginStack[0] = vec4(camera.cameraPosition.xyz, 1); //< ray origin
    rayDirectionStack[0] = vec4(normalize(v_rayDir.xyz), 0); //< ray direction
    rayRGBStack[0].rgb = vec3(1, 1, 1); //< product starts at 1
    rayRGBStack[0].a = 1.0; //< light path length is 1>>

    // t is essentially the distance from the ray to the surface it intersects
    // bestIndex is the index of the quadric
    float bestT = 0.0;
    int bestInd = 0;

    fragmentColor = vec4(0, 0, 0, 1);
    // this for loop will set bestT and bestIndex to be equal to the bounced ray
    for(int i=0; i<1; i++) {
      float bestT; int bestIndex;

      bool hasHit = findBestHit(rayOriginStack[top], rayDirectionStack[top], bestInd, bestT);
      if (hasHit) {
        vec4 hit = rayOriginStack[top] + rayDirectionStack[top] * bestT;
        vec3 normal = normalize( (hit * clippedQuadrics[bestInd].surface + clippedQuadrics[bestInd].surface * hit).xyz);
        vec4 normalShiftedHit = hit + vec4(normal.xyz, 0) * 0.1;

        int shadowIntersecInd;
        bool inShadow = findBestHit(normalShiftedHit, lights[0].reverseLightDirection, shadowIntersecInd, bestT);

        if (!inShadow) { fragmentColor.rgb = clippedQuadrics[bestInd].color; }

        // computing depth from world space hit coordinates
        vec4 ndcHit = camera.projectionMatrix * camera.viewMatrix * hit;
        gl_FragDepth = ndcHit.z / ndcHit.w * 0.5 + 0.5;


        // loop over the light sources, and you do the same shading code from the rasterization
        // we check to see if the light source is 
        /* fragmentColor.rgb += direct lighting; */
        top--;
        /* if (refractive) { */
        /*   top++; */
        /*   // What is this syntax? */
        /*   // what should refracted be? */
        /*   // this is essentia */
        /*   (rayOriginStack, rayDirectionStack, rayRGBStack)[top] = refracted; */
        /* } */
        /* if (reflective) { */
        /*   top++; */
        /*   // What is this syntax? */
        /*   (rayOriginStack, rayDirectionStack, rayRGBStack)[top] = reflected; */
        /* } */
      } else {
        fragmentColor = texture(u_skybox, rayDirectionStack[top].xyz);
        gl_FragDepth = 0.9999999;
        top--;
      }
      if(top < 0) break;
    }

    /* if (hasHit) { */
    /*   vec4 hit = rayOrigin + rayDirection * bestT; */
    /*   vec3 normal = normalize( (hit * clippedQuadrics[bestInd].surface + clippedQuadrics[bestInd].surface * hit).xyz); */
    /*   fragmentColor.rgb = clippedQuadrics[bestInd].color; */

    /*   // computing depth from world space hit coordinates */
    /*   vec4 ndcHit = camera.projectionMatrix * camera.viewMatrix * hit; */
    /*   gl_FragDepth = ndcHit.z / ndcHit.w * 0.5 + 0.5; */
    /* } else { */
    /*   // nothing hit by ray, return enviroment color */
    /*   fragmentColor = texture(u_skybox, rayDirection.xyz); */
    /*   gl_FragDepth = 0.9999999; */
    /* } */
  }





`;

ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 v_rayDir;

  struct u_lights {
    vec4 position;
    vec3 powerDensity;
  };
  uniform u_lights lights[3];

  struct u_clippedQuadrics {
    mat4 surface;
    mat4 clipper;
    vec3 color;
    float reflective;
    float freq;
    float noiseFreq;
    float noiseAmp;
    float noiseExp;
    bool wood;
  };
  uniform u_clippedQuadrics clippedQuadrics[16];


  struct u_camera {
    mat4 viewMatrix;
    mat4 projectionMatrix;
    mat4 viewDirectionProjectionInverse;
    vec3 cameraPosition;
  };
  uniform u_camera camera;


  uniform samplerCube u_skybox;

  out vec4 fragmentColor;

  vec3 shade( vec3 normal, vec3 lightDir, vec3 powerDensity, vec3 materialColor) {
    float cosa = clamp( dot(lightDir, normal),0.0,1.0);
    return powerDensity * materialColor * cosa;
  }

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

  float snoise(vec3 r) {
    vec3 s = vec3(7502, 22777, 4767);
    float f = 0.0;
    for(int i=0; i<16; i++) {
      f += sin( dot(s - vec3(32768, 32768, 32768), r) / 65536.0);
      s = mod(s, 32768.0) * 2.0 + floor(s / 32768.0);
    }
    return f / 32.0 + 0.5;
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
    for(int i=0; i<2; i++) {
      float bestT; int bestIndex;

      bool hasHit = findBestHit(rayOriginStack[top], rayDirectionStack[top], bestInd, bestT);
      if (hasHit) {
        vec4 hit = rayOriginStack[top] + rayDirectionStack[top] * bestT;
        vec3 normal = normalize( (hit * clippedQuadrics[bestInd].surface + clippedQuadrics[bestInd].surface * hit).xyz);
        vec4 normalShiftedHit = hit + vec4(normal.xyz, 0) * 0.1;

        // gather lighting
        for (int j = 0; j < 3; j++) {
          vec3 lightDiff = lights[j].position.xyz - hit.xyz / hit.w * lights[j].position.w;
          vec3 lightDir = normalize(lightDiff);
          float distanceSquared = dot(lightDiff, lightDiff);
          /* vec3 powerDensity = lights[j].powerDensity; */
          vec3 powerDensity = lights[j].powerDensity / distanceSquared;

          int shadowIntersectInd;
          float bestShadowT;
          bool shadowRayHitSomething = findBestHit(normalShiftedHit, lights[j].position, shadowIntersectInd, bestShadowT);

          if( !shadowRayHitSomething || bestShadowT * lights[j].position.w > sqrt(dot(lightDiff, lightDiff)) ) {
            vec3 color = clippedQuadrics[bestInd].color;
            if (clippedQuadrics[bestInd].wood) {
              float w = fract( hit.x * clippedQuadrics[bestInd].freq
                      + pow( snoise(hit.xyz * clippedQuadrics[bestInd].noiseFreq), clippedQuadrics[bestInd].noiseExp)
                      * clippedQuadrics[bestInd].noiseAmp
              );
              color = mix(vec3(0.1, 0.1, 0.1), vec3(1.0, 0.1, 0.1), w);
            }
            fragmentColor.rgb += shade(normal, lightDir, powerDensity, color);
          }
        }

        // check for reflective
        if (clippedQuadrics[bestInd].reflective > 0.0) {
          vec3 rayDir_in = rayDirectionStack[top].xyz;
          vec4 rayRGB_in = rayRGBStack[top];
          rayOriginStack[top] = hit;
          rayOriginStack[top].xyz += normal * 0.01;
          rayDirectionStack[top] = vec4(reflect(rayDir_in, normal), 0);
          rayRGBStack[top].rgb = rayRGB_in.rgb * vec3(1,1,1);
          rayRGBStack[top].a = rayRGB_in.a + 1.0;
          top++;
        }

        vec4 ndcHit = camera.projectionMatrix * camera.viewMatrix * hit;
        gl_FragDepth = ndcHit.z / ndcHit.w * 0.5 + 0.5;
        top--;

      } else {
        fragmentColor = texture(u_skybox, rayDirectionStack[top].xyz);
        gl_FragDepth = 0.9999999;
        top--;
      }
      if(top < 0) break;
    }
  }
`;

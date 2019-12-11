ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  #extension GL_OES_standard_derivatives : enable
  precision highp float;

  in vec4 v_fragmentColor;
  in vec3 v_vertexPosition;
  in vec3 v_barycentric;
  in vec3 v_normal;

  out vec4 outColor;

  float edgeFactor(){
    vec3 d = fwidth(v_barycentric);
    vec3 a3 = smoothstep(vec3(0.0), d*1.5, v_barycentric);
    return min(min(a3.x, a3.y), a3.z);
  }

  // for directional lights, light dir should be the opposite of the true direction of the light
  vec3 shade( vec3 normal, vec3 lightDir, vec3 powerDensity, vec3 materialColor) {
    float cosa = clamp( dot(lightDir, normal),0.0,1.0);
    return powerDensity * materialColor * cosa;
  }

  vec3 biom() {
    vec3 biomColor = vec3(0.0, 0.0, 0.0);
    float angleToUp = acos(dot( normalize(v_normal), vec3(0, 1, 0) ));
    angleToUp *= 57.2958;
    angleToUp = abs(angleToUp);


    // WATER
    float waterGate = 1.0;
    vec3 waterColor = vec3(0.3, 0.3, 1.0);
    waterGate *= step(v_vertexPosition.y, 0.5001);
    waterGate *= step(0.4009, v_vertexPosition.y);
    biomColor *= 1.0 - waterGate;
    biomColor += (waterGate * waterColor);


    // ROCK
    float rockGate = 1.0;
    vec3 rockColor = vec3(0.12, 0.10, 0.12);
    rockGate *= step(0.50001, v_vertexPosition.y);
    biomColor *= 1.0 - rockGate;
    biomColor += (rockGate * rockColor);


    // GREENERY
    float greeneryGate = 1.0;
    vec3 greeneryColor = vec3(0.2, 0.4, 0.1);
    greeneryGate *= step(0.50001, v_vertexPosition.y);
    greeneryGate *= step(v_vertexPosition.y, 5.50001);
    greeneryGate *= step(angleToUp, 89.0);
    biomColor *= 1.0 - greeneryGate;
    biomColor += (greeneryColor * greeneryGate);


    // SNOW
    float snowGate = 1.0;
    vec3 snowColor = vec3(0.8, 0.8, 0.8);
    snowGate *= step(8.0, v_vertexPosition.y);
    snowGate *= step(angleToUp, 89.8);
    biomColor *= 1.0 - snowGate;
    biomColor += (snowColor * snowGate);


    return biomColor;
  }

  vec3 lighting(vec3 materialColor) {
    vec3 light1Direction= vec3(1.0, 1.0, 1.0);
    vec3 light1PowerDensity = vec3(1.0, 1.0, 1.0);

    vec3 color = shade(v_normal, light1Direction, light1PowerDensity, materialColor);
    return color;
  }

  vec3 heightScaledSnow() {
    vec3 rockColor = vec3(0.1, 0.1, 0.1);
    float snowiness = v_vertexPosition.y / 2.0;
    rockColor *= snowiness;
    return rockColor;
  }

  void main() {
    outColor = vec4(0.0);

    float gridGate = 0.0;
    vec3 gridColor = mix(vec3(0.1), vec3(1.0), edgeFactor());
    outColor.rgb += gridColor * gridGate;

    float heightScaledGate = 1.0;
    vec3 heightScaledColor = heightScaledSnow();
    outColor.rbg += heightScaledColor * heightScaledGate;

    float normalsGate = 0.0;
    outColor.rgb += v_normal * normalsGate;

    float biomGate = 0.0;
    vec3 biomColor = biom();
    outColor.rgb += biomColor * biomGate;

    float lightingGate = 1.0;
    vec3 lightingColors = lighting(outColor.rgb);
    outColor.rgb += lightingColors * lightingGate;
  }
`;

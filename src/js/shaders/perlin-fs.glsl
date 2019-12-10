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

    vec3 waterColor = vec3(0.3, 0.3, 1.0);
    // if vertex v_vertexPosition < water height
    float waterGate = step(v_vertexPosition.y, 0.5001);
    waterGate *= step(0.4009, v_vertexPosition.y);
    biomColor += (waterGate * waterColor);

    vec3 rockColor = vec3(0.2, 0.1, 0.1);
    // if vertex v_vertexPosition < water height
    float rockGate = step(0.50001, v_vertexPosition.y);
    biomColor += (rockGate * rockColor);

    return biomColor;
  }

  void main() {
    /* outColor.rgb = mix(vec3(0.1), vec3(1.0), edgeFactor()); */
    /* outColor.rgb = v_normal; */

    outColor.rgb = biom();

    /* outColor.rgb = (0.2, 0.2, 0.2); */
    vec3 color = shade(v_normal, vec3(0.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec3(0.3, 0.3, 0.3));
    outColor.rgb += color;

  }
`;

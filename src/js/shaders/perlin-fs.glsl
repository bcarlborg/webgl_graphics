ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  #extension GL_OES_standard_derivatives : enable
  precision highp float;

  in vec4 v_fragmentColor;
  in vec3 v_vertexPosition;
  in vec3 v_barycentric;
  in float v_perlinOutSnow;

  out vec4 outColor;

  float edgeFactor(){
    vec3 d = fwidth(v_barycentric);
    vec3 a3 = smoothstep(vec3(0.0), d*1.5, v_barycentric);
    return min(min(a3.x, a3.y), a3.z);
  }

  void main() {
    /* outColor = v_fragmentColor; */
    // non transparent faces
    /* outColor.rgb = mix(vec3(0.1), vec3(1.0), edgeFactor()); */
    /* if ((fract(v_vertexPosition.x) < 0.04) || (fract(v_vertexPosition.z) < 0.04)) { */
    /*   outColor.rgb = vec3(1.0); */
    /* } else { */
    /*   outColor.rgb = vec3(0.4, 0.3, 0.9); */
    /* } */
    // transparent faces
    float adjustedPerlin = v_perlinOutSnow / 40.0;
    if (adjustedPerlin > 0.8) {
      outColor.rgb = vec3(adjustedPerlin);
      outColor.rgb += vec3(0.0, 0.0, 0.19);
    } else {
      outColor.rgb = vec3(0.2, 0.2, 0.2);
    }

  }
`;

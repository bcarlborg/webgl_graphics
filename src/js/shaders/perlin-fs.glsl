ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  #extension GL_OES_standard_derivatives : enable
  precision highp float;

  in vec4 v_fragmentColor;
  in vec3 v_vertexPosition;
  in vec3 v_barycentric;
  in vec3 v_vertexNormal;
  in float v_perlinOutAlitude;
  in float v_perlinOut1;

  out vec4 outColor;

  float edgeFactor(){
    vec3 d = fwidth(v_barycentric);
    vec3 a3 = smoothstep(vec3(0.0), d*1.5, v_barycentric);
    return min(min(a3.x, a3.y), a3.z);
  }

  vec3 biom(float altitude, float snow) {
    float divisor = 100.0;
    vec3 color = vec3(0.0);

    // should be more or less between 0 and 1;
    float adjustedPerlinAltitude = altitude / divisor; 
    // use this to determine what the best divisor
    // is for the perlin Out value
    /* color = vec3(adjustedPerlinAltitude); */

    float adjustedPerlinSnow = snow / (50.0 * divisor);
    color = vec3(pow(adjustedPerlinAltitude, 0.3));
    color -= adjustedPerlinSnow;

    return color;
  }

  void main() {
    outColor.rgb = mix(vec3(0.1), vec3(1.0), edgeFactor());
    /* outColor.rgb = biom(v_perlinOutAlitude, v_perlinOut1); */
  }
`;

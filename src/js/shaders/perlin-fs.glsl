ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  #extension GL_OES_standard_derivatives : enable
  precision highp float;

  in vec4 v_fragmentColor;
  in vec3 v_vertexPosition;
  in vec3 v_barycentric;
  in float v_perlinOutSnow;
  in float v_perlinOutRock;

  out vec4 outColor;

  float edgeFactor(){
    vec3 d = fwidth(v_barycentric);
    vec3 a3 = smoothstep(vec3(0.0), d*1.5, v_barycentric);
    return min(min(a3.x, a3.y), a3.z);
  }

  void main() {
    outColor.rgb = mix(vec3(0.1), vec3(1.0), edgeFactor());

    /* float adjustedPerlinRock = v_perlinOutRock / 80.0; */
    /* outColor.rgb = vec3(adjustedPerlinRock); */

    /* float adjustedPerlinSnow = v_perlinOutSnow / 40.0; */
    /* if (adjustedPerlinSnow > 0.8) { */
    /*   outColor.rgb = vec3(adjustedPerlinSnow); */
    /*   outColor.rgb += vec3(0.0, 0.0, 0.19); */
    /* } */
  }
`;

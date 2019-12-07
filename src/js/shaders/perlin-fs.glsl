ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 v_fragmentColor;
  in vec3 v_vertexPosition;
  in vec2 v_barycentric;

  out vec4 outColor;

  void main() {
    /* vec2 st = vec2(v_vertexPosition.x, v_vertexPosition.z); */
    /* float perlinOut = fbm(st*3.0); */
    /* outColor = vec4(perlinOut, perlinOut, perlinOut, 1.0); */
    outColor = v_fragmentColor;
  }
`;

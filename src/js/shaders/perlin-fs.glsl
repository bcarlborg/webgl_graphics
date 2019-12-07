ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 v_fragmentColor;
  in vec3 v_vertexPosition;
  in vec3 v_barycentric;

  out vec4 outColor;

  void main() {
    /* outColor = v_fragmentColor; */
    if( any(lessThan(v_barycentric, vec3(0.02))) ) {
      outColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
    else {
      outColor = vec4(0.5, 0.5, 0.5, 1.0);
    }
  }
`;

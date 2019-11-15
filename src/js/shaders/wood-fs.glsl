ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;
  in vec4 v_fragmentColor;
  in vec3 v_position;

  uniform vec3 u_lightWoodColor;
  uniform vec3 u_darkWoodColor;

  out vec4 outColor;

  void main() {

    float w = fract( sin(v_position.z) * cos(v_position.y) * (v_position.x * 6.0 + v_position.y * 6.0));
    vec3 color = mix( u_lightWoodColor, u_darkWoodColor, w);
    outColor = vec4(color.xyz, 1);
  }
`;

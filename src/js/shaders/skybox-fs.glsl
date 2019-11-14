ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision mediump float;

  uniform samplerCube skyboxTexture;
  uniform mat4 viewDirectionProjectionMatrix;

  in vec4 v_position;

  // we need to declare an output for the fragment shader
  out vec4 outColor;

  void main() {
    vec4 t = viewDirectionProjectionMatrix * v_position;
    outColor = texture(skyboxTexture, t.xyz);
  }
`;

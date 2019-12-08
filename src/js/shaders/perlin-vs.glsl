ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 a_position;
  in vec4 a_color;
  in vec4 a_homogeneous;
  in vec3 a_barycentric;


  struct cameraStruct {
    mat4 viewMatrix;
    mat4 projectionMatrix;
    mat4 viewDirectionProjectionInverse;
    vec3 cameraPosition;
  };
  uniform cameraStruct camera;

  uniform float time;

  uniform mat4 u_worldMatrix;

  out vec4 v_fragmentColor;
  out vec3 v_vertexPosition;
  out vec3 v_barycentric;

  float rand(vec2 c){
    return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
  }

  float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
  }

  float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    int octaves = 4;
    // Loop of octaves
    for (int i = 0; i < octaves; i++) {
      value += amplitude * noise(st);
      st *= 0.6;
      amplitude *= 4.3;
    }
    return value;
  }


  void main() {
    v_barycentric = a_barycentric;
    v_vertexPosition = a_position.xyz;

    vec2 st = vec2(v_vertexPosition.x, v_vertexPosition.z - time * 0.003);
    float perlinOut = fbm(st);

    v_fragmentColor = a_color;
    gl_Position = camera.projectionMatrix * camera.viewMatrix * u_worldMatrix * a_position;
    gl_Position.y += perlinOut * 10.0;
  }
`;

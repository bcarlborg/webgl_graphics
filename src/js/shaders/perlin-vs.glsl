ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 a_position;
  in vec3 a_normal;
  in vec4 a_color;
  in vec4 a_homogeneous;
  in vec3 a_barycentric;


  struct cameraStruct {
    mat4 viewMatrix;
    mat4 viewMatrixWithoutPosition;
    mat4 projectionMatrix;
    mat4 viewDirectionProjectionInverse;
    vec3 cameraPosition;
  };
  uniform cameraStruct camera;

  uniform float time;
  uniform float perlinOffsetZ;
  uniform float perlinOffsetX;
  uniform vec3 cameraPosition;

  uniform mat4 u_worldMatrix;

  out vec4 v_fragmentColor;
  out vec3 v_vertexPosition;
  out vec3 v_barycentric;
  out float v_perlinOutSnow;
  out float v_perlinOutRock;

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

  float fbm (in vec2 st, float amplitude, float frequency, float ruggedness) {
    // Initial values
    float value = 0.0;
    int octaves = 4;
    // Loop of octaves
    for (int i = 0; i < octaves; i++) {
      value += amplitude * noise(frequency * st);
      frequency *= ruggedness;
      // st *= 0.6;
      /* st.y *= 0.71; */
      /* st.x *= 0.6; */
      amplitude *= 0.5;
    }
    return pow(value, 3.8);
  }

  void main() {
    v_barycentric = a_barycentric;
    v_vertexPosition = a_position.xyz;

    v_vertexPosition -= cameraPosition;
    v_vertexPosition.z += perlinOffsetZ;
    v_vertexPosition.x += perlinOffsetX;

    vec2 altitudeInput = vec2(v_vertexPosition.x, v_vertexPosition.z);

    float amplitude = 2.0;
    float frequency = 0.05;
    float ruggedness = 2.5;

    float perlinOut = fbm(altitudeInput, amplitude, frequency, ruggedness)
      + 0.5 * fbm(vec2(altitudeInput.x * 2.0, altitudeInput.y * 2.0), amplitude, frequency, ruggedness)
      + 0.25 * fbm(vec2(altitudeInput.x * 4.0, altitudeInput.y * 4.0), amplitude, frequency, ruggedness);
      + 0.125 * fbm(vec2(altitudeInput.x * 8.0, altitudeInput.y * 8.0), amplitude, frequency, ruggedness);
      + 0.0625 * fbm(vec2(altitudeInput.x * 16.0, altitudeInput.y * 16.0), amplitude, frequency, ruggedness);

    float perlinOutSnow = fbm(altitudeInput, 0.5, 0.1, 1.5);
    v_perlinOutSnow = perlinOutSnow;

    float perlinRock = fbm(altitudeInput, 0.5, 0.1, 2.9);
    v_perlinOutRock = perlinRock;

    v_fragmentColor = a_color;

    gl_Position = camera.projectionMatrix * camera.viewMatrixWithoutPosition * u_worldMatrix * a_position;
    gl_Position.y += perlinOut * 10.0;

  }
`;

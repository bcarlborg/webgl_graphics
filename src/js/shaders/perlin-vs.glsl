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

  out vec3 v_vertexNormal;
  out vec4 v_fragmentColor;
  out vec3 v_vertexPosition;
  out vec3 v_barycentric;
  out float v_perlinOutAlitude;
  out float v_perlinOut1;

  float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
  }

  vec2 hash( in vec2 x ) {
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
  }


  vec3 noised( in vec2 p )
  {
    vec2 i = floor( p );
    vec2 f = fract( p );

    vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
    vec2 du = 30.0*f*f*(f*(f-2.0)+1.0);

    vec2 ga = hash( i + vec2(0.0,0.0) );
    vec2 gb = hash( i + vec2(1.0,0.0) );
    vec2 gc = hash( i + vec2(0.0,1.0) );
    vec2 gd = hash( i + vec2(1.0,1.0) );
    float va = dot( ga, f - vec2(0.0,0.0) );
    float vb = dot( gb, f - vec2(1.0,0.0) );
    float vc = dot( gc, f - vec2(0.0,1.0) );
    float vd = dot( gd, f - vec2(1.0,1.0) );

    return vec3( va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*(va-vb-vc+vd),   // value
       ga + u.x*(gb-ga) + u.y*(gc-ga) + u.x*u.y*(ga-gb-gc+gd) +  // derivatives
       du * (u.yx*(va-vb-vc+vd) + vec2(vb,vc) - va));
  }

  /* float noise (in vec2 st) { */
  /*   vec2 i = floor(st); */
  /*   vec2 f = fract(st); */

  /*   // Four corners in 2D of a tile */
  /*   float a = random(i); */
  /*   float b = random(i + vec2(1.0, 0.0)); */
  /*   float c = random(i + vec2(0.0, 1.0)); */
  /*   float d = random(i + vec2(1.0, 1.0)); */

  /*   vec2 u = f * f * (3.0 - 2.0 * f); */

  /*   return mix(a, b, u.x) + */
  /*             (c - a)* u.y * (1.0 - u.x) + */
  /*             (d - b) * u.x * u.y; */
  /* } */

  float fbm (in vec2 st, float amplitude, float frequency, float ruggedness) {
    // Initial values
    float value = 0.0;
    int octaves = 4;
    // Loop of octaves
    for (int i = 0; i < octaves; i++) {
      vec3 noiseVal = noised(frequency * st);
      value += amplitude * noiseVal.x;
      frequency *= ruggedness;
      // st *= 0.6;
      /* st.y *= 0.71; */
      /* st.x *= 0.6; */
      amplitude *= 0.5;
    }
    return pow(value, 2.3);
  }

  void main() {
    v_barycentric = a_barycentric;
    v_vertexPosition = a_position.xyz;
    v_fragmentColor = a_color;
    v_vertexNormal = a_normal;

    v_vertexPosition -= cameraPosition;
    v_vertexPosition.z += perlinOffsetZ;
    v_vertexPosition.x += perlinOffsetX;

    vec2 altitudeInput = vec2(v_vertexPosition.x, v_vertexPosition.z);

    float amplitude = 12.0;
    float frequency = 0.015;
    float ruggedness = 1.7;

    float perlinOut = fbm(altitudeInput, amplitude, frequency, ruggedness)
      + 0.5 * fbm(vec2(altitudeInput.x * 2.0, altitudeInput.y * 2.0), amplitude, frequency, ruggedness)
      + 0.25 * fbm(vec2(altitudeInput.x * 4.0, altitudeInput.y * 4.0), amplitude, frequency, ruggedness)
      + 0.125 * fbm(vec2(altitudeInput.x * 8.0, altitudeInput.y * 8.0), amplitude, frequency, ruggedness);
      + 0.0625 * fbm(vec2(altitudeInput.x * 16.0, altitudeInput.y * 16.0), amplitude, frequency, ruggedness);

    perlinOut = max(perlinOut, 8.0);

    v_perlinOutAlitude = perlinOut;

    amplitude = 1.6;
    frequency = 0.55;
    ruggedness = 1.0;

    float perlinOut1 = fbm(altitudeInput, amplitude, frequency, ruggedness);

    v_perlinOut1 = perlinOut1;

    gl_Position = camera.projectionMatrix * camera.viewMatrixWithoutPosition * u_worldMatrix * a_position;
    gl_Position.y += perlinOut * 10.0;

  }
`;

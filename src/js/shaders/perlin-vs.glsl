ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  in vec4 a_position;
  in vec3 a_normal;
  in vec4 a_color;
  in vec4 a_homogeneous;
  in vec3 a_barycentric;


  struct cameraStruct {
    mat4 viewMatrix;
    mat4 viewMatrixWithY;
    mat4 projectionMatrix;
    mat4 viewDirectionProjectionInverse;
    vec3 cameraPosition;
  };
  uniform cameraStruct camera;

  uniform float time;
  uniform float perlinOffsetZ;
  uniform float perlinOffsetX;

  uniform mat4 u_worldMatrix;

  out vec3 v_normal;
  out vec4 v_fragmentColor;
  out vec3 v_vertexPosition;
  out vec3 v_barycentric;

  vec2 random (in vec2 st) {
    float x = fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
    float y = fract(sin(dot(st.xy, vec2(98.9898,-65.233)))* 399958.843483);
    return vec2(x, y);
  }

  vec2 hash( in vec2 x ) {
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
  }

  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
  }

  // https://github.com/ashima/webgl-noise/blob/master/src/noise2D.glsl
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    // First corner
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);

    // Other corners
    vec2 i1;
    //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
    //i1.y = 1.0 - i1.x;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    // x0 = x0 - 0.0 + 0.0 * C.xx ;
    // x1 = x0 - i1 + 1.0 * C.xx ;
    // x2 = x0 - 1.0 + 2.0 * C.xx ;
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    // Permutations
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;

    // Gradients: 41 points uniformly over a line, mapped onto a diamond.
    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt( a0*a0 + h*h );
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

    // Compute final noise value at P
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float noiseModifier(in vec2 st, float amplitude, float frequency, float ruggedness) {
    float noise;

    // generate hills using multiple looped noise calls
    int octaves = 3;
    float octavesf = 3.0 + 1.0;
    for (int i = 0; i < octaves; i++) {
      noise += 0.5 * snoise(2.0 * frequency * st);
      noise += 0.25 * snoise(4.0 * frequency * st);
      noise += 0.1225 * snoise(8.0 * frequency * st);
      frequency *= ruggedness;
    }
    noise += 0.052 * snoise(16.0 * frequency * st);

    noise = pow(noise, 1.8);
    noise *= (1.0 / octavesf);
    noise = amplitude * noise;

    /* // adding some high frequency very quite noise ontop of the noise */
    /* // in order to create a more rocky aesthetic */
    float rockyHeightPercent = 0.01;
    /* noise += amplitude * rockyHeightPercent * snoise(10.0 * st) - rockyHeightPercent * 0.5; */
    noise += amplitude * rockyHeightPercent * snoise(10.0 * st);

    return noise;

  }

  void main() {
    v_vertexPosition = a_position.xyz;
    v_barycentric = a_barycentric;
    v_fragmentColor = a_color;
    v_normal = a_normal;

    v_vertexPosition -= camera.cameraPosition;
    v_vertexPosition *= 0.01;
    v_vertexPosition.z += perlinOffsetZ;
    v_vertexPosition.x += perlinOffsetX;

    vec2 altitudeInput = vec2(v_vertexPosition.x, v_vertexPosition.z);

    float amplitude = 100.0;
    float frequency = 0.4;
    float ruggedness = 1.5;

    float perlinOut = noiseModifier(altitudeInput, amplitude, frequency, ruggedness);

    gl_Position = camera.projectionMatrix * camera.viewMatrixWithY * u_worldMatrix * a_position;
    gl_Position.y += perlinOut;

  }
`;

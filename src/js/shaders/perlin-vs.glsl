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
  out float v_snowNoise;
  out float v_waterNoise;
  out float v_rockNoise;


  // ==========================================================================
  // ==========================================================================

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

  float mountains(in vec2 st, float amplitude, float frequency, float ruggedness) {
    float noise;

    // boring noise
    float boringGate = 0.0;
    float boringNoise = 0.2 * snoise(4.0 * st);
    noise += boringNoise * boringGate;

    // Use octaved noise to generate more rugged mountains
    // fractals yay
    int octavesGate = 1;
    int octaves = 1;
    octaves = 2;
    octaves = 3;

    octaves *= octavesGate;
    float octavesf = float(octaves) + 1.0;
    for (int i = 0; i < octaves; i++) {
      noise += 0.5 * snoise(2.0 * frequency * st);
      noise += 0.25 * snoise(4.0 * frequency * st);
      noise += 0.1225 * snoise(8.0 * frequency * st);
      frequency *= ruggedness;
    }

    // Sprinkle in some special sauce ;^)
    float secretSauceGate = 1.0;
    float secretSauce = 0.052 * snoise(16.0 * frequency * st);
    noise += secretSauce * secretSauceGate;

    // use exponent to make mountains steeper
    float exponentGate = 1.0;
    float inverseExponentGate = 1.0 - exponentGate;
    float exponentNoise = pow(noise, 1.2);
    noise += exponentNoise * exponentGate;
    noise = exponentNoise * exponentGate + noise * inverseExponentGate;

    // scale noise back down before applying amplitude
    noise *= (1.0 / octavesf);
    noise = amplitude * noise;

    // adding some very high frequency noise with a small amplitude
    // ontop of the noise in order to create a more rocky aesthetic
    float extraRockyGate = 1.0;
    float rockyHeightPercent = 0.0015;
    float extraRockNoise = amplitude * rockyHeightPercent * snoise(110.0 * st) - rockyHeightPercent * 0.5;
    noise += extraRockNoise * extraRockyGate;

    // use a min height to create a space for the water
    float waterHeightGate = 1.0;
    float inverseWaterHeightGate = 1.0 - waterHeightGate;
    float waterHeightNoise = max(0.5, noise);
    noise = waterHeightNoise * waterHeightGate + noise * inverseWaterHeightGate;

    return noise;
  }

  vec3 mountainNormal(in vec2 st, float stHeight, float amplitude, float frequency, float ruggedness) {
    // delta offset for normal sampling
    float delta = 0.005;
    vec3 currentPoint = vec3(st.x, stHeight, st.y);

    // calculate vertices of the offset points
    vec2 xOffsetLoc = st + vec2(delta, 0.0);
    vec2 yOffsetLoc = st + vec2(0.0, delta);
    float xOffsetHeight = mountains(xOffsetLoc, amplitude, frequency, ruggedness);
    float yOffsetHeight = mountains(yOffsetLoc, amplitude, frequency, ruggedness);
    vec3 xOffset = vec3(xOffsetLoc.x, xOffsetHeight, xOffsetLoc.y);
    vec3 yOffset = vec3(yOffsetLoc.x, yOffsetHeight, yOffsetLoc.y);

    // use the offset points to approximate normals
    vec3 modelXGrad = xOffset - currentPoint;
    vec3 modelYGrad = yOffset - currentPoint;
    vec3 normal = normalize(cross(modelXGrad, modelYGrad));
    normal *= -1.0;

    return normal;
  }

  // used to make the snowline look less harsh
  float snowNoise(vec2 st) {
    float noise = snoise(200.0 * st);
    /* noise = pow(noise, 1.1); */
    noise *= 3.0;
    return noise;
  }

  // used to make the water look less like a painted on piece of junk
  float waterNoise(vec2 st) {
    float noise = snoise(100.0 * st);
    /* noise = pow(noise, 1.1); */
    /* noise *= 3.0; */
    return noise;
  }

  // used to make the water look less like a painted on piece of junk
  float rockNoise(vec2 st) {
    float amplitude = 100.0;
    float noise = snoise(10.0 * st);
    /* noise = pow(noise, 1.1); */
    /* noise *= 3.0; */
    return noise;
  }

  void main() {
    v_vertexPosition = a_position.xyz;
    v_fragmentColor = a_color;
    v_barycentric = a_barycentric;

    // move noise inputs to camera location
    v_vertexPosition -= camera.cameraPosition;

    // scale noise inputs for sanity
    v_vertexPosition *= 0.01;

    // translate to a random location for maximum fun on refresh
    v_vertexPosition.z += perlinOffsetZ;
    v_vertexPosition.x += perlinOffsetX;

    // MOUNTAINS
    float amplitude = 100.0;
    float frequency = 0.4;
    float ruggedness = 1.5;

    vec2 altitudeInput = vec2(v_vertexPosition.x, v_vertexPosition.z);
    float mountainHeight = mountains(altitudeInput, amplitude, frequency, ruggedness);
    v_vertexPosition.y = mountainHeight;

    v_snowNoise = snowNoise(altitudeInput);
    v_waterNoise = waterNoise(altitudeInput);
    v_rockNoise = rockNoise(altitudeInput);

    // Add normals
    v_normal = mountainNormal(altitudeInput, mountainHeight, amplitude, frequency, ruggedness);

    gl_Position = camera.projectionMatrix * camera.viewMatrixWithY * u_worldMatrix * a_position;
    gl_Position.y += mountainHeight;
  }
`;

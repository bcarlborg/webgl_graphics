ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
in vec3 position;
in vec2 texcoord;

uniform mat4 worldMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

out vec2 v_texcoord;

void main() {
  v_texcoord = texcoord;
  gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(position, 1.0);
}
`

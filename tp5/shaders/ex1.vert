#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;
uniform mat4 uPMatrix;

uniform float offset;
varying vec4 coords;

void main() {
    vec4 vertex = vec4(aVertexPosition, 1.0);
    vertex.x += offset;
    gl_Position = uPMatrix * uMVMatrix * vertex;
    coords = gl_Position;
}
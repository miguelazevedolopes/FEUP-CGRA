#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;


void main() {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x + abs(sin((aVertexPosition.x - 1.0) * timeFactor / 5.0)) / 2.0, aVertexPosition.y, aVertexPosition.z + sin((aVertexPosition.x - 1.0) * timeFactor / 5.0), 1.0); 
    //-1.0 because the vertex of the fin sticking to the body is initially 1.0 away from origin
    //The offset applied in Z gives motion to the fin, the offset applied in X is meant to make the movement circular and nullify the stretching made on the triangle
}
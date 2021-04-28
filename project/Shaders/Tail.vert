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
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x - abs(sin((aVertexPosition.x + aVertexPosition.y + 2.0) * timeFactor / 2.0)) / 4.0, 
     aVertexPosition.y - abs(sin((aVertexPosition.x + aVertexPosition.y + 2.0) * timeFactor / 2.0)) / 4.0,
      aVertexPosition.z + sin((aVertexPosition.x + aVertexPosition.y + 2.0) * timeFactor / 2.0), 1.0); 
    //+2.0 because that's the sum of the distances of the vertices opposite to the fish's body to the origin (initially)
    //The offset applied in Z gives motion to the fin, the offsets applied in X and Y are meant to make the movement circular and nullify the stretching made on the triangle
}
#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSamplerDistortion;
uniform sampler2D uSamplerPier;
uniform float timeFactor;

varying vec2 vTextureCoord;
varying vec2 offset;


void main() {

    vec4 map = texture2D(uSamplerDistortion, aTextureCoord);
    offset = vec2(map.r - 0.5, map.g - 0.5) / 1.6 + vec2(timeFactor, timeFactor) / 850.0 ;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	vTextureCoord = aTextureCoord;
}

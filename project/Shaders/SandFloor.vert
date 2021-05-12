#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSamplerSandMap;	

varying vec2 vTextureCoord;
varying float verticalOffset;


void main() {
	vec4 map = texture2D(uSamplerSandMap, aTextureCoord);
    verticalOffset = 1.0/(map.r+map.g+map.b);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x, - verticalOffset * 2.0 + 1.28, aVertexPosition.z,1.0);

	vTextureCoord = aTextureCoord;
}

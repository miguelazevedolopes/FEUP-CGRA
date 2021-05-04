attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying float verticalOffset;
uniform sampler2D uSamplerSandMap;	


void main() {
	vec4 map = texture2D(uSamplerSandMap, aTextureCoord);
    verticalOffset = 1.0/(map.r+map.g+map.b);
	gl_Position = uPMatrix * uMVMatrix * vec4(vec3(aVertexPosition.x,1.0 - verticalOffset * 2.0, aVertexPosition.z),1.0);

	vTextureCoord = aTextureCoord;
}

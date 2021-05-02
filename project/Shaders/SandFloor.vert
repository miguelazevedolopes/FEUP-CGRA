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
    verticalOffset = map.b/3.0;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xy, aVertexPosition.z + verticalOffset, 1.0);

	vTextureCoord = aTextureCoord;
}

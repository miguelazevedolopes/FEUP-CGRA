attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying float verticalOffset;
uniform sampler2D uSamplerRock;	


void main() {
	vec4 map = texture2D(uSamplerRock, aTextureCoord);
    verticalOffset = map.b/4.0;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xy+verticalOffset, aVertexPosition.z + verticalOffset, 1.0 + verticalOffset);

	vTextureCoord = aTextureCoord;
}

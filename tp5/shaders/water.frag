#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSamplerWater;


void main() {
	vec4 color = texture2D(uSamplerWater, vTextureCoord);

	
	gl_FragColor = color;
}
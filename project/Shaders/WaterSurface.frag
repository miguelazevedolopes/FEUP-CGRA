#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 offset;

uniform sampler2D uSamplerPier;

void main() {
	gl_FragColor = texture2D(uSamplerPier, vTextureCoord + offset);
}
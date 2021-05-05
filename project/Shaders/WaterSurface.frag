#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 offset;

uniform sampler2D uSamplerPier;

void main() {
	vec2 newTextureCoord = vTextureCoord + offset;
	if (newTextureCoord.s > 1.0)
		newTextureCoord.s = 0.99;
	if (newTextureCoord.t > 1.0)
		newTextureCoord.t = 0.99;
	if (newTextureCoord.s < 0.0)
		newTextureCoord.s = 0.01;
	if (newTextureCoord.t < 0.0)
		newTextureCoord.t = 0.01;
	gl_FragColor = texture2D(uSamplerPier, newTextureCoord);
}
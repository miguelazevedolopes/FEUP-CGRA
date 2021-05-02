#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSamplerSand;
uniform sampler2D uSamplerSandMap;
varying float verticalOffset;

void main() {
	vec4 color = texture2D(uSamplerSand, vTextureCoord);
	if (verticalOffset < 0.05)
        color.rgb /= 1.05 + verticalOffset * (1.0 - verticalOffset) * 6.5;
	gl_FragColor = color;
}
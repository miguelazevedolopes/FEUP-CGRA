#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSamplerSand;
uniform sampler2D uSamplerSandMap;
varying float verticalOffset;

void main() {
	vec4 color = texture2D(uSamplerSand, vTextureCoord);
    color.rgb /= 0.7* verticalOffset  ;
	gl_FragColor = color;
}
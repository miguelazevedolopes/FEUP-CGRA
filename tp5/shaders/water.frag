#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float verticalOffset;
uniform float timeFactor;
uniform sampler2D uSamplerWaterTex;
uniform sampler2D uSamplerWaterMap;


void main() {
	vec4 color = texture2D(uSamplerWaterTex, vTextureCoord);

    if (verticalOffset < 0.05)
        color.rgb /= 1.05 + verticalOffset * (1.0 - verticalOffset) * 6.5;

    gl_FragColor = color;
}
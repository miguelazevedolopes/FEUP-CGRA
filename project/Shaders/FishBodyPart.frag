#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D scalesSampler;

void main() {
    gl_FragColor = texture2D(scalesSampler, vTextureCoord);)
}
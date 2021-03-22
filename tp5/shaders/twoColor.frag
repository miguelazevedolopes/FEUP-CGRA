#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;

void main() {

    gl_FragColor = vec4(0.6, 0.6, 0.9, 1.0);
    
    if (coords[1] >= 0.5) {
        gl_FragColor = vec4(0.9, 0.9, 0.0, 1.0);
    }
}
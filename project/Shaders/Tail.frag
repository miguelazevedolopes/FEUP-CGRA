#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

uniform sampler2D scalesSampler;
uniform lightProperties uLight[1];

void main() {
    gl_FragColor = vec4(0.6, 0.0, 0.6, 1.0) * uLight[0].diffuse + vec4(0.6, 0.0, 0.6, 1.0) * uLight[0].ambient;
}
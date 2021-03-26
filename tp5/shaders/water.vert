attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSamplerWaterMap;
uniform float timeFactor;

varying float verticalOffset;
varying vec2 vTextureCoord;

void main() {
    vec2 texCoordOffset = aTextureCoord + vec2(timeFactor / 100.0, timeFactor / 100.0);

    if (texCoordOffset.s > 1.0) //To loop the waves
        texCoordOffset.s -= 1.0;

    if (texCoordOffset.t > 1.0) //To loop the waves
        texCoordOffset.t -= 1.0;

    vec4 colorMap = texture2D(uSamplerWaterMap, texCoordOffset);
    verticalOffset = colorMap.b / 30.0; //Make the waves

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z + verticalOffset, 1.0);

    vTextureCoord = aTextureCoord;
}


precision mediump float;

uniform bool hasTexture;
uniform sampler2D texture;
varying vec2 vTextureCoord;
varying vec4 vColor;

void main(void) {
    //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    //gl_FragColor = smpColor * matColor;
    vec4 smpColor = vec4(1.0);
    if (hasTexture) {
        smpColor = texture2D(texture, vTextureCoord);
    }
    gl_FragColor = smpColor * vColor;
}

precision mediump float;

uniform sampler2D texture;
varying vec2 vTextureCoord;

void main(void) {
    vec4  smpColor  = texture2D(texture, vTextureCoord);
    //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    gl_FragColor = smpColor;
}

attribute vec3 position;
attribute vec2 textureCoord;
attribute vec4 color;
uniform   mat4 mvpMatrix;
varying   vec2 vTextureCoord;
varying   vec4 vColor;

void main(void){
    vTextureCoord = textureCoord;
    vColor = color;
    gl_Position = mvpMatrix * vec4(position, 1.0);
}

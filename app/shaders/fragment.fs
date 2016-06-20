precision mediump float;

uniform bool hasTexture;
uniform sampler2D texture;
uniform mat4 invMatrix;
uniform vec3 lightDirection;
uniform vec3 eyeDirection;
uniform vec4 ambientColor;
varying vec3 vNormal;
varying vec4 vColor;
varying vec2 vTextureCoord;

void main(void){
    vec4 smpColor = vec4(1.0);
    if (hasTexture) {
        smpColor = texture2D(texture, vTextureCoord);
    }
    vec3  invLight  = normalize(invMatrix * vec4(lightDirection, 0.0)).xyz;
    vec3  invEye    = normalize(invMatrix * vec4(eyeDirection, 0.0)).xyz;
    vec3  halfLE    = normalize(invLight + invEye);
    float diffuse   = clamp(dot(vNormal, invLight), 0.0, 1.0);
    //float specular  = pow(clamp(dot(vNormal, halfLE), 0.0, 1.0), 50.0);
    //vec4  destColor = vColor * vec4(vec3(diffuse), 1.0) + vec4(vec3(specular), 1.0) + ambientColor;
    vec4  destColor = vColor * vec4(vec3(diffuse), 1.0) + ambientColor;
    gl_FragColor    = destColor * smpColor;
}

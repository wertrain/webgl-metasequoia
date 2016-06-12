var main = function() {
    var sgl = new webglmetasequoia.SimpleGL();
    sgl.initalize('canvas', 640, 480);
    sgl.loadFiles(['shaders/vertex.vs', 'shaders/fragment.fs'], function(responses) {
        var gl = sgl.getGL();
        var vs = sgl.compileShader(0, responses[0]);
        var fs = sgl.compileShader(1, responses[1]);
        var program = sgl.linkProgram(vs, fs);
        gl.useProgram(program);
        (function() {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clearDepth(1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            setTimeout(arguments.callee, 1000 / 60);
        })();
    }, function(e) {
        console.log('failed to load:' + e);
    });
}();

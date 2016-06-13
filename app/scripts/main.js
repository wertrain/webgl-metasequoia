var main = function() {
    var sgl = new webglmetasequoia.SimpleGL();
    sgl.initalize('canvas', 640, 480);
    sgl.loadFiles(['shaders/vertex.vs', 'shaders/fragment.fs', 'models/soldier/heisi.mqo'], function(responses) {
        var gl = sgl.getGL();
        var vs = sgl.compileShader(0, responses[0]);
        var fs = sgl.compileShader(1, responses[1]);
        var program = sgl.linkProgram(vs, fs);
        gl.useProgram(program);
        
        var mqo = new webglmetasequoia.Metasequoia();
        mqo.initalize(responses[2]);
        
        var uniLocation = new Array();
        uniLocation[0] = gl.getUniformLocation(program, 'mvpMatrix');
        var attLocation = new Array();
        attLocation[0] = gl.getAttribLocation(program, 'position');
        var attStride = new Array();
        attStride[0] = 3;
        
        var pvbo = sgl.createVBO(mqo.getObject(0).vertexArray);
        gl.bindBuffer(gl.ARRAY_BUFFER, pvbo);
        gl.enableVertexAttribArray(attLocation[0]);
        gl.vertexAttribPointer(attLocation[0], attStride[0], gl.FLOAT, false, 0, 0);
        
        var minMatrix = new matIV();
        var mtxView = minMatrix.identity(minMatrix.create());
        var mtxProj = minMatrix.identity(minMatrix.create());
        var mtxMVP = minMatrix.identity(minMatrix.create());
        var mtxTmp = minMatrix.identity(minMatrix.create());
        var mtxModel = minMatrix.identity(minMatrix.create());
        var mtxInv = minMatrix.identity(minMatrix.create());
        
        var vecLook = [0.0, 0.0, 16.0]
        minMatrix.lookAt(vecLook, [0, 0, 0], [0, 1, 0], mtxView);
        minMatrix.perspective(45, sgl.getWidth() / sgl.getHeight(), 0.1, 100, mtxProj);
        minMatrix.multiply(mtxProj, mtxView, mtxTmp);
        
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.CULL_FACE);

        (function() {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clearDepth(1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            setTimeout(arguments.callee, 1000 / 30);
        })();
    }, function(e) {
        console.log('failed to load:' + e);
    });
}();

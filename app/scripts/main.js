var main = function() {
    var sgl = new webglmetasequoia.SimpleGL();
    sgl.initalize('canvas', 640, 480);
    sgl.loadFiles(['shaders/vertex.vs', 'shaders/fragment.fs', 'models/isu.mqo', 'models/soldier/heisi.mqo'], function(responses) {
        var gl = sgl.getGL();
        var vs = sgl.compileShader(0, responses[0]);
        var fs = sgl.compileShader(1, responses[1]);
        var program = sgl.linkProgram(vs, fs);

        var mqo = new webglmetasequoia.Metasequoia();
        mqo.initalize(responses[3]);

        gl.useProgram(program);
        
        var uniLocation = new Array();
        uniLocation[0] = gl.getUniformLocation(program, 'mvpMatrix');
        var attLocation = new Array();
        attLocation[0] = gl.getAttribLocation(program, 'position');
        attLocation[1] = gl.getAttribLocation(program, 'color');
        var attStride = new Array();
        attStride[0] = 3;
        attStride[1] = 4;
        
        var position = [
             0.0, 1.0, 0.0,
             1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0
        ];
        var color = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0
        ];
        var index = [
            0, 1, 3,
            3, 2, 1
        ];
            
        var objects = [];
        for (let i = 0; i < mqo.getGroupLength(); ++i) {
            let group = mqo.getGroup(i);
            var vertex = [];
            for (let j = 0; j < group.vertex.length; ++j) {
                Array.prototype.push.apply(vertex, group.vertex[j]);
            }
            //console.log(vertex);
            //console.log(vertex.length);
            var pvbo = sgl.createVBO(vertex);
            //gl.bindBuffer(gl.ARRAY_BUFFER, pvbo);
            //gl.enableVertexAttribArray(attLocation[0]);
            //gl.vertexAttribPointer(attLocation[0], group.vertex.length, gl.FLOAT, false, 0, 0);
            objects.push({v: pvbo, length: group.vertex.length})
        }

        //var pvbo = sgl.createVBO(mqo.getObject(0).vertexArray);
        //var pvbo = sgl.createVBO(position);
        //gl.bindBuffer(gl.ARRAY_BUFFER, pvbo);
        //gl.enableVertexAttribArray(attLocation[0]);
        //gl.vertexAttribPointer(attLocation[0], attStride[0], gl.FLOAT, false, 0, 0);
        //var cvbo = sgl.createVBO(color);
        //gl.bindBuffer(gl.ARRAY_BUFFER, cvbo);
        //gl.enableVertexAttribArray(attLocation[1]);
        //gl.vertexAttribPointer(attLocation[1], attStride[1], gl.FLOAT, false, 0, 0);
        var ibo = sgl.createIBO(index);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        
        var minMatrix = new matIV();
        var mtxView = minMatrix.identity(minMatrix.create());
        var mtxProj = minMatrix.identity(minMatrix.create());
        var mtxMVP = minMatrix.identity(minMatrix.create());
        var mtxTmp = minMatrix.identity(minMatrix.create());
        var mtxModel = minMatrix.identity(minMatrix.create());
        var mtxInv = minMatrix.identity(minMatrix.create());
        
        var vecLook = [0.0, 140.0, 240.0]
        minMatrix.lookAt(vecLook, [0, 130, 0], [0, 1, 0], mtxView);
        minMatrix.perspective(90, sgl.getWidth() / sgl.getHeight(), 0.1, 1000, mtxProj);
        minMatrix.multiply(mtxProj, mtxView, mtxTmp);
        
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        //gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CW);
        gl.cullFace(gl.FRONT);

        (function() {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clearDepth(1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            
            minMatrix.identity(mtxModel);
            var mtxTrans = minMatrix.identity(minMatrix.create());
            var mtxRot = minMatrix.identity(minMatrix.create());
            minMatrix.identity(mtxTrans);
            minMatrix.identity(mtxRot);
            minMatrix.multiply(mtxTrans, mtxRot, mtxModel);
            minMatrix.multiply(mtxTmp, mtxModel, mtxMVP);
            minMatrix.inverse(mtxModel, mtxInv);
            
            gl.uniformMatrix4fv(uniLocation[0], false, mtxMVP);
            for (let i = 0; i < objects.length; ++i) {
                if (objects[i].length === 3) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, objects[i].v);
                    gl.enableVertexAttribArray(attLocation[0]);
                    gl.vertexAttribPointer(attLocation[0], attStride[0], gl.FLOAT, false, 0, 0);
                    gl.drawArrays(gl.TRIANGLES, 0, objects[i].length);
                } else if (objects[i].length === 4) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, objects[i].v);
                    gl.enableVertexAttribArray(attLocation[0]);
                    gl.vertexAttribPointer(attLocation[0], attStride[0], gl.FLOAT, false, 0, 0);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
                    gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);
                }
            }
            gl.flush();
            
            //setTimeout(arguments.callee, 1000 / 30);
        })();
    }, function(e) {
        console.log('failed to load:' + e);
    });
}();

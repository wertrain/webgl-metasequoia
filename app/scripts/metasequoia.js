(function () {
    var MQOPerser = {};

    MQOPerser.parseSceneParam = function(scene) {
        var posMatch = scene.match(/pos ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)/);
        var posArray = new Array(3);
        posArray[0] = parseFloat(posMatch[1]);
        posArray[1] = parseFloat(posMatch[2]);
        posArray[2] = parseFloat(posMatch[3]);
        var lookatMatch = scene.match(/lookat ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)/);
        var lookatArray = new Array(3);
        lookatArray[0] = parseFloat(lookatMatch[1]);
        lookatArray[1] = parseFloat(lookatMatch[2]);
        lookatArray[2] = parseFloat(lookatMatch[3]);
        var headMatch = scene.match(/head ([-]?\d+\.\d+)/);
        var headValue = parseFloat(headMatch[1]);
        var pichMatch = scene.match(/pich ([-]?\d+\.\d+)/);
        var pichValue = parseFloat(pichMatch[1]);
        var orthoMatch = scene.match(/ortho ([-]?\d+)/);
        var orthoValue = parseInt(orthoMatch[1]);
        var zoomMatch = scene.match(/zoom2 ([-]?\d+\.\d+)/);
        var zoomValue = parseFloat(zoomMatch[1]);
        var ambMatch = scene.match(/amb ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)/);
        var ambArray = new Array(3);
        ambArray[0] = parseFloat(ambMatch[1]);
        ambArray[1] = parseFloat(ambMatch[2]);
        ambArray[2] = parseFloat(ambMatch[3]);
        return { 
            'pos': posArray, 'lookat': lookatArray, 'head': headValue, 
            'pich': pichValue, 'ortho': orthoValue, 'zoom2': zoomValue, 'amb': ambArray
        }
    };
    MQOPerser.parseMaterial = function(material) {
        return material.match(/\t".+" shader\(\d\) col\(\d+\.\d+ \d+\.\d+ \d+\.\d+ \d+\.\d+\) dif\(\d+\.\d+\) amb\(\d+\.\d+\) emi\(\d+\.\d+\) spc\(\d+\.\d+\) power\(\d+\.\d+\)(?: tex\(".+"\))*[\n\r]?/g);
    };
    MQOPerser.parseMaterialParam = function(materialLine) {
        var nameMatch = materialLine.match(/"(.+)"/);
        var materialName = nameMatch[1];
        
        var shaderMatch = materialLine.match(/shader\((\d)\)/);
        var shaderNum = shaderMatch === null ? null : parseInt(shaderMatch[1]);
        
        var colMatch = materialLine.match(/col\((\d+\.\d+) (\d+\.\d+) (\d+\.\d+) (\d+\.\d+)\)/);
        var colArray = null;
        if (colMatch !== null) {
            colArray = new Array(4);
            colArray[0] = parseFloat(colMatch[1]);
            colArray[1] = parseFloat(colMatch[2]);
            colArray[2] = parseFloat(colMatch[3]);
            colArray[3] = parseFloat(colMatch[4]);
        }
        
        var difMatch = materialLine.match(/dif\((\d+\.\d+)\)/);
        var difValue = difMatch === null ? null : parseFloat(difMatch[1]);
        
        var ambMatch = materialLine.match(/amb\((\d+\.\d+)\)/);
        var ambValue = ambMatch === null ? null : parseFloat(ambMatch[1]);
        
        var emiMatch = materialLine.match(/emi\((\d+\.\d+)\)/);
        var emiValue = emiMatch === null ? null : parseFloat(emiMatch[1]);
        
        var spcMatch = materialLine.match(/spc\((\d+\.\d+)\)/);
        var spcValue = spcMatch === null ? null : parseFloat(spcMatch[1]);
        
        var powerMatch = materialLine.match(/power\((\d+\.\d+)\)/);
        var powerValue = powerMatch === null ? null : parseFloat(powerMatch[1]);
        
        var texMatch = materialLine.match(/tex\((".+")\)/);
        var texValue = (texMatch === null ? null : texMatch[1])
        
        return { 
            'name': materialName, 'shader': shaderNum, 'col': colArray, 
            'dif': difValue, 'amb': ambValue, 'emi': emiValue,
            'spc': spcValue, 'power': powerValue, 'tex': texValue
        }
    };
    MQOPerser.parseObjectParam = function(object) {
        var nameMatch = object.match(/"(.+)"/);
        var objectName = nameMatch[1];
        
        var visibleMatch = object.match(/visible ([-]?\d+)/);
        var visibleValue = visibleMatch === null ? null : parseInt(visibleMatch[1]);
        
        var lockingMatch = object.match(/locking ([-]?\d+)/);
        var lockingValue = lockingMatch === null ? null : parseInt(lockingMatch[1]);
        
        var shadingMatch = object.match(/shading ([-]?\d+)/);
        var shadingValue = shadingMatch === null ? null : parseInt(shadingMatch[1]);
        
        var facetMatch = object.match(/facet (\d+\.\d+)/);
        var facetValue = facetMatch === null ? null : parseFloat(facetMatch[1])
        
        var colorMatch = object.match(/color ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)/);
        var colorArray = null;
        if (colorMatch !== null) {
            colorArray = new Array(3);
            colorArray[0] = parseFloat(colorMatch[1]);
            colorArray[1] = parseFloat(colorMatch[2]);
            colorArray[2] = parseFloat(colorMatch[3]);
        }
        
        var colorTypeMatch = object.match(/color_type ([-]?\d+)/);
        var colorTypeValue = colorTypeMatch === null ? null : parseInt(colorTypeMatch[1]);
        
        var mirrorMatch = object.match(/mirror ([-]?\d+)/);
        var mirrorValue = mirrorMatch === null ? null : parseInt(mirrorMatch[1]);
        
        var mirrorAxisMatch = object.match(/mirror_axis ([-]?\d+)/);
        var mirrorAxisValue = mirrorAxisMatch === null ? null : parseInt(mirrorAxisMatch[1]);
        
        var depthMatch = object.match(/depth ([-]?\d+)/);
        var depthValue = depthMatch === null ? null : parseInt(depthMatch[1]);
        
        var foldingMatch = object.match(/folding ([-]?\d+)/);
        var foldingValue = foldingMatch === null ? null : parseInt(foldingMatch[1]);
        
        var scaleMatch = object.match(/scale ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)/);
        var scaleArray = null;
        if (scaleMatch !== null) {
            var scaleArray = new Array(3);
            scaleArray[0] = parseFloat(scaleMatch[1]);
            scaleArray[1] = parseFloat(scaleMatch[2]);
            scaleArray[2] = parseFloat(scaleMatch[3]);
        }
        
        var rotationMatch = object.match(/rotation ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)/);
        var rotationArray = null;
        if (rotationMatch !== null) {
            var rotationArray = new Array(3);
            rotationArray[0] = parseFloat(rotationMatch[1]);
            rotationArray[1] = parseFloat(rotationMatch[2]);
            rotationArray[2] = parseFloat(rotationMatch[3]);
        }

        var translationMatch = object.match(/translation ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)/);
        var translationArray = null;
        if (translationMatch !== null) {
            var translationArray = new Array(3);
            translationArray[0] = parseFloat(translationMatch[1]);
            translationArray[1] = parseFloat(translationMatch[2]);
            translationArray[2] = parseFloat(translationMatch[3]);
        }
        
        var vertexMatch = object.match(/vertex (\d+) \{[\s\S]+?\}/);
        var vertexNum = parseInt(vertexMatch[1]);
        var vertexParams = vertexMatch[0].match(/([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)[\n\r]/g);
        var vertexArray = new Array(vertexParams.length);
        for (let i = 0; i < vertexParams.length; ++i) {
            let vertexParamMatch = vertexParams[i].match(/([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)/);
            let vertex = new Array(3);
            vertex[0] = vertexParamMatch[1];
            vertex[1] = vertexParamMatch[2];
            vertex[2] = vertexParamMatch[3];
            vertexArray[i] = vertex;
        }
        
        var faceMatch = object.match(/face (\d+) \{[\s\S]+?\}/);
        var faceNum = parseInt(faceMatch[1]);

        var faceParams = faceMatch[0].match(/\d+ V\(\d+(?: \d+)*\) M\(\d+\)(:? UV\([-]?\d+\.\d+(?: [-]?\d+\.\d+)*\))*[\n\r]/g);
        var faceArray = new Array(faceParams.length);
        for (let i = 0; i < faceParams.length; ++i) {
            let faceValueMatch = faceParams[i].match(/^\d+/);
            let faceValue = parseInt(faceValueMatch[0]);
            let vReg = [
                /V\((\d+)\)/,
                /V\((\d+) (\d+)\)/,
                /V\((\d+) (\d+) (\d+)\)/,
                /V\((\d+) (\d+) (\d+) (\d+)\)/,
            ];
            let faceVMatch = faceParams[i].match(vReg[faceValue-1]);
            let vArray = new Array(faceVMatch.length - 1);
            for (let j = 0; j < vArray.length; ++j) {
                vArray[j] = parseInt(faceVMatch[j + 1]);
            }
            let faceMMatch = faceParams[i].match(/M\((\d+)\)/);
            let mValue = parseInt(faceMMatch[1]);
            let uvReg = [
                /UV\(([-]?\d+\.\d+) ([-]?\d+\.\d+)\)/,
                /UV\(([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)\)/,
                /UV\(([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)\)/,
                /UV\(([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+) ([-]?\d+\.\d+)\)/,
            ];
            let faceUVMatch = faceParams[i].match(uvReg[faceValue-1]);
            let uvArray = null;
            if (faceUVMatch !== null) {
                uvArray = new Array(faceValue * 2);
                for (let j = 0; j < uvArray.length; ++j) {
                    uvArray[j] = parseFloat(faceUVMatch[j + 1]);
                }
            }
            faceArray[i] = {'value': faceValue, 'V': vArray, 'M': mValue, 'UV': uvArray};
        }
        return {
            'name': objectName, 'visible': visibleValue, 'locking': lockingValue,
            'depth': depthValue, 'folding': foldingValue,
            'scale': scaleArray, 'rotation': rotationArray, 'translation': translationArray,
            'shading': shadingValue, 'facet': facetValue, 'color': colorArray,
            'color_type': colorTypeValue, 'mirror': mirrorValue, 'mirror_axis': mirrorAxisValue,
            'vertex': vertexArray, 'face': faceArray
        }
    };
    MQOPerser._parseObjectVertexParam = function(vertexParams) {
    };
    var Metasequoia = function() {
        this.materialNum = 0;
        this.materials = [];
        this.scene = null;
        this.objects = [];
    };
    Metasequoia.prototype.initalize = function(mqo) {
        var sceneMatch = mqo.match(/Scene \{[\s\S]+?\}/);
        if (sceneMatch === null) {
            console.log('Scene: not found.');
            return false;
        }
        var scene = sceneMatch[0];
        this.scene = MQOPerser.parseSceneParam(scene);
        
        var materialMatch = mqo.match(/Material (\d+) \{[\s\S]+?\}/);
        if (materialMatch === null) {
            console.log('Material: not found.');
            return false;
        }
        var material = materialMatch[0];
        this.materialNum = parseInt(materialMatch[1]);
        
        var materialParams = MQOPerser.parseMaterial(material);
        if (materialParams.length !== this.materialNum) {
            console.log('Material: invalid data.' + materialParams.length);
            return false;
        }
        this.materials = new Array(this.materialNum);
        for (let i = 0; i < this.materialNum; ++i) {
            this.materials[i] = MQOPerser.parseMaterialParam(materialParams[i]);
        }
        // 以下の判定は怪しめ vertex, face の項目がないと（また、それ以上の項目があると）上手く拾えなくなる
        var objectsMatch = mqo.match(/Object "(.+)" \{[\s\S]+?\}[\s\S]+?\}[\s\S]+?\}/g);
        if (objectsMatch === null) {
            console.log('Object: not found.');
            return false;
        }
        this.objects = new Array(objectsMatch.length);
        for (let i = 0; i < this.objects.length; ++i) {
            this.objects[i] = MQOPerser.parseObjectParam(objectsMatch[i]);
        }
        for(let i = 0; i < this.objects.length; ++i) {
            console.log(this.objects[i]);
        }
        return true;
    };
    webglmetasequoia.Metasequoia = Metasequoia;
}());

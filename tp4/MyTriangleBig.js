import {CGFobject} from '../lib/CGF.js';

export class MyTriangleBig extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -2, 0, 0, //0
            0, 2, 0, //1
            2, 0, 0, //2

            -2, 0, 0, //0
            0, 2, 0, //1
            2, 0, 0 //2
        ]
        this.normals=[
            0,0,1,
            0,0,1,
            0,0,1,
            0,0,-1,
            0,0,-1,
            0,0,-1,
            
        ]

        this.indices = [
            2, 1, 0,
            3,4,5
        ]
        this.texCoords =[];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
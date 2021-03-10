import {CGFobject} from '../lib/CGF.js';

export class MyTriangleBig extends CGFobject {
    constructor(scene, color) {
        super(scene);
        this.initBuffers(color);
    }

    initBuffers(color) {
        this.vertices = [
            -2, 0, 0, //0
            0, 2, 0, //1
            2, 0, 0, //2

            -2, 0, 0, //0
            0, 2, 0, //1
            2, 0, 0 //2
        ]
        this.normals = [
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

        if (color === 'orange') {
            this.texCoords = [
                1, 0,
                0.5, 0.5,
                1, 1,
            ]
        }
        else if (color === 'blue') {
            this.texCoords = [
                0, 0,
                0.5, 0.5,
                1, 0,
            ]
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
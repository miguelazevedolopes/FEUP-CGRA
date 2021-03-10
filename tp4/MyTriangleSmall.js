import {CGFobject} from '../lib/CGF.js';

export class MyTriangleSmall extends CGFobject {
    constructor(scene, color) {
        super(scene);
        this.initBuffers(color);
    }

    initBuffers(color) {
        this.vertices = [
            -1, 0, 0, //0
            0, 1, 0, //1
            1, 0, 0, //2
            
            -1, 0, 0, //0
            0, 1, 0, //1
            1, 0, 0 //2
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

        if (color === 'red') {
            this.texCoords = [
                0.25, 0.75,
                0.5, 0.5,
                0.75, 0.75
            ]
        }
        else if (color === 'purple') {
            this.texCoords = [
                0, 0,
                0.25, 0.25,
                0, 0.5
            ]
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
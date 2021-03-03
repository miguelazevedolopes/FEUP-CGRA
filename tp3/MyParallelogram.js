import {CGFobject} from '../lib/CGF.js';

export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0, 1, 0, //0
            1, 0, 0, //1
            3, 0, 0, //2
            2, 1, 0, //3
        ]

        this.indices = [
            0, 1, 3,
            3, 1, 2,
        ]

        this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
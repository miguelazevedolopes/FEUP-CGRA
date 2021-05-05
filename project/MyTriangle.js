import {CGFobject} from '../lib/CGF.js';

export class MyTriangle extends CGFobject {
    constructor(scene,material) {
        super(scene);
        this.material=material;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            1, -1, 0, //0
            -1, -1, 0, //1
            -1, 1, 0, //2
            1, -1, 0, //0
            -1, -1, 0, //1
            -1, 1, 0 //2
        ]

        this.indices = [
            2, 1, 0,
            3, 4, 5
        ]

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ]

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    display() {
        this.material.apply();
        super.display();
        this.scene.setDefaultAppearance();
    }
}
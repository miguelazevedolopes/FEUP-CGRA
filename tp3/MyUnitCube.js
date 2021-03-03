import { CGFobject } from "../lib/CGF.js";

export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
    
        this.vertices = [
            0.5, 0.5, 0.5, //0
            0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            
            0.5, 0.5, -0.5, //3
            0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,

            -0.5, 0.5, -0.5, //6
            -0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,

            -0.5, 0.5, 0.5,  //9
            -0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,

            0.5, -0.5, 0.5, //12
            0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,

            0.5, -0.5, -0.5, //15
            0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,

            -0.5, -0.5, -0.5, //18
            -0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,

            -0.5, -0.5, 0.5, //21
            -0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5
            
        ]
        this.normals =[
            0, 0, 1,
            0, 1, 0,
            1, 0, 0, // 23

            0, 0, -1,
            0, 1, 0,
            1, 0, 0, // 11

            
            0,0,-1,
            0,1,0,
            -1,0,0, //3

            0,0,1,
            0,1,0,
            -1,0,0,
            
            0,0,1,
            0,-1,0,
            1,0,0, //1

            0,0,-1,
            0,-1,0,
            1,0,0, //2


            0,0,-1, //3
            0,-1,0,
            -1,0,0,

            0,0,1, //4
            0,-1,0,
            -1,0,0

        ]

        this.indices = [
            0,3,6,
            6,9,0,

            18,15,12,
            12,21,18,

            12,15,3,
            3,0,12,

            6,18,21,
            21,9,6,

            21,12,0,
            0,9,21,

            3,15,18,
            18,6,3
        ]

        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
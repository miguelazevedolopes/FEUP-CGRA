import { CGFobject } from "../lib/CGF.js";

export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            -0.5, -0.5, 0.5,  //0
            0.5, -0.5, 0.5,   //1
            -0.5, 0.5, 0.5,   //2
            0.5, 0.5, 0.5,    //3
            -0.5, -0.5, -0.5, //4
            0.5, -0.5, -0.5,  //5
            -0.5, 0.5, -0.5,  //6
            0.5, 0.5, -0.5,   //7
            -0.5, -0.5, 0.5,  //8
            0.5, -0.5, 0.5,   //9
            -0.5, 0.5, 0.5,   //10
            0.5, 0.5, 0.5,    //11
            -0.5, -0.5, -0.5, //12
            0.5, -0.5, -0.5,  //13
            -0.5, 0.5, -0.5,  //14
            0.5, 0.5, -0.5,   //15
            -0.5, -0.5, 0.5,  //16
            0.5, -0.5, 0.5,   //17
            -0.5, 0.5, 0.5,   //18
            0.5, 0.5, 0.5,    //19
            -0.5, -0.5, -0.5, //20
            0.5, -0.5, -0.5,  //21
            -0.5, 0.5, -0.5,  //22
            0.5, 0.5, -0.5,   //23
        ];
 
        this.indices = [
            0, 1, 2, 
            3, 2, 1, //FACE DE CIMA
            6, 5, 4,
            5, 6, 7, //FACE DE BAIXO
            1, 5, 3,
            7, 3, 5, //FACE DA FRENTE
            2, 4, 0,
            4, 2, 6, //FACE DE TRÁS
            2, 3, 7,
            6, 2, 7, //FACE DA DIREITA
            5, 1, 0,
            5, 0, 4, //FACE DA ESQUERDA

            /*8, 9, 10, 
            11, 10, 9, //FACE DE CIMA
            14, 13, 12,
            13, 14, 15, //FACE DE BAIXO
            9, 13, 11,
            15, 11, 13, //FACE DA FRENTE
            10, 12, 8,
            12, 10, 14, //FACE DE TRÁS
            10, 11, 15,
            14, 10, 15, //FACE DA DIREITA
            13, 9, 8,
            13, 8, 12, //FACE DA ESQUERDA

            0, 1, 2, 
            3, 2, 1, //FACE DE CIMA
            6, 5, 4,
            5, 6, 7, //FACE DE BAIXO
            1, 5, 3,
            7, 3, 5, //FACE DA FRENTE
            2, 4, 0,
            4, 2, 6, //FACE DE TRÁS
            2, 3, 7,
            6, 2, 7, //FACE DA DIREITA
            5, 1, 0,
            5, 0, 4, //FACE DA ESQUERDA*/
        ];

        this.normals = [
            0, 0, 1,     //CIMA
            0, 0, 1,
            0, 0, 1, 
            0, 0, 1, 
            0, 0, -1,    //BAIXO
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            -1, 0, 0,    //FRENTE E TRÁS
            1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            0, -1, 0,    //ESQUERDA DIREITA
            0, -1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,
            0, 1, 0,
            0, 1, 0,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
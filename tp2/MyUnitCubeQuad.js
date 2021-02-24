import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.scene.quad = new MyQuad(this.scene);
    }
    display() {

        var quadFlipBottom = [
            Math.cos(Math.PI), 0.0, -Math.sin(Math.PI), 0.0,
            0.0, 1.0, 0.0, 0.0,
            Math.sin(Math.PI), 0.0, Math.cos(Math.PI), 0.0,
            0.0, 0.0, 0.0, 1.0,
        ]

        var quadFrontRot = [
            Math.cos(Math.PI/2), 0.0, -Math.sin(Math.PI/2), 0.0,
            0.0, 1.0, 0.0, 0.0,
            Math.sin(Math.PI/2), 0.0, Math.cos(Math.PI/2), 0.0,
            0.0, 0.0, 0.0, 1.0,
        ]

        var quadBackRot = [
            Math.cos(-Math.PI/2), 0.0, -Math.sin(-Math.PI/2), 0.0,
            0.0, 1.0, 0.0, 0.0,
            Math.sin(-Math.PI/2), 0.0, Math.cos(-Math.PI/2), 0.0,
            0.0, 0.0, 0.0, 1.0,
        ]

        var quadSideRot = [
            Math.cos(-Math.PI/2), Math.sin(-Math.PI/2), 0.0, 0.0,
            -Math.sin(-Math.PI/2), Math.cos(-Math.PI/2), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ]

        var quadFrontT = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.5, 0.0, 0.0, 1.0,
        ]
        
        var quadBackT = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            -0.5, 0.0, 0.0, 1.0,
        ]

        var quadRightT = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.5, 0.0, 1.0,
        ]

        var quadLeftT = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, -0.5, 0.0, 1.0,
        ]

        var quadUpT = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.5, 1.0,
        ]

        var quadDownT = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, -0.5, 1.0,
        ]

        //TOP
        this.scene.pushMatrix();
        this.scene.multMatrix(quadUpT);
        this.scene.quad.display();
        this.scene.popMatrix();

        //BOTTOM
        this.scene.pushMatrix();
        this.scene.multMatrix(quadDownT);
        this.scene.multMatrix(quadFlipBottom);
        this.scene.quad.display();
        this.scene.popMatrix();

        //FRONT
        this.scene.pushMatrix();
        this.scene.multMatrix(quadFrontT);
        this.scene.multMatrix(quadFrontRot);
        this.scene.quad.display();
        this.scene.popMatrix();

        //BACK
        this.scene.pushMatrix();
        this.scene.multMatrix(quadBackT);
        this.scene.multMatrix(quadBackRot);
        this.scene.quad.display();
        this.scene.popMatrix();

        //RIGHT
        this.scene.pushMatrix();
        this.scene.multMatrix(quadRightT);
        this.scene.multMatrix(quadSideRot);
        this.scene.multMatrix(quadBackRot);
        this.scene.quad.display();
        this.scene.popMatrix();

        //LEFT
        this.scene.pushMatrix();
        this.scene.multMatrix(quadLeftT);
        this.scene.multMatrix(quadSideRot);
        this.scene.multMatrix(quadFrontRot);
        this.scene.quad.display();
        this.scene.popMatrix();
        
    }
}
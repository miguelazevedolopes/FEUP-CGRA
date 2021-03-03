import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        //INITIALIZING OBJECTS
        this.scene.diamond = new MyDiamond(this.scene);
        this.scene.triangle = new MyTriangle(this.scene);
        this.scene.parallelogram = new MyParallelogram(this.scene);
        this.scene.triangleBig = new MyTriangleBig(this.scene);
        this.scene.triangleSmall = new MyTriangleSmall(this.scene);
    }
    display() {

        //TRANSFORMATIONS    
        var diamondT = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        -1.0, 0.0, 0.0, 1.0,
        ]
    

        //DIAMOND
        this.scene.pushMatrix();
        this.scene.multMatrix(diamondT);
        //this.scene.setGreenAppearance();
        this.scene.diamond.display();
        this.scene.popMatrix();

        //TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(-1.0, -1.0, 0.0);
        this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
        this.scene.translate(1.0, 1.0, 0.0);
        //this.scene.setPinkAppearance();
        this.scene.triangle.display();
        this.scene.popMatrix();

        //PARALLELOGRAM
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.translate(0.0, -1.0, 0.0);
        //this.scene.setYellowAppearance();
        this.scene.parallelogram.display();
        this.scene.popMatrix();

        //SMALL TRIANGLE PURPLE
        this.scene.pushMatrix();
        this.scene.translate(0.0, 1.0, 0.0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        //this.scene.setPurpleAppearance();  
        this.scene.triangleSmall.display();
        this.scene.popMatrix();

        //SMALL TRIANGLE RED
        this.scene.pushMatrix();
        this.scene.translate(1.85, -2.0, 0.0)
        //this.scene.setRedAppearance();
        this.scene.triangleSmall.display();
        this.scene.popMatrix();

        //BIG TRIANGLE BLUE
        //this.scene.setDefaultAppearance(); // Blue object
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(8) ,0.0, 0.0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.triangleBig.display();
        this.scene.popMatrix();

        //BIG TRIANGLE ORANGE
        //this.scene.setOrangeAppearance();
        this.scene.pushMatrix();
        this.scene.translate(0.0, 2.0, 0.0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.translate(0.0, -2.0, 0.0);
        this.scene.triangleBig.display();
        this.scene.popMatrix();
    }
}
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
        var parallelogramRot = [
        Math.cos(-Math.PI/2), Math.sin(-Math.PI/2), 0.0, 0.0,
        -Math.sin(-Math.PI/2), Math.cos(-Math.PI/2), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        0.0, 0.0, 0.0, 1.0,
        ]
      
        var smallTrianglePurpleRot = [
        Math.cos(Math.PI / 2), Math.sin(Math.PI / 2), 0.0, 0.0,
        -Math.sin(Math.PI/2), Math.cos(Math.PI/2), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
        ]
    
        var bigTriangleBlueRot = [
        Math.cos(Math.PI / 2), Math.sin(Math.PI / 2), 0.0, 0.0,
        -Math.sin(Math.PI/2), Math.cos(Math.PI/2), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
        ]
    
        var triangleRot = [
        Math.cos(3*Math.PI/4), Math.sin(3*Math.PI/4), 0.0, 0.0,
        -Math.sin(3*Math.PI/4), Math.cos(3*Math.PI/4), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        0.0, 0.0, 0.0, 1.0,
        ]
    
        var bigTriangleOrangeRot = [
        Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0.0, 0.0,
        -Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        0.0, 0.0, 0.0, 1.0,
        ]
    
        var smallTrianglePurpleT = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        0.0, 1.0, 0.0, 1.0,
        ]
    
        var smallTriangleRedT = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        1.85, -2.0, 0.0, 1.0,
        ]
    
        var diamondT = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        -1.0, 0.0, 0.0, 1.0,
        ]
    
        var triangleT1 = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        1.0, 1.0, 0.0, 1.0,
        ]
    
        var triangleT2 = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        -1.0, -1.0, 0.0, 1.0,
        ]
    
        var bigTriangleBlueT = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        Math.sqrt(8) ,0.0, 0.0, 1.0,
        ]
    
        var bigTriangleOrangeT1 = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        0.0, -2.0, 0.0, 1.0,
        ]
    
        var bigTriangleOrangeT2 = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        0.0, 2.0, 0.0, 1.0,
        ]

        var parallelogramT = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        0.0, -1.0, 0.0, 1.0,
        ]

        //DIAMOND
        this.scene.pushMatrix();
        this.scene.multMatrix(diamondT);
        this.scene.setGreenAppearance();
        this.scene.diamond.display();
        this.scene.popMatrix();

        //TRIANGLE
        this.scene.pushMatrix();
        this.scene.multMatrix(triangleT2);
        this.scene.multMatrix(triangleRot);
        this.scene.multMatrix(triangleT1);
        this.scene.setPinkAppearance();
        this.scene.triangle.display();
        this.scene.popMatrix();

        //PARALLELOGRAM
        this.scene.pushMatrix();
        this.scene.multMatrix(parallelogramRot);
        this.scene.multMatrix(parallelogramT);
        this.scene.setYellowAppearance();
        this.scene.parallelogram.display();
        this.scene.popMatrix();

        //SMALL TRIANGLE PURPLE
        this.scene.pushMatrix();
        this.scene.multMatrix(smallTrianglePurpleT);
        this.scene.multMatrix(smallTrianglePurpleRot);
        this.scene.setPurpleAppearance();  
        this.scene.triangleSmall.display();
        this.scene.popMatrix();

        //SMALL TRIANGLE RED
        this.scene.pushMatrix();
        this.scene.multMatrix(smallTriangleRedT);
        this.scene.setRedAppearance();
        this.scene.triangleSmall.display();
        this.scene.popMatrix();

        //BIG TRIANGLE BLUE
        this.scene.setDefaultAppearance(); // Blue object
        this.scene.pushMatrix();
        this.scene.multMatrix(bigTriangleBlueT);
        this.scene.multMatrix(bigTriangleBlueRot);
        this.scene.triangleBig.display();
        this.scene.popMatrix();

        //BIG TRIANGLE ORANGE
        this.scene.setOrangeAppearance();
        this.scene.pushMatrix();
        this.scene.multMatrix(bigTriangleOrangeT2);
        this.scene.multMatrix(bigTriangleOrangeRot);
        this.scene.multMatrix(bigTriangleOrangeT1);
        this.scene.triangleBig.display();
        this.scene.popMatrix();
    }
}
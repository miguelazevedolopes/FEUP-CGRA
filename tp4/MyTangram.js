import {CGFobject,CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.createMaterials();
    }
    initBuffers() {
        //INITIALIZING OBJECTS
        this.scene.diamond = new MyDiamond(this.scene);
        this.scene.triangle = new MyTriangle(this.scene);
        this.scene.parallelogram = new MyParallelogram(this.scene);
        this.scene.triangleBig = new MyTriangleBig(this.scene);
        this.scene.triangleSmall = new MyTriangleSmall(this.scene);
    }
    createMaterials() {
        this.materials = [];
        
        //MATERIALS

        //RED
        this.scene.materialRed = new CGFappearance(this.scene);
        this.scene.materialRed.setAmbient(0.2, 0.0, 0.0, 1.0);
        this.scene.materialRed.setDiffuse(0.1, 0.0, 0.0, 1.0);
        this.scene.materialRed.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.scene.materialRed.setShininess(10.0);

        //GREEN
        this.scene.materialGreen = new CGFappearance(this.scene);
        this.scene.materialGreen.setAmbient(0.0, 0.2, 0.0, 1.0);
        this.scene.materialGreen.setDiffuse(0.0, 0.1, 0.0, 1.0);
        this.scene.materialGreen.setSpecular(0.0, 1.0, 0.0, 1.0);
        this.scene.materialGreen.setShininess(10.0);

        //ORANGE
        this.scene.materialOrange = new CGFappearance(this.scene);
        this.scene.materialOrange.setAmbient(0.2, 0.1, 0.0, 1.0);
        this.scene.materialOrange.setDiffuse(0.1, 0.05, 0.0, 1.0);
        this.scene.materialOrange.setSpecular(1.0, 0.5, 0.0, 1.0);
        this.scene.materialOrange.setShininess(10.0);

        //YELLOW
        this.scene.materialYellow = new CGFappearance(this.scene);
        this.scene.materialYellow.setAmbient(0.2, 0.2, 0.0, 1.0);
        this.scene.materialYellow.setDiffuse(0.1, 0.1, 0.0, 1.0);
        this.scene.materialYellow.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.scene.materialYellow.setShininess(10.0);

        //PINK
        this.scene.materialPink = new CGFappearance(this.scene);
        this.scene.materialPink.setAmbient(0.2, 0.08, 0.14, 1.0);
        this.scene.materialPink.setDiffuse(0.1, 0.04, 0.07, 1.0);
        this.scene.materialPink.setSpecular(1.0, 0.4, 0.7, 1.0);
        this.scene.materialPink.setShininess(10.0);

        //PURPLE
        this.scene.materialPurple = new CGFappearance(this.scene);
        this.scene.materialPurple.setAmbient(0.14, 0.02, 0.2, 1.0);
        this.scene.materialPurple.setDiffuse(0.07, 0.01, 0.1, 1.0);
        this.scene.materialPurple.setSpecular(0.7, 0.1, 1.0, 1.0);
        this.scene.materialPurple.setShininess(10.0);

        //BLUE
        this.scene.materialBlue = new CGFappearance(this.scene);
        this.scene.materialBlue.setAmbient(0.04, 0.08, 0.16, 1.0);
        this.scene.materialBlue.setDiffuse(0.02, 0.04, 0.08, 1.0);
        this.scene.materialBlue.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.scene.materialBlue.setShininess(10.0);

        this.scene.diamondMaterial = new CGFappearance(this.scene);
        this.scene.diamondMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.diamondMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.diamondMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.diamondMaterial.setShininess(10.0);
        this.scene.diamondMaterial.loadTexture('images/tangram.png');

        this.materials = [this.scene.materialGreen, this.scene.materialPink, this.scene.materialYellow, this.scene.materialPurple,
            this.scene.materialRed, this.scene.materialBlue, this.scene.materialOrange, this.scene.diamondMaterial];

    }
    display() {

        //TRANSFORMATIONS    
        var diamondT = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        -1.0, 0.0, 0.0, 1.0,
        ];    
        

        //DIAMOND
        this.scene.pushMatrix();
        this.scene.multMatrix(diamondT);
        this.materials[7].apply();
        this.scene.diamond.display();
        this.scene.popMatrix();

        //TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(-1.0, -1.0, 0.0);
        this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
        this.scene.translate(1.0, 1.0, 0.0);
        this.materials[1].apply();
        this.scene.triangle.display();
        this.scene.popMatrix();

        //PARALLELOGRAM
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.translate(0.0, -1.0, 0.0);
        this.materials[2].apply();
        this.scene.parallelogram.display();
        this.scene.popMatrix();

        //SMALL TRIANGLE PURPLE
        this.scene.pushMatrix();
        this.scene.translate(0.0, 1.0, 0.0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.materials[3].apply();  
        this.scene.triangleSmall.display();
        this.scene.popMatrix();

        //SMALL TRIANGLE RED
        this.scene.pushMatrix();
        this.scene.translate(1.85, -2.0, 0.0)
        this.materials[4].apply();
        this.scene.triangleSmall.display();
        this.scene.popMatrix();

        //BIG TRIANGLE BLUE
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(8) ,0.0, 0.0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.materials[5].apply();
        this.scene.triangleBig.display();
        this.scene.popMatrix();

        //BIG TRIANGLE ORANGE
        this.scene.pushMatrix();
        this.scene.translate(0.0, 2.0, 0.0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.translate(0.0, -2.0, 0.0);
        this.materials[6].apply();
        this.scene.triangleBig.display();
        this.scene.popMatrix();
    }

}
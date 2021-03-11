import {CGFobject,CGFappearance} from '../lib/CGF.js';
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
        this.scene.triangleBigOrange = new MyTriangleBig(this.scene, 'orange');
        this.scene.triangleBigBlue = new MyTriangleBig(this.scene, 'blue');
        this.scene.triangleSmallRed = new MyTriangleSmall(this.scene, 'red');
        this.scene.triangleSmallPurple = new MyTriangleSmall(this.scene, 'purple');

    }
    createMaterials() {
        this.materials = [];
        
        //MATERIALS

        //RED
        this.materialRed = new CGFappearance(this.scene);
        this.materialRed.setAmbient(0.2, 0.0, 0.0, 1.0);
        this.materialRed.setDiffuse(0.1, 0.0, 0.0, 1.0);
        this.materialRed.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.materialRed.setShininess(10.0);

        //GREEN
        this.materialGreen = new CGFappearance(this.scene);
        this.materialGreen.setAmbient(0.0, 0.2, 0.0, 1.0);
        this.materialGreen.setDiffuse(0.0, 0.1, 0.0, 1.0);
        this.materialGreen.setSpecular(0.0, 1.0, 0.0, 1.0);
        this.materialGreen.setShininess(10.0);

        //ORANGE
        this.materialOrange = new CGFappearance(this.scene);
        this.materialOrange.setAmbient(0.2, 0.1, 0.0, 1.0);
        this.materialOrange.setDiffuse(0.1, 0.05, 0.0, 1.0);
        this.materialOrange.setSpecular(1.0, 0.5, 0.0, 1.0);
        this.materialOrange.setShininess(10.0);

        //YELLOW
        this.materialYellow = new CGFappearance(this.scene);
        this.materialYellow.setAmbient(0.2, 0.2, 0.0, 1.0);
        this.materialYellow.setDiffuse(0.1, 0.1, 0.0, 1.0);
        this.materialYellow.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.materialYellow.setShininess(10.0);

        //PINK
        this.materialPink = new CGFappearance(this.scene);
        this.materialPink.setAmbient(0.2, 0.08, 0.14, 1.0);
        this.materialPink.setDiffuse(0.1, 0.04, 0.07, 1.0);
        this.materialPink.setSpecular(1.0, 0.4, 0.7, 1.0);
        this.materialPink.setShininess(10.0);

        //PURPLE
        this.materialPurple = new CGFappearance(this.scene);
        this.materialPurple.setAmbient(0.14, 0.02, 0.2, 1.0);
        this.materialPurple.setDiffuse(0.07, 0.01, 0.1, 1.0);
        this.materialPurple.setSpecular(0.7, 0.1, 1.0, 1.0);
        this.materialPurple.setShininess(10.0);

        //BLUE
        this.materialBlue = new CGFappearance(this.scene);
        this.materialBlue.setAmbient(0.04, 0.08, 0.16, 1.0);
        this.materialBlue.setDiffuse(0.02, 0.04, 0.08, 1.0);
        this.materialBlue.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.materialBlue.setShininess(10.0);

        //TEXTURE MATERIAL
        this.materialTangramPNG = new CGFappearance(this.scene);
        this.materialTangramPNG.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.materialTangramPNG.setDiffuse(0.9, 0.9, 0.9, 1.0);
        this.materialTangramPNG.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.materialTangramPNG.setShininess(10.0);
        this.materialTangramPNG.loadTexture('images/tangram.png');


        this.materials = [this.materialGreen, this.materialPink, this.materialYellow, this.materialPurple,
            this.materialRed, this.materialBlue, this.materialOrange, this.materialTangramPNG];

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
        this.materials[7].apply();
        this.scene.triangle.display();
        this.scene.popMatrix();

        //PARALLELOGRAM
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.translate(0.0, -1.0, 0.0);
        this.materials[7].apply();
        this.scene.parallelogram.display();
        this.scene.popMatrix();

        //SMALL TRIANGLE PURPLE
        this.scene.pushMatrix();
        this.scene.translate(0.0, 1.0, 0.0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.materials[7].apply();  
        this.scene.triangleSmallPurple.display();
        this.scene.popMatrix();

        //SMALL TRIANGLE RED
        this.scene.pushMatrix();
        this.scene.translate(1.85, -2.0, 0.0)
        this.materials[7].apply();
        this.scene.triangleSmallRed.display();
        this.scene.popMatrix();

        //BIG TRIANGLE BLUE
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(8) ,0.0, 0.0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.materials[7].apply();
        this.scene.triangleBigBlue.display();
        this.scene.popMatrix();

        //BIG TRIANGLE ORANGE
        this.scene.pushMatrix();
        this.scene.translate(0.0, 2.0, 0.0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.translate(0.0, -2.0, 0.0);
        this.materials[7].apply();
        this.scene.triangleBigOrange.display();
        this.scene.popMatrix();
    }

}
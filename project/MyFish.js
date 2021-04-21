import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyElipseSphere } from './MyElipseSphere.js';
import { MyTriangle } from './MyTriangle.js';

export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.createMaterials();
        this.createPieces();
    }
    createMaterials() {
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(1.0, 0.2, 0.0, 1.0);
        this.redMaterial.setDiffuse(1.0, 0.2, 0.0, 1.0);
        this.redMaterial.setSpecular(1.0, 0.2, 0.0, 1.0);
        this.redMaterial.setShininess(10.0);

        this.whiteMaterial = new CGFappearance(this.scene);
        this.whiteMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.whiteMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.whiteMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.whiteMaterial.setShininess(10.0);

        this.blackMaterial = new CGFappearance(this.scene);
        this.blackMaterial.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.blackMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.blackMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.blackMaterial.setShininess(10.0);

    }
    createPieces() {
        this.body = new MyElipseSphere(this.scene, 16, 10, this.redMaterial,0.9,1.3,1.0);
        this.eye = new MyElipseSphere(this.scene,16,10,this.whiteMaterial,1,1,1);
        this.eyeBlackPart = new MyElipseSphere(this.scene,16,10,this.blackMaterial,1,1,1);
        this.fin = new MyTriangle(this.scene,this.redMaterial);
    }
    initBuffers() {
        this.body.initBuffers();
        this.eye.initBuffers();
        this.eyeBlackPart.initBuffers();
        this.fin.initBuffers();
    }
    display() {
        //Body
        this.body.display();


        //Eyes
        this.scene.pushMatrix();
        this.scene.scale(0.2,0.2,0.2);
        this.scene.translate(3.5,3.0,-1.0);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2,0.2,0.2);
        this.scene.translate(-3.5,3.0,-1.0);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.15,0.15,0.15);
        this.scene.translate(-5.05,4.2,-1.35);
        this.eyeBlackPart.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.15,0.15,0.15);
        this.scene.translate(5.05,4.2,-1.35);
        this.eyeBlackPart.display();
        this.scene.popMatrix();


        //Tail
        this.scene.pushMatrix();
        this.scene.scale(0.8,0.8,0.8)
        this.scene.translate(0,-3.0,0)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.fin.display();
        this.scene.popMatrix();


        //Top Fin
        this.scene.pushMatrix();
        this.scene.scale(0.6,0.6,0.6)
        this.scene.translate(0,-0.25,-1.25)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.fin.display();
        this.scene.popMatrix();


        //Bottom Fins
        this.scene.pushMatrix();
        this.scene.scale(0.3,0.3,0.3)
        this.scene.translate(3.2,0.3,2)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(-Math.PI/4,1,1,0);
        this.fin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.3,0.3,0.3)
        this.scene.translate(-3.2,0.3,2)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(Math.PI/4,1,1,0);
        this.fin.display();
        this.scene.popMatrix();
    }
}
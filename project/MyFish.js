import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyElipseSphere } from './MyElipseSphere.js';
import { MyTriangle } from './MyTriangle.js';

export class MyFish extends CGFobject {
    constructor(scene, ratio, texture, color) {
        super(scene);

        this.fishBodyTex = new CGFtexture(this.scene, texture);
        this.color = color;
        this.ratio = ratio; // Represents the percentage of body that is head

        this.createMaterials();
        this.createPieces();
        this.createShaders();

        // Movement controlled
        this.posIncrementTail = true;
        this.posIncrementFin = true;
        this.swingingSpeed = 0.2;
        this.tailAngle = 0.0;
        this.finAngle = 0.0;
        this.lastT = 0.0;
        this.turningDirection = 0; // 0 for not turning, one for right, two for left
    }
    createMaterials() {

        // Textures
        this.finMaterial = new CGFappearance(this.scene);
        this.finMaterial.setAmbient(this.color[0], this.color[1], this.color[2], 1.0);
        this.finMaterial.setSpecular(this.color[0], this.color[1], this.color[2], 1.0);
        this.finMaterial.setDiffuse(this.color[0], this.color[1], this.color[2], 1.0);
        this.finMaterial.setShininess(10.0);
        this.finMaterial.setTexture(this.fishBodyTex);
        
        // Eyes
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
    createShaders() {
        this.fishBodyShader = new CGFshader(this.scene.gl, "./Shaders/FishBodyPart.vert", "./Shaders/FishBodyPart.frag");
        this.fishBodyShader.setUniformsValues({ scalesSampler : 0});
        this.fishBodyShader.setUniformsValues({ ratio : this.ratio });
        this.fishBodyShader.setUniformsValues({ r : this.color[0] });
        this.fishBodyShader.setUniformsValues({ g : this.color[1] });
        this.fishBodyShader.setUniformsValues({ b : this.color[2] });
    }
    createPieces() {
        this.body = new MyElipseSphere(this.scene, 16, 10, this.finMaterial,0.9,1.3,1.0);
        this.eye = new MyElipseSphere(this.scene,16,10,this.whiteMaterial,1,1,1);
        this.eyeBlackPart = new MyElipseSphere(this.scene,16,10,this.blackMaterial,1,1,1);
        this.fin = new MyTriangle(this.scene,this.finMaterial);
    }
    initBuffers() {
        this.body.initBuffers();
        this.eye.initBuffers();
        this.eyeBlackPart.initBuffers();
        this.fin.initBuffers();
    }
    display() {

        this.fishBodyTex.bind(0);

        // Whole fish
        this.scene.pushMatrix();
        this.scene.scale(0.5/0.9, 0.5/0.9, 0.5/0.9);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        
        // Body
        this.scene.setActiveShader(this.fishBodyShader);
        this.body.display();
        this.scene.setActiveShader(this.scene.defaultShader);

        // Eyes
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


        // Tail
        this.scene.pushMatrix();
        this.scene.scale(0.8,0.8,0.8)
        this.scene.translate(0,-3.0,0)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        // Animations
        this.scene.translate(-1.0, -1.0, 0.0);
        this.scene.rotate(Math.sin(this.tailAngle) / 3, 1, 0, 0); // Animation
        this.scene.rotate(-Math.sin(this.tailAngle) / 3, 0, 1, 0); // Animation
        this.scene.translate(1.0, 1.0, 0.0);

        this.fin.display();
        this.scene.popMatrix();


        // Top Fin
        this.scene.pushMatrix();
        this.scene.scale(0.6,0.6,0.6)
        this.scene.translate(0,-0.5,-1.25)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.fin.display();
        this.scene.popMatrix();


        // Bottom Fins
        this.scene.pushMatrix();
        this.scene.scale(0.3,0.3,0.3)
        this.scene.translate(3.5,0.3,2)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(-Math.PI/4,1,1,0);
        // Animation
        if (this.direction != 2) {
            this.scene.translate(1.0, 0.0, 0.0);
            this.scene.rotate(Math.sin(this.finAngle) / 1.5, 0, 1, 0);
            //this.scene.rotate(Math.sin(this.scene.time / 250) / 2.0, 0, 1, 0); // Animation
            this.scene.translate(-1.0, 0.0, 0.0);
        }
        this.fin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-0.3,0.3,0.3)
        this.scene.translate(3.5,0.3,2)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(-Math.PI/4,1,1,0);
        // Animation
        if (this.direction != 1) {
            this.scene.translate(1.0, 0.0, 0.0);
            this.scene.rotate(Math.sin(this.finAngle) / 1.5, 0, 1, 0);
            //this.scene.rotate(Math.sin(this.scene.time / 250) / 2.0, 0, 1, 0); // Animation
            this.scene.translate(-1.0, 0.0, 0.0);
        }
        this.fin.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.setDefaultAppearance();
    }
    displayBody() { // To enhance performance on selfMovingFish

        // Whole body transformations
        this.scene.pushMatrix();
        this.scene.scale(0.5/0.9, 0.5/0.9, 0.5/0.9);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.body.display();
        this.scene.popMatrix();
    }
    displayFins() { // To enhance performance on selfMovingFish

        // Whole body transformations
        this.scene.pushMatrix();
        this.scene.scale(0.5/0.9, 0.5/0.9, 0.5/0.9);
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        // Eyes
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


        // Tail
        this.scene.pushMatrix();
        this.scene.scale(0.8,0.8,0.8)
        this.scene.translate(0,-3.0,0)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        // Animations
        this.scene.translate(-1.0, -1.0, 0.0);
        this.scene.rotate(Math.sin(this.tailAngle) / 3, 1, 0, 0); // Animation
        this.scene.rotate(-Math.sin(this.tailAngle) / 3, 0, 1, 0); // Animation
        this.scene.translate(1.0, 1.0, 0.0);

        this.fin.display();
        this.scene.popMatrix();


        // Top Fin
        this.scene.pushMatrix();
        this.scene.scale(0.6,0.6,0.6)
        this.scene.translate(0,-0.5,-1.25)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.fin.display();
        this.scene.popMatrix();


        // Bottom Fins
        this.scene.pushMatrix();
        this.scene.scale(0.3,0.3,0.3)
        this.scene.translate(3.5,0.3,2)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(-Math.PI/4,1,1,0);
        // Animation
        if (this.direction != 2) {
            this.scene.translate(1.0, 0.0, 0.0);
            this.scene.rotate(Math.sin(this.finAngle) / 1.5, 0, 1, 0);
            //this.scene.rotate(Math.sin(this.scene.time / 250) / 2.0, 0, 1, 0); // Animation
            this.scene.translate(-1.0, 0.0, 0.0);
        }
        this.fin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-0.3,0.3,0.3)
        this.scene.translate(3.5,0.3,2)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(-Math.PI/4,1,1,0);
        // Animation
        if (this.direction != 1) {
            this.scene.translate(1.0, 0.0, 0.0);
            this.scene.rotate(Math.sin(this.finAngle) / 1.5, 0, 1, 0);
            //this.scene.rotate(Math.sin(this.scene.time / 250) / 2.0, 0, 1, 0); // Animation
            this.scene.translate(-1.0, 0.0, 0.0);
        }
        this.fin.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
    enableNormalViz() {
        this.body.enableNormalViz();
        this.eye.enableNormalViz(); 
        this.eyeBlackPart.enableNormalViz();
        this.fin.enableNormalViz();
    }
    disableNormalViz() {
        this.body.disableNormalViz();
        this.eye.disableNormalViz(); 
        this.eyeBlackPart.disableNormalViz();
        this.fin.disableNormalViz();
    }
    updateAnimationSpeeds(newSwingingSpeed, newDirection) {
        this.swingingSpeed = newSwingingSpeed;
        this.direction = newDirection; // Tells if the fish is going right or left
    }
    updateAnimations(t) {
        if (this.lastT == 0.0)
            this.lastT = t;
        if (this.posIncrementTail)
            this.tailAngle += this.swingingSpeed * (t - this.lastT) / 100;
        else
            this.tailAngle -= this.swingingSpeed * (t - this.lastT) / 100;

        if (this.posIncrementFin)
            this.finAngle += (t - this.lastT) / 400;
        else
            this.finAngle -= (t - this.lastT) / 1000;

        this.lastT = t;
    }   
}
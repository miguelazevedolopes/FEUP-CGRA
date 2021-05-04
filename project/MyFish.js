import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyElipseSphere } from './MyElipseSphere.js';
import { MyTriangle } from './MyTriangle.js';

export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.createMaterials();
        this.createPieces();
        this.createShaders();
    }
    createMaterials() {

        //Textures
        this.fishBodyTex = new CGFtexture(this.scene ,'./images/fish-scales-pattern-purple2.jpg');
        this.fishBodyTex.bind(0);

        //Fins (and Body)
        this.finMaterial = new CGFappearance(this.scene);
        this.finMaterial.setAmbient(1.0, 0.0, 1.0, 1.0);
        this.finMaterial.setDiffuse(1.0, 0.0, 1.0, 1.0);
        this.finMaterial.setSpecular(1.0, 0.0, 1.0, 1.0);
        this.finMaterial.setShininess(10.0);
        this.finMaterial.setTexture(this.fishBodyTex);
        
        //Eyes
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
        //Body
        this.fishBodyShader = new CGFshader(this.scene.gl, "./Shaders/FishBodyPart.vert", "./Shaders/FishBodyPart.frag");
        this.fishBodyShader.setUniformsValues({ scalesSampler : 0})
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
        this.scene.translate(-1.0, -1.0, 0.0);
        this.scene.rotate(Math.sin(this.scene.time / 100 % 100) / 4.0, 1, 0, 0);
        this.scene.rotate(-Math.sin(this.scene.time / 100 % 100) / 4.0, 0, 1, 0);
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
        this.scene.translate(3.2,0.3,2)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(-Math.PI/4,1,1,0);
        this.scene.translate(1.0, 0.0, 0.0);
        this.scene.rotate(Math.sin(this.scene.time / 250 % 100) / 2.0, 0, 1, 0);
        this.scene.translate(-1.0, 0.0, 0.0);
        this.fin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-0.3,0.3,0.3)
        this.scene.translate(3.2,0.3,2)
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(-Math.PI/4,1,1,0);
        this.scene.translate(1.0, 0.0, 0.0);
        this.scene.rotate(Math.sin(this.scene.time / 250 % 100) / 2.0, 0, 1, 0);
        this.scene.translate(-1.0, 0.0, 0.0);
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
}
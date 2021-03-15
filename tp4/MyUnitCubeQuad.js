import { CGFobject,CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene,top,front,right,back,left,bottom) {
        super(scene);
        this.initBuffers();
        this.topTexture= new CGFtexture(this.scene,top);
        this.frontTexture= new CGFtexture(this.scene,front);
        this.rightTexture= new CGFtexture(this.scene,right);
        this.backTexture= new CGFtexture(this.scene,back);
        this.leftTexture= new CGFtexture(this.scene,left);
        this.bottomTexture= new CGFtexture(this.scene,bottom);
        
        this.createMaterial();
    }
    initBuffers() {
        this.scene.quad = new MyQuad(this.scene);


    }
    createMaterial(){
        this.customMaterial = new CGFappearance(this.scene);
        this.customMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.customMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.customMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.customMaterial.setShininess(10.0);
    }
    changeFiltering() {
        if (this.enableLinearFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.5);
        this.changeFiltering();
        this.customMaterial.setTexture(this.frontTexture);
        this.customMaterial.apply()
        this.scene.quad.display();
        this.scene.popMatrix();
        
        //BOTTOM
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.changeFiltering();
        this.customMaterial.setTexture(this.backTexture);
        this.customMaterial.apply()
        this.scene.quad.display();
        this.scene.popMatrix();

        //FRONT
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0.5, 0.0, 0.0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.changeFiltering();
        this.customMaterial.setTexture(this.rightTexture);
        this.customMaterial.apply()
        this.scene.quad.display();
        this.scene.popMatrix();

        //BACK
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(-0.5, 0.0, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.changeFiltering();
        this.customMaterial.setTexture(this.leftTexture);
        this.customMaterial.apply()
        this.scene.quad.display();
        this.scene.popMatrix();

        //RIGHT
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0.0, 0.5, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.changeFiltering();
        this.customMaterial.setTexture(this.topTexture);
        this.customMaterial.apply()
        this.scene.quad.display();
        this.scene.popMatrix();

        //LEFT
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0.0, -0.5, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.changeFiltering();
        this.customMaterial.setTexture(this.bottomTexture);
        this.customMaterial.apply()
        this.scene.quad.display();
        this.scene.popMatrix();

        
    }
}
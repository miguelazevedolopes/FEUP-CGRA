import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, Ymais, Zmais, Xmais, Ymenos, Zmenos, Xmenos) {
        super(scene);
        this.Ymais = new CGFtexture(this.scene, Ymais);
        this.Zmais = new CGFtexture(this.scene, Zmais);
        this.Xmais = new CGFtexture(this.scene, Xmais);
        this.Ymenos = new CGFtexture(this.scene, Ymenos);
        this.Zmenos = new CGFtexture(this.scene, Zmenos);
        this.Xmenos = new CGFtexture(this.scene, Xmenos);
        this.enableLinearFiltering = false;
        this.initBuffers();
    }
    initBuffers() {
        this.scene.quad = new MyQuad(this.scene);

        //Material
        this.mat = new CGFappearance(this.scene);
        this.mat.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.mat.setDiffuse(0.9, 0.9, 0.9, 1.0);
        this.mat.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.mat.setShininess(10.0);

    }
    changeFiltering() {
        if (this.enableLinearFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else {
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
    }
    display() {

        //TOP
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.5);
        this.changeFiltering();
        this.mat.setTexture(this.Zmais);
        this.mat.apply()
        this.scene.quad.display();
        this.scene.popMatrix();
        
        //BOTTOM
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.changeFiltering();
        this.mat.setTexture(this.Zmenos);
        this.mat.apply()
        this.scene.quad.display();
        this.scene.popMatrix();

        //FRONT
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0.5, 0.0, 0.0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.changeFiltering();
        this.mat.setTexture(this.Xmais);
        this.mat.apply()
        this.scene.quad.display();
        this.scene.popMatrix();

        //BACK
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(-0.5, 0.0, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.changeFiltering();
        this.mat.setTexture(this.Xmenos);
        this.mat.apply()
        this.scene.quad.display();
        this.scene.popMatrix();

        //RIGHT
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0.0, 0.5, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.changeFiltering();
        this.mat.setTexture(this.Ymais);
        this.mat.apply()
        this.scene.quad.display();
        this.scene.popMatrix();

        //LEFT
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0.0, -0.5, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.changeFiltering();
        this.mat.setTexture(this.Ymenos);
        this.mat.apply()
        this.scene.quad.display();
        this.scene.popMatrix();
        
    }
}
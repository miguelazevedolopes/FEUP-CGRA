import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyCubeMap extends CGFobject {
    constructor(scene, Ymais, Zmais, Xmais, Ymenos, Zmenos, Xmenos) {
        super(scene);

        //Textures to use in each surface
        this.Ymais = new CGFtexture(this.scene, Ymais);
        this.Zmais = new CGFtexture(this.scene, Zmais);
        this.Xmais = new CGFtexture(this.scene, Xmais);
        this.Ymenos = new CGFtexture(this.scene, Ymenos);
        this.Zmenos = new CGFtexture(this.scene, Zmenos);
        this.Xmenos = new CGFtexture(this.scene, Xmenos);

        this.createMaterial();
        this.initBuffers();
    }
    initBuffers() {
        this.quad = new MyQuad(this.scene);
    }
    createMaterial() {
        //Material to use texture with
        this.Material = new CGFappearance(this.scene);
        this.Material.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.Material.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.Material.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.Material.setEmission(1.0, 1.0, 1.0, 1.0);
        this.Material.setShininess(10.0);
    }
    display() {

        //Expand and translate
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(50, 50, 50);
        
        //FRONT
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(0.0, 0.0, 0.5);
        this.Material.setTexture(this.Zmais);
        this.Material.apply();
        this.quad.display();
        this.scene.popMatrix();

        //BACK
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(0.0, 0.0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.Material.setTexture(this.Zmenos);
        this.Material.apply();
        this.quad.display();
        this.scene.popMatrix();

        //RIGHT
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(0.5, 0.0, 0.0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.Material.setTexture(this.Xmais);
        this.Material.apply();
        this.quad.display();
        this.scene.popMatrix();

        //LEFT
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(-0.5, 0.0, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.Material.setTexture(this.Xmenos);
        this.Material.apply();
        this.quad.display();
        this.scene.popMatrix();

        //TOP
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1 ,0);
        this.scene.translate(0.0, 0.5, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.Material.setTexture(this.Ymais);
        this.Material.apply();
        this.quad.display();
        this.scene.popMatrix();

        //BOTTOM
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1 ,0);
        this.scene.translate(0.0, -0.5, 0.0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.Material.setTexture(this.Ymenos);
        this.Material.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix(); //From global scaling and translate
        this.scene.setDefaultAppearance();
        
    }
    updateTextures(Ymais, Zmais, Xmais, Ymenos, Zmenos, Xmenos) {
        //Textures to use in each face
        this.Ymais = new CGFtexture(this.scene, Ymais);
        this.Zmais = new CGFtexture(this.scene, Zmais);
        this.Xmais = new CGFtexture(this.scene, Xmais);
        this.Ymenos = new CGFtexture(this.scene, Ymenos);
        this.Zmenos = new CGFtexture(this.scene, Zmenos);
        this.Xmenos = new CGFtexture(this.scene, Xmenos);
    }
}
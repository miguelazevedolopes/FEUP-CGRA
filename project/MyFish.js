import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.createMaterials();
        this.createPieces();
    }
    createMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1.0, 0.2, 0.0, 1.0);
        this.material.setDiffuse(1.0, 0.2, 0.0, 1.0);
        this.material.setSpecular(1.0, 0.2, 0.0, 1.0);
        this.material.setShininess(10.0);
    }
    createPieces() {
        this.body = new MySphere(this.scene, 16, 10, this.material);
    }
    initBuffers() {
        this.body.initBuffers();
    }
    display() {
        this.body.display();
    }
}
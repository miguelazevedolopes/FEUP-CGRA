import { CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.body = new MySphere(scene, 16, 10, 'images/earth.jpg');
    }
    initBuffers() {
        this.body.initBuffers();
    }
    display() {
        this.body.display();
    }
}
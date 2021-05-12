import { MyAlgae } from "./MyAlgae.js";

export class MyAlgaeSet {
    constructor(scene, n) {
        this.scene = scene;
        this.numberAlgae = n;
        this.createAlgae();
    }
    createAlgae() {
        this.algSet = [];

        for (let i = 0; i < this.numberAlgae; i++) {
            this.algSet.push(new MyAlgae(this.scene, 3, 1));
        }
    }
    display() {
        for (let i = 0; i < this.numberAlgae; i++) {
            this.scene.pushMatrix();
            this.algSet[i].display();
            this.scene.popMatrix();
        }
    }
}
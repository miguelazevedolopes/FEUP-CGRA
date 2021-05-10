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
            var algPos = [];
            algPos.push((Math.floor(Math.random() * 101) - 50), 0.0, (Math.floor(Math.random() * 101) - 50));
            this.algSet.push(new MyAlgae(this.scene, 3, 1, algPos,Math.floor(Math.random()*3)));
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
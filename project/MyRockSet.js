import { CGFappearance } from "../lib/CGF.js";
import { MyRock } from "./MyRock.js";

export class MyRockSet {
    constructor(scene) {
        this.scene = scene;
        this.numberRocks = 10;
        this.createRocks();
    }
    createRocks() {
        this.rockSet = [];

        for (let i = 0; i < this.numberRocks; i++) {
            this.rockSet.push(new MyRock(this.scene, 16, 10));
        }
    }
    display() {

        for (let i = 0; i < this.numberRocks; i++) {
            this.scene.pushMatrix();
            this.scene.translate(i, 0.0, 0.0);
            this.scene.scale(0.1, 0.1, 0.1);
            this.rockSet[i].display();
            this.scene.scale(10.0, 10.0, 10.0);
            this.scene.popMatrix();
        }
        
    }
}
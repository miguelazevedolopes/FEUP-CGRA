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
        this.rockPos = [];
        this.rockDeform = [];

        for (let i = 0; i < this.numberRocks; i++) {
            this.rockSet.push(new MyRock(this.scene, 16, 10));
            this.rockPos.push((Math.floor(Math.random() * 101) - 50) / 10.0, 0.0, (Math.floor(Math.random() * 101) - 50) / 10.0);
            this.rockDeform.push(Math.floor((Math.random() * 61) + 40) / 100, Math.floor((Math.random() * 41) + 20) / 100, Math.floor((Math.random() * 61) + 40)/ 100);
        }
    }
    display() {

        for (let i = 0; i < this.numberRocks; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.rockPos[i * 3], this.rockPos[i * 3 + 1], this.rockPos[i * 3 + 2]);
            this.scene.scale(this.rockDeform[i * 3], this.rockDeform[i * 3 + 1], this.rockDeform[i * 3 + 2]);
            this.scene.scale(0.1, 0.1, 0.1);
            this.rockSet[i].display();
            this.scene.popMatrix();
        }
        
    }
}
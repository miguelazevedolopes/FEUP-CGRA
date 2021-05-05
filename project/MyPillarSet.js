import { MyPillar } from "./MyPillar.js";
import { CGFappearance } from "../lib/CGF.js";

export class MyPillarSet {
    constructor(scene, n) {
        this.scene = scene;
        this.numberPillars = n;
        this.createPillars();
    }
    createPillars() {
        this.pillars = [];

        for (let i = 0; i + 1 < this.numberPillars; i += 2) {
            this.pillars.push(new MyPillar(this.scene, 16, i * 2, 1.5));
            this.pillars.push(new MyPillar(this.scene, 16, i * 2, -1.5));
            if (i + 1 == this.numberPillars) this.pillars.push(new MyPillar(this.scene, 16, i + 2, 0));
        }
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(3.0, 0.0, -2.0);
        for (let i = 0; i < this.numberPillars; i++) 
            this.pillars[i].display();   
        this.scene.popMatrix();
    }
}
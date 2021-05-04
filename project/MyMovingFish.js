import { MyFish } from "./MyFish.js";
import { MyMovingObject } from "./MyMovingObject.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene) {
        super(scene, new MyFish(scene));
    }
    up() {
        if (this.coordinates[1] < 7.5) //TODO Change limits
            this.coordinates[1] += 0.1;
    }
    down() {
        if (this.coordinates[1] > 1.5)
            this.coordinates[1] -= 0.1;
    }
}
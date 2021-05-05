import { MyFish } from "./MyFish.js";
import { MyMovingObject } from "./MyMovingObject.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene) {
        super(scene, new MyFish(scene));
        this.coordinates[1] = 5.0;
        this.turning = 0;
    }
    up() {
        if (this.coordinates[1] < 5.0) //TODO Change limits
            this.coordinates[1] += 0.1;
    }
    down() {
        if (this.coordinates[1] > 0.0)
            this.coordinates[1] -= 0.1;
    }
    update() {
        super.update();
        if (this.speed < 0.1) 
            this.object.updateAnimations(this.speed + 0.4, this.turning);
        else
            this.object.updateAnimations(this.speed * 4.0, this.turning);
        this.turning = 0;
    }
    turn(val) {
        super.turn(val);
        if (val > 0) this.turning = 2;
        else this.turning = 1;
    }
}
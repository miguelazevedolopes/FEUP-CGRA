import { MyMovingFish } from "./MyMovingFish.js";

export class MySelfMovingFish extends MyMovingFish {
    constructor(scene, ratio, period, coords, texture, material){
        super(scene, ratio, texture, material);
        this.coordinates = coords;
        this.coordinates[0] -= 5;
        this.period = period;
        this.material = material;
        this.lastT2 = 0.0;
    }
    update(t) {
        super.update(t);
        if (this.lastT2 == 0.0)
            this.lastT2 = t;
        super.setVelocity(2 * Math.PI * 5 / (this.period * (1000 / (t - this.lastT2))));
        super.turn(2 * Math.PI / (this.period * (1000 / (t - this.lastT2))));
        this.lastT2 = t;
    }
    display() {
        super.display();
    }

}
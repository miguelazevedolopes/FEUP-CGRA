import { MyMovingFish } from "./MyMovingFish.js";

export class MySelfMovingFish extends MyMovingFish {
    constructor(scene, ratio, period, coords, texture, material){
        super(scene, ratio, texture, material);
        this.coordinates = coords;
        this.coordinates[0] -= 5;
        this.period = period;
        this.material = material;
        this.lastT = 0.0;
    }
    update() {
        super.update();
        if (this.lastT == 0.0)
            this.lastT = this.scene.time;
        
        super.setVelocity(2 * Math.PI * 5 / (this.period * (1000 / (this.scene.time - this.lastT))));
        super.turn(2 * Math.PI / (this.period * (1000 / (this.scene.time - this.lastT))));
        this.lastT = this.scene.time;
    }
    display() {
        super.display();
    }

}
import { MyFish } from "./MyFish.js";
import { MyMovingObject } from "./MyMovingObject.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene) {
        super(scene, new MyFish(scene));
        this.coordinates[1] = 5.0;
        this.turning = 0; // For animations
        this.hasRock = false;
        this.rock = null;
    }
    up() {
        if (this.coordinates[1] < 5.0) 
            this.coordinates[1] += 0.1;
    }
    down() {
        if (this.coordinates[1] > 0.40)
            this.coordinates[1] -= 0.1;
    }
    update() {
        super.update();

        // Updates animations
        this.updateAnimations();

        // Updates the Rocks position
        this.updateRockPos();
    }
    updateAnimations() {
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
    catchRock() {
        if (this.coordinates[1] <= 0.40 && !this.hasRock) 
            this.rock = this.scene.rockSet.rocksInRange(this.coordinates);
        if (this.rock != null) this.hasRock = true;
    }
    updateRockPos() {
        if (this.hasRock) {
            var rockNewPos = [];
            rockNewPos.push(this.coordinates[0] + 0.75 * Math.sin(this.orientationAngle), this.coordinates[1], this.coordinates[2] + 0.75 * Math.cos(this.orientationAngle)); // Position moving
            this.rock.setPos(rockNewPos);
        }
    }
    reset() {
        super.reset();
        if (this.hasRock) {
            this.hasRock = false;
            this.rock.setPos(this.rock.startingCoords);
            this.rock = null;
        }
    }
}
import { MyFish } from "./MyFish.js";
import { MyMovingObject } from "./MyMovingObject.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene, ratio, texture, material) {
        super(scene, new MyFish(scene, ratio, texture, material));
        this.coordinates[1] = 5.0;
        this.turning = 0; // For animations
        this.hasRock = false;
        this.rock = null;
        this.throwing=false;
        this.lastT = 0.0;
    }
    up() {
        if (this.coordinates[1] < 5.0) 
            this.coordinates[1] += 0.1;
    }
    down() {
        if (this.coordinates[1] > 0.40)
            this.coordinates[1] -= 0.1;
    }
    update(t) {
        super.update(t);

        if (this.lastT == 0.0)
            this.lastT == t;

        // Updates animations
        this.updateAnimations();
        this.object.updateAnimations(t);

        // Update speed of the falling rock
        this.vy += this.ay * (t - this.lastT) / 1000;
        this.vx = this.baseSpeedx * (t - this.lastT) / 1000;
        this.vz = this.baseSpeedz * (t - this.lastT) / 1000;

        this.lastT = t;

        // Updates the Rocks position
        this.updateRockPos();
    }
    updateAnimations() {
        if (this.speed < 0.1) 
            this.object.updateAnimationSpeeds(this.speed + 0.4, this.turning);
        else
            this.object.updateAnimationSpeeds(this.speed * 4.0, this.turning);
        this.turning = 0;
    }
    turn(val) {
        super.turn(val);
        if (val > 0) this.turning = 2;
        else this.turning = 1;
    }
    handleRock() {
        if (this.coordinates[1] <= 0.40 && !this.hasRock){
            this.rock = this.scene.rockSet.rocksInRange(this.coordinates);
            if (this.rock != null) this.hasRock = true;
        } else if (this.coordinates[1] <= 0.40 && this.hasRock && this.scene.nest.distanceFromCenter(this.coordinates) <= this.scene.nest.radius){
            this.rock.coords = [this.rock.coords[0],0,this.rock.coords[2]];
            this.hasRock = false;
            this.rock = null;
        } else if (this.coordinates[1] == 5.0 && this.hasRock && this.scene.nest.distanceFromCenter(this.coordinates) <= this.scene.nest.radius + 5){
            console.log("Yeeted\n");
            this.throwing = true;
            this.hasRock = false;
            let distCoords = this.scene.nest.distanceFromCenterCoords(this.rock.coords);
            this.vy = 0;
            this.vx = 0;
            this.vy = 0;
            this.baseSpeedx = distCoords[0];
            this.baseSpeedz = distCoords[2];
            this.ay = -1.5; // Real acceleration
        }
    }  
    updateRockPos() {
        if (this.hasRock) 
            this.rock.coords = [this.coordinates[0] + 0.75 * Math.sin(this.orientationAngle), this.coordinates[1], this.coordinates[2] + 0.75 * Math.cos(this.orientationAngle)];
        else if (this.throwing){
            this.rock.coords = [this.rock.coords[0] + this.vx, this.rock.coords[1] + this.vy, this.rock.coords[2] + this.vz];
            if (this.rock.coords[1] <= 0.0) {
                this.throwing = false;
                this.rock.coords[1] = 0.0;
            }
        }
    }
    reset() {
        super.reset();
        this.coordinates[1] = 5.0;
        if (this.hasRock) {
            this.hasRock = false;
            this.rock.coords = this.rock.startingCoords;
            this.rock = null;
        }
    }
}
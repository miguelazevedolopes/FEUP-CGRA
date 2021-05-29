import { MyFish } from "./MyFish.js";
import { MyMovingObject } from "./MyMovingObject.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene, ratio, texture, material) {
        super(scene, new MyFish(scene, ratio, texture, material));
        this.coordinates[1] = 5.0;
        this.turning = 0; // For animations
        this.hasRock = false; // No rock initially 
        this.rock = null; // No rock initially 
        this.throwing = false; // In the middle of a rock throw
        this.lastT = 0.0; // Instant of last update event
    }
    up() { // Move up(P)
        if (this.coordinates[1] < 5.0) 
            this.coordinates[1] += 0.1;
    }
    down() { // Move down(L)
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

        // Update speeds of the falling rock
        this.dy += this.ay * ((t - this.lastT) / 1000)* ((t - this.lastT) / 1000);
        this.dx = this.baseSpeedx * (t - this.lastT) / 1000;
        this.dz = this.baseSpeedz * (t - this.lastT) / 1000;

        this.lastT = t;

        // Updates the Rocks position
        this.updateRockPos();
    }
    updateAnimations() { // Used for the tail and fins animations variations
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
        if (this.coordinates[1] <= 0.40 && !this.hasRock) { // Pick rock up
            this.rock = this.scene.rockSet.rocksInRange(this.coordinates);
            if (this.rock != null) this.hasRock = true;
        } else if (this.coordinates[1] <= 0.40 && this.hasRock && this.scene.nest.distanceFromCenter(this.coordinates) <= this.scene.nest.radius) { // Drop rock
            this.rock.coords = this.rock.nestCoords;
            this.hasRock = false;
            this.rock = null;
        } else if (this.coordinates[1] == 5.0 && this.hasRock && this.scene.nest.distanceFromCenter(this.coordinates) <= this.scene.nest.radius + 5){ // Throw rock
            this.throwing = true;
            this.hasRock = false;
            let distCoords = this.scene.nest.distanceFromCenterCoords(this.rock.coords);
            this.dy = 0;
            this.dx = 0;
            this.dy = 0;
            this.baseSpeedx = distCoords[0]/2; // Real speed in x
            this.baseSpeedz = distCoords[2]/2; // Real speed in z
            this.ay = -2.5; // Real acceleration
        }
    }  
    updateRockPos() {
        // Rock stays in fish's mouth
        if (this.hasRock) 
            this.rock.coords = [this.coordinates[0] + 0.75 * Math.sin(this.orientationAngle), this.coordinates[1], this.coordinates[2] + 0.75 * Math.cos(this.orientationAngle)];
        else if (this.throwing) { // Updates rock position in a parabollical trajectory until it lands the nest (horizontal throw style)
            this.rock.coords = [this.rock.coords[0] + this.dx, this.rock.coords[1] + this.dy, this.rock.coords[2] + this.dz];
            if (this.rock.coords[1] <= 0.0) { // If it has hit the ground
                this.throwing = false;
                this.rock.coords[1] = 0.0;
            }
        }
    }
    reset() {
        super.reset();
        this.coordinates[1] = 5.0;
        if (this.hasRock) { // Resets rock position if Reset is clicked and fish is carrying a rock
            this.hasRock = false;
            this.rock.coords = this.rock.startingCoords;
            this.rock = null;
        }
    }
}
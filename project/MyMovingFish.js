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
    update() {
        super.update();

        if (this.lastT == 0.0)
            this.lastT == this.scene.time;

        

        // Updates animations
        this.updateAnimations();

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
        }
        else if(this.coordinates[1] <= 0.40 && this.hasRock && this.scene.nest.distanceFromCenter(this.coordinates)<=this.scene.nest.radius){
            this.rock.setPos([this.rock.coords[0],0,this.rock.coords[2]])
            this.hasRock=false;
            this.rock=null;
        }
        else if(this.coordinates[1] == 5.0 && this.hasRock && this.scene.nest.distanceFromCenter(this.coordinates)<=this.scene.nest.radius+5){
            this.throwing=true;
            this.vx=distanceFromCenter(this.coordinates)/2.0;
            this.vy=0;
            this.ay=-2.5;
            
        }
    }  
    updateRockPos() {
        if (this.hasRock) {
            /* var rockNewPos = [];
            rockNewPos.push(this.coordinates[0] + 0.75 * Math.sin(this.orientationAngle), this.coordinates[1], this.coordinates[2] + 0.75 * Math.cos(this.orientationAngle)); // Position moving */
            this.rock.setPos([this.coordinates[0] + 0.75 * Math.sin(this.orientationAngle), this.coordinates[1], this.coordinates[2] + 0.75 * Math.cos(this.orientationAngle)]);
        }
        else if(this.throwing){
            var rockNewPos = [];
            /* let ratio = this.coordinates[0] / (this.coordinates[0] + this.coordinates[2]);
            rockNewPos.push(this.rock.coordinates[0]+ this.vx * ratio,) */
        }

    }
    reset() {
        super.reset();
        this.coordinates[1] = 5.0;
        if (this.hasRock) {
            this.hasRock = false;
            this.rock.setPos(this.rock.startingCoords);
            this.rock = null;
        }
    }
}
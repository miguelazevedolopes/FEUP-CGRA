
import { MyBigRock } from "./MyBigRock.js";

export class MyNest {
    constructor(scene,center,radius,noRocks){
        this.scene = scene;
        this.center = center;
        this.radius = radius;
        this.noRocks = noRocks;
        this.rock = new MyBigRock(this.scene, [this.center[0], this.center[1] - 0.5, this.center[2] + this.radius]);
    }
    display() {
        this.scene.pushMatrix();
        for (let i = 0; i < this.noRocks; i++) {
            this.rock.display();
            this.scene.rotate(Math.PI / 6, 0, 1, 0);
        }
        this.scene.popMatrix();
    }
    distanceFromCenter(fishCoords){
        return Math.sqrt(Math.pow(fishCoords[0]-this.center[0],2)+Math.pow(fishCoords[2]-this.center[2],2));
    }
}
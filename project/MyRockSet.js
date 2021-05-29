import { MyRock } from "./MyRock.js";

export class MyRockSet {
    constructor(scene, n) {
        this.scene = scene;
        this.numberRocks = n;
        this.createRocks();
    }
    createRocks() {
        this.rockSet = [];

        for (let i = 0; i < this.numberRocks; i++) {
            var rockPos = [];
            var rockDeform = [];
            rockPos.push((Math.floor(Math.random() * 51) - 25), 0.0, (Math.floor(Math.random() * 51) - 25)); // Random position

            // Checks if it is inside the nest, it can't be
            while(this.scene.nest.distanceFromCenter(rockPos) <= this.scene.nest.radius + 0.5) {
                rockPos = [(Math.floor(Math.random() * 51) - 25), 0.0, (Math.floor(Math.random() * 51) - 25)];
            }
            rockDeform.push(Math.floor((Math.random() * 51) + 50) / 100, Math.floor((Math.random() * 41) + 20) / 100,
             Math.floor((Math.random() * 51) + 50)/ 100); // Random shape
            this.rockSet.push(new MyRock(this.scene, 16, 10, rockPos, rockDeform));
        }
    }
    display() {

        for (let i = 0; i < this.numberRocks; i++) {
            this.scene.pushMatrix();
            this.rockSet[i].display();
            this.scene.popMatrix();
        }
    }
    rocksInRange(coords) { // To check if there is any rock near coords (used for fish)
        for (let i = 0; i < this.numberRocks; i++) {
            if (Math.sqrt(Math.pow(this.rockSet[i].coords[0] - coords[0], 2) + Math.pow(this.rockSet[i].coords[2] - coords[2], 2)) < 1.5) // Euclidian Distance
                return this.rockSet[i];
        }  
        return null;
    }
}
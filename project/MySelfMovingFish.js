import { MyMovingFish } from "./MyMovingFish.js";

export class MySelfMovingFish extends MyMovingFish {
    constructor(scene, ratio, period, coords, texture, material){
        super(scene, ratio, texture, material);
        this.coordinates = coords;
        this.coordinates[0] -= 5; // Center minus radius
        this.period = period; // Period of a full cirfunference
        this.material = material;
        this.lastT2 = 0.0; // Last instant of update
    }
    update(t) {
        super.update(t);
        if (this.lastT2 == 0.0)
            this.lastT2 = t;
        super.setVelocity(2 * Math.PI * 5 / (this.period * (1000 / (t - this.lastT2)))); // Sets velocity and turning angle
        super.turn(2 * Math.PI / (this.period * (1000 / (t - this.lastT2)))); // Calculated through the period of the turn and the time interval since last update
        this.lastT2 = t; // Update last instant of update
    }
    // Used to minimize shader activation, passing that responsability up the chain
    displayBody() {
        this.scene.pushMatrix();

        // Copy of the instructions in super
        //Rotates and travels depending on its orientation and position
        this.scene.translate(this.coordinates[0], this.coordinates[1], this.coordinates[2]);
        this.scene.rotate(this.orientationAngle, 0, 1, 0);
        //Interface Scale Factor
        this.scene.scale(this.scene.movScaleFactor, this.scene.movScaleFactor, this.scene.movScaleFactor);

        this.object.displayBody();

        this.scene.popMatrix();
    }
    // Used to minimize shader activation, passing that responsability up the chain
    displayFins() {
        this.scene.pushMatrix();

        // Copy of the instructions in super
        //Rotates and travels depending on its orientation and position
        this.scene.translate(this.coordinates[0], this.coordinates[1], this.coordinates[2]);
        this.scene.rotate(this.orientationAngle, 0, 1, 0);
        //Interface Scale Factor
        this.scene.scale(this.scene.movScaleFactor, this.scene.movScaleFactor, this.scene.movScaleFactor);

        this.object.displayFins();

        this.scene.popMatrix();
    }
    display() { 
        super.display();
    }

}
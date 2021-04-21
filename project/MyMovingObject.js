import {CGFobject, CGFappearance} from '../lib/CGF.js';
/**
* MyMovingObject
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, object) {
        super(scene);
        this.object=object;

        //Movement variables
        this.orientationAngle = 0.0;
        this.speed = 0.0;
        this.coordinates = [0.0, 0.0, 0.0];

        //For the interface scale
        this.scaleFactor = 1;

        //For the interface speed
        this.speedFactor = 1;

        this.initBuffers();
        this.createMaterial();
    }
    initBuffers() {
        this.object.initBuffers();
    }
    createMaterial() {
        //BLUE
        this.MaterialBlue = new CGFappearance(this.scene);
        this.MaterialBlue.setAmbient(0.2, 0.2, 0.9, 1.0);
        this.MaterialBlue.setDiffuse(0.2, 0.2, 0.9, 1.0);
        this.MaterialBlue.setSpecular(0.2, 0.2, 0.9, 1.0);
        this.MaterialBlue.setShininess(10.0);
    }
    display() {
        this.update(); //Update position

        this.scene.pushMatrix();

        //Rotates and travels depending on its orientation and position
        this.scene.translate(this.coordinates[0], this.coordinates[1], this.coordinates[2]);
        this.scene.rotate(this.orientationAngle, 0, 1, 0);

        //Interface Scale Factor
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        //Initial rotate
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        //Coloring
        this.MaterialBlue.apply();

        this.object.display();

        this.scene.popMatrix();
    }
    update() {
        //Update position with terms to speed and orientation
        this.coordinates[0] += this.speed*this.speedFactor*Math.sin(this.orientationAngle);
        this.coordinates[2] += this.speed*this.speedFactor*Math.cos(this.orientationAngle);
    }
    turn(val) {
        //Changes orientation
        this.orientationAngle += val;
        this.orientationAngle %= 2*Math.PI;
    }
    accelerate(val) {
        //Increases speed
        this.speed += val;
    }
    reset() {
        //Resets initial position
        this.speed = 0.0;
        this.orientationAngle = 0.0;
        this.coordinates = [0.0, 0.0, 0.0];
    }
    updateScaleFactor(newScaleFactor) {//For the interface Scale Factor 
        this.scaleFactor = newScaleFactor;
    }
    updateSpeedFactor(newSpeedFactor) { //For the interface Speed Factor
        this.speedFactor = newSpeedFactor;
    }
}



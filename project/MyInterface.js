import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Objects
        var objectsFolder = this.gui.addFolder('Objects');
        objectsFolder.add(this.scene, 'displayMovingObject').name('Display Moving Object');
        objectsFolder.add(this.scene, 'displaySphere').name('Display Sphere');
        objectsFolder.add(this.scene, 'displayCubeMap').name('Display Cube Map');
        objectsFolder.add(this.scene, 'displayCylinder').name('Display Cylinder');

        //Textures
        this.gui.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Selected Texture').onChange(this.scene.updateAppliedTexture.bind(this.scene));
   
        //Scaling of the moving object
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor').onChange(this.scene.updateMovingObjectScale.bind(this.scene));

        //Speed Factor 
        this.gui.add(this.scene, 'speedFactor', 0.5, 3).name('Speed Factor').onChange(this.scene.updateSpeedFactor.bind(this.scene));

        //Initiate reading keyboard
        this.initKeys();

        return true;
    }
    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function(){};

        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }


    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    };


    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    };


    isKeyPressed(keyCode) {
        if( this.activeKeys[keyCode] === true && (keyCode == "keyL" || keyCode == "keyP")) {
            this.activeKeys[keyCode] = false;
            return true;
        }  
        return this.activeKeys[keyCode] || false;
    }
}
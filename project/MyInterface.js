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

        //Parts (select all part A or all part B)
        this.gui.add(this.scene, 'selectedPart', this.scene.parts).name('Selected Part').onChange(this.scene.updatePart.bind(this.scene));

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        
        // Part A
        var objectsFolderA = this.gui.addFolder('Objects - Part A');
        objectsFolderA.add(this.scene, 'displayMovingObject').name('Display Moving Object');
        objectsFolderA.add(this.scene, 'displaySphere').name('Display Sphere');
        objectsFolderA.add(this.scene, 'displayCubeMap').name('Display Cube Map');
        objectsFolderA.add(this.scene, 'displayCylinder').name('Display Cylinder');
 
        // Part B
        var objectsFolderB = this.gui.addFolder('Objects - Part B');
        objectsFolderB.add(this.scene, 'displayMainFish').name('Display Main Fish');
        objectsFolderB.add(this.scene, 'displayFloor').name('Display Floor');
        objectsFolderB.add(this.scene, 'displayNest').name('Display Nest');
        objectsFolderB.add(this.scene, 'displayWaterSurface').name('Display Water Surface');
        objectsFolderB.add(this.scene, 'displayRocks').name('Display Rocks');
        objectsFolderB.add(this.scene, 'displayPillars').name('Display Pillars');
        objectsFolderB.add(this.scene, 'displayOtherFish').name('Display Other Fish');
        objectsFolderB.add(this.scene, 'displayAlgae').name('Display Algae');

        
        //Textures for cubemap
        this.gui.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Selected Texture').onChange(this.scene.updateAppliedTexture.bind(this.scene));
        
        //Scaling of the moving objects
        this.gui.add(this.scene, 'movScaleFactor', 0.5, 3).name('Moving O. Scale Factor');

        //Speed Factor for the moving objects
        this.gui.add(this.scene, 'movSpeedFactor', 0.5, 3).name('Moving O. Speed Factor');

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
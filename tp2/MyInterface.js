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
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');


        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Show yellow polygon
        this.gui.add(this.scene.tangram, 'displayYellow').name('Display Yellow');

        //Show pink polygon
        this.gui.add(this.scene.tangram, 'displayPink').name('Display Pink');

        //Show blue polygon
        this.gui.add(this.scene.tangram, 'displayBlue').name('Display Blue');

        //Show orange polygon
        this.gui.add(this.scene.tangram, 'displayOrange').name('Display Orange');

        //Show red polygon
        this.gui.add(this.scene.tangram, 'displayRed').name('Display Red');

        //Show purple polygon
        this.gui.add(this.scene.tangram, 'displayPurple').name('Display Purple');

        //Show green polygon
        this.gui.add(this.scene.tangram, 'displayGreen').name('Display Green');

        return true;
    }
}
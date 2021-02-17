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

        //Checkbox for Diamond
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');

        //Checkbox for MyTriangle
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');

        //Chekcbox for Parallelogram
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelogram');

        //Checkbox for TriangleBig
        this.gui.add(this.scene, 'displayTriangleBig').name('Display Big Triangle');

        //Checkbox for TriangleSmall
        this.gui.add(this.scene, 'displayTriangleSmall').name('Display Small Triangle');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}
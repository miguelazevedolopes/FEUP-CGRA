import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        
        
        this.diamond = new MyDiamond(scene);
        this.smallTriangle = new MyTriangleSmall(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangle = new MyTriangle(scene);
        this.bigTriangle = new MyTriangleBig(scene);

        this.displayYellow = true;
        this.displayPink = true;
        this.displayBlue = true;
        this.displayOrange = true;
        this.displayRed = true;
        this.displayPurple = true;
        this.displayGreen = true;
    }
    
    display(){
        this.scene.pushMatrix();

        var translateDiamond = 
        [1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 1.0, 0.0, 1.0];
        
        this.scene.multMatrix(translateDiamond);
        this.scene.setGreenAppearance();
        if (this.displayGreen)
            this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1,-1,-1);
        this.scene.rotate(Math.PI,1,0,0)
        this.scene.setYellowAppearance();
        if(this.displayYellow) this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,0,0);
        this.scene.setPurpleAppearance();
        if(this.displayPurple) this.smallTriangle.display()
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(3)/3,-Math.sqrt(2),0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.setOrangeAppearance();
        if(this.displayOrange) this.bigTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-Math.sqrt(8),0);
        this.scene.setDefaultAppearance();
        if(this.displayBlue) this.bigTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2,-Math.sqrt(8)+1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.setRedAppearance();
        if(this.displayPurple) this.smallTriangle.display()
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1,2.4,0);
        this.scene.rotate(Math.PI/2/2,0,0,1);
        this.scene.setPinkAppearance();
        if(this.displayPink) this.triangle.display()
        this.scene.popMatrix();

        
    }
    
}
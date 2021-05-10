import {MyMovingFish} from "./MyMovingFish.js";
import { CGFobject} from '../lib/CGF.js';

export class MySelfMovingFish{
    constructor(scene,period){
        this.scene=scene;
        this.period=10;
        this.fish=new MyMovingFish(this.scene);
        this.fish.setVelocity(1);
    }
    update(){
        this.fish.turn(Math.PI*2/10);
    }
    display(){
        this.update();
        this.scene.pushMatrix();
        this.scene.translate(0,-1,0);
        this.fish.display();
        this.scene.popMatrix();
    }
}
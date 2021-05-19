
import { MyBigRock } from "./MyBigRock.js";

export class MyNest {
    constructor(scene,center,radius){
        this.scene=scene;
        this.center=center;
        this.radius=radius;
        this.initialize();
    }
    initialize(){
        this.rock= new MyBigRock(this.scene,[this.center[0],this.center[1],this.center[2]+this.radius]);
    }
    display(){
        this.rock.display();
    }
    distanceFromCenter(fishCoords){
        return Math.sqrt(Math.pow(fishCoords[0]-this.center[0],2)+Math.pow(fishCoords[2]-this.center[2],2));
    }
}
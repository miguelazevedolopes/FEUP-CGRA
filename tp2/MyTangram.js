import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond=new MyDiamond(scene);
        this.initBuffers();
        
    }
    initBuffers() {
        this.initGLBuffers();
    }
    display(){
        this.scene.p
        this.diamond.display(); 
    }
    
}
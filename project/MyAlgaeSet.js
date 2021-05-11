import { MyAlgae } from "./MyAlgae.js";

export class MyAlgaeSet {
    constructor(scene, n) {
        this.scene = scene;
        this.numberAlgae = n;
        this.counter=0;
        this.createAlgae();
    }
    createAlgae() {
        this.algSet = [];

        for (let i = 0; i < this.numberAlgae; i++) {
            var algPos = [];
            algPos.push(Math.random()*50-24);
            algPos.push(0.0);
            algPos.push(Math.random()*50-24);
            for(let j=0;j<(Math.floor(Math.random()*10)+5);j++){
                this.algSet.push(new MyAlgae(this.scene, 3, 1, algPos));
                algPos[0]+=(Math.random()*3-2);
                algPos[1]-=Math.random()*1*0.2;
                algPos[2]+=(Math.random()*3-2);
                console.log(algPos[0])
                console.log(algPos[1])
                console.log(algPos[2])
                this.counter++;
                console.log(this.counter);
            }
        }
    }
    display() {
        for (let i = 0; i < this.counter; i++) {
            this.scene.pushMatrix();
            this.algSet[i].display();
            this.scene.popMatrix();
        }
    }
}
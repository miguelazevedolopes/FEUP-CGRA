import { MySelfMovingFish } from "./MySelfMovingFish.js";
import { CGFappearance } from '../lib/CGF.js';

export class MyFishFleet {
    constructor(scene, noFish) {
        this.scene = scene;
        this.noFish = noFish;
        this.createMaterials();
        this.createFishes();
    }
    createMaterials() {
        this.materials = [];
        this.textures = [];
        this.color = [];

        this.color.push([0.2, 0.2, 0.2]);
        this.textures[0] = './images/fish-scales-pattern-grey.jpg';

        this.color.push([0.5, 1.0, 0.0]);
        this.textures[1] = './images/fish-scales-pattern-orange.jpg';

        this.color.push([0.5, 0.5, 0.8]);
        this.textures[2] = './images/fish-scales-pattern-yellow.jpg';
    }
    createFishes() {
        this.fishes = [];
        for (let i = 0; i < this.noFish; i++) {
            this.fishes.push(new MySelfMovingFish(this.scene, Math.random() * 0.5 + 0.05, 10, [Math.random() * 35 - 17, Math.random() * 4 + 1, Math.random() * 35 - 17],
             this.textures[i % 3], this.color[i % 3]));
        }
    }
    display() {
        for (let i = 0; i < this.noFish; i++)
            this.fishes[i].display();
    }
}
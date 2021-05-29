import { MySelfMovingFish } from "./MySelfMovingFish.js";
import { CGFshader } from '../lib/CGF.js';

export class MyFishFleet {
    constructor(scene, noFish) {
        this.scene = scene;
        this.noFish = noFish;
        this.createMaterials();
        this.createShaders();
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
    createShaders() {
        this.fishBodyShader = new CGFshader(this.scene.gl, "./Shaders/FishBodyPart.vert", "./Shaders/FishBodyPart.frag");
        this.fishBodyShader.setUniformsValues({ scalesSampler : 0});
        this.fishBodyShader.setUniformsValues({ ratio : Math.random() * 0.5 + 0.05 });
        this.fishBodyShader.setUniformsValues({ r : 0.8 });
        this.fishBodyShader.setUniformsValues({ g : 0.8 });
        this.fishBodyShader.setUniformsValues({ b : 0.8 });
    }
    createFishes() {
        this.fishes = [];
        for (let i = 0; i < this.noFish; i++) { // Random positions and head/body ratios
            this.fishes.push(new MySelfMovingFish(this.scene, Math.random() * 0.5 + 0.05, 10, [Math.random() * 30 - 15, Math.random() * 4 + 1, Math.random() * 30 - 15],
             this.textures[i % 3], this.color[i % 3]));
        }
    }
    update(t) {
        for (let i = 0; i < this.noFish; i++)
            this.fishes[i].update(t);
    }
    display() {
        for (let i = 0; i < this.noFish; i++) {
            this.scene.setActiveShader(this.fishBodyShader);
            this.fishes[i].displayBody();
            this.scene.setActiveShader(this.scene.defaultShader);
            this.fishes[i].displayFins();
        }
        /* for (let i = 0; i < this.noFish; i++) { // Shaders activated multiple times, more colours, a little less performance
            this.fishes[i].display();
        } */
    }
}
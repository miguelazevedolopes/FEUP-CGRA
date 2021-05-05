import { CGFobject, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
import { MyPlane } from "./MyPlane.js";

export class MyWaterSurface extends CGFobject {
    constructor(scene) {
        super(scene);
        //this.quad = new MyQuad(this.scene);
        this.quad = new MyPlane(this.scene,200);
        this.createShaders();
    }
    createShaders() {
        this.waterTex = new CGFtexture(this.scene, "./images/pier.jpg");
        this.distortionTex = new CGFtexture(this.scene, "./images/distortionmap.png");
        this.waterSurfaceShader = new CGFshader(this.scene.gl, "./shaders/WaterSurface.vert", "./shaders/WaterSurface.frag");
        this.waterSurfaceShader.setUniformsValues( { uSamplerPier : 0 } );
        this.waterSurfaceShader.setUniformsValues( { uSamplerDistortion : 1 } );
    }
    display() {

        this.waterSurfaceShader.setUniformsValues( { timeFactor : this.scene.time / 100 % 100})
        this.waterTex.bind(0);
        this.distortionTex.bind(1);
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.waterSurfaceShader);
        this.scene.translate(0, 10, 0);
        this.scene.scale(10, 1, 10);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
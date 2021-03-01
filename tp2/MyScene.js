import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.unitCube = new MyUnitCube(this);
    this.tangram = new MyTangram(this);
    this.unitCubeQuad = new MyUnitCubeQuad(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 112, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() { //Blue objects
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  setPurpleAppearance() {
    this.setAmbient(0.7, 0.1, 1.0, 1.0);
    this.setDiffuse(0.7, 0.1, 1.0, 1.0);
    this.setSpecular(0.7, 0.1, 1.0, 1.0);
    this.setShininess(10.0);
  }
  setPinkAppearance() {
    this.setAmbient(1.0, 0.4, 0.7, 1.0);
    this.setDiffuse(1.0, 0.4, 0.7, 1.0);
    this.setSpecular(1.0, 0.4, 0.7, 1.0);
    this.setShininess(10.0);
  }
  setYellowAppearance() {
    this.setAmbient(1.0, 1.0, 0.0, 1.0);
    this.setDiffuse(1.0, 1.0, 0.0, 1.0);
    this.setSpecular(1.0, 1.0, 0.0, 1.0);
    this.setShininess(10.0);
  }
  setOrangeAppearance() {
    this.setAmbient(1.0, 0.5, 0.0, 1.0);
    this.setDiffuse(1.0, 0.5, 0.0, 1.0);
    this.setSpecular(1.0, 0.5, 0.0, 1.0);
    this.setShininess(10.0);
  }
  setRedAppearance() {
    this.setAmbient(1.0, 0.0, 0.0, 1.0);
    this.setDiffuse(1.0, 0.0, 0.0, 1.0);
    this.setSpecular(1.0, 0.0, 0.0, 1.0);
    this.setShininess(10.0);
  }
  setGreenAppearance() {
    this.setAmbient(0.0, 1.0, 0.0, 1.0);
    this.setDiffuse(0.0, 1.0, 0.0, 1.0);
    this.setSpecular(0.0, 1.0, 0.0, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();
  

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    var unitCubeQuadT = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0, 
      0.2, -0.4, -0.51, 1.0,
    ]

    var unitCubeQuadS = [
      6.0, 0.0, 0.0, 0.0,
      0.0, 6.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ]

    var composedFigureT1 = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0, 
      2.8, 3.4, 0.0, 1.0,
    ]

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    //COMPOSED FIGURE TRANSFORMATIONS
    this.pushMatrix();
    this.rotate(-Math.PI / 2, 0, 1, 0);
    this.rotate(-Math.PI / 2, 1, 0, 0)
    this.multMatrix(composedFigureT1);

      //UNIT CUBE QUAD
      this.pushMatrix();
      this.multMatrix(unitCubeQuadT);
      this.multMatrix(unitCubeQuadS);
      this.unitCubeQuad.display();
      this.popMatrix();

      //TANGRAM
      this.tangram.display();

    this.popMatrix();

    // ---- END Primitive drawing section
  }
}

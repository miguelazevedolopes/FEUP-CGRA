import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MyPyramid } from "./MyPyramid.js";
import { MySandFloor } from "./MySandFloor.js";
import { MyNest } from "./MyNest.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPillarSet } from "./MyPillarSet.js";
import { MySelfMovingFish } from "./MySelfMovingFish.js";
import { MyAlgaeSet } from "./MyAlgaeSet.js";
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
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(20);
        
        this.enableTextures(true);
        
        //Materials for Part A
        //Sphere
        this.sphereMaterial = new CGFappearance(this);
        this.sphereMaterial.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.sphereMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.sphereMaterial.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.sphereMaterial.setEmission(1.0, 1.0, 1.0, 1.0);
        this.sphereMaterial.setShininess(10.0);
        this.sphereMaterial.loadTexture('images/earth.jpg');

        //Cylinder
        this.cylinderMaterial = new CGFappearance(this);
        this.cylinderMaterial.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.cylinderMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.cylinderMaterial.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.cylinderMaterial.setEmission(1.0, 1.0, 1.0, 1.0);
        this.cylinderMaterial.setShininess(10.0);
        this.cylinderMaterial.loadTexture('images/FEUP.jpg');


        // Initialize scene objects
        this.cubeMap = new MyCubeMap(this, 'images/underwater_cubemap/top.jpg', 'images/underwater_cubemap/front.jpg',
    'images/underwater_cubemap/right.jpg', 'images/underwater_cubemap/bottom.jpg', 'images/underwater_cubemap/back.jpg', 'images/underwater_cubemap/left.jpg');

        // Part A
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 10, this.sphereMaterial );
        this.movingObject = new MyMovingObject(this,new MyPyramid(this, 4, 1));
        this.cylinder = new MyCylinder(this, 16, this.cylinderMaterial);

        // Part B
        this.mainFish = new MyMovingFish(this);
        this.secondFish = new MySelfMovingFish(this,10);
        //this.thirdFish = new MySelfMovingFish(this,10);
        this.sandFloor = new MySandFloor(this);
        this.nest = new MyNest(this); //TODO correct nest
        this.waterSurface = new MyWaterSurface(this);
        this.rockSet = new MyRockSet(this, 10);
        this.pillarSet = new MyPillarSet(this, 8);
        this.algaeSet = new MyAlgaeSet(this,2);
        

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.movScaleFactor = 1.0;
        this.movSpeedFactor = 1.0;
        this.selectedTexture = 2;
        this.selectedPart = 1;
        this.textureIds = { 'View': 0, 'Test': 1, 'Underwater': 2 };
        this.parts = { 'Part A': 0, 'Part B': 1 };
        this.displayCubeMap = true;

        //Part A
        this.displayPartA = false;
        this.displayMovingObject = false;
        this.displaySphere = false;
        this.displayCylinder = false;

        //Part B
        this.displayPartB = true;
        this.displayMainFish = true;
        this.displayNest = true;
        this.displayFloor = true;
        this.displayWaterSurface = true;
        this.displayRocks = true;
        this.displayPillars = true;

    }
    initLights() {
        this.lights[0].setPosition(0, 0, 10, 1);
        this.lights[0].setAmbient(0.2, 0.2, 0.2, 1);
        this.lights[0].setDiffuse(0.9, 0.9, 1.0, 1);
        this.lights[0].setSpecular(0, 0, 0, 1);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(1.5, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    updateAppliedTexture() {
        if (this.selectedTexture == 0) {
            this.cubeMap.updateTextures('images/demo_cubemap/top.png', 'images/demo_cubemap/front.png',
                'images/demo_cubemap/right.png', 'images/demo_cubemap/bottom.png', 'images/demo_cubemap/back.png', 'images/demo_cubemap/left.png');
        } else if (this.selectedTexture == 1) {
            this.cubeMap.updateTextures('images/test_cubemap/py.png', 'images/test_cubemap/pz.png',
                'images/test_cubemap/px.png', 'images/test_cubemap/ny.png', 'images/test_cubemap/nz.png', 'images/test_cubemap/nx.png');
        } else if (this.selectedTexture == 2) {
            this.cubeMap.updateTextures('images/underwater_cubemap/top.jpg', 'images/underwater_cubemap/front.jpg',
    'images/underwater_cubemap/right.jpg', 'images/underwater_cubemap/bottom.jpg', 'images/underwater_cubemap/back.jpg', 'images/underwater_cubemap/left.jpg');
        }
    
    }
    updatePart() {
        if (this.selectedPart == 1) {
            this.displayMainFish = true;
            this.displayNest = true;
            this.displayFloor = true;
            this.displayMovingObject = false;
            this.displaySphere = false;
            this.displayCubeMap = false;
            this.displayCylinder = false;
        } 
        else if (this.selectedPart == 0) {
            this.displayMovingObject = true;
            this.displaySphere = false;
            this.displayCubeMap = true;
            this.displayCylinder = false;
            this.displayMainFish = false;
            this.displayNest = false;
            this.displayFloor = false;
        }
    }
     // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.time = t; //For animations
    }

    checkKeys()  {

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")){ //Speed up
            this.movingObject.accelerate(0.01);
            this.mainFish.accelerate(0.01);
        }
        if (this.gui.isKeyPressed("KeyS")){ //Speed down
            this.movingObject.accelerate(-0.01);
            this.mainFish.accelerate(-0.01);
        }
        if (this.gui.isKeyPressed("KeyA")){ //Left seen from the back of the pyramid 
            this.movingObject.turn(Math.PI/16);
            this.mainFish.turn(Math.PI/16);
        }
        if (this.gui.isKeyPressed("KeyD")){ //Right seen from the back of the pyramid 
            this.movingObject.turn(-Math.PI/16);
            this.mainFish.turn(-Math.PI/16);
        }
        if (this.gui.isKeyPressed("KeyR")){ //Reset speed, orientation and position
            this.movingObject.reset();
            this.mainFish.reset();
        }
        if (this.gui.isKeyPressed("KeyS")){ //Speed down
            this.movingObject.accelerate(-0.01);
            this.mainFish.accelerate(-0.01);
        }
        if (this.gui.isKeyPressed("KeyP")){ //Up
            this.mainFish.up();
        }
        if (this.gui.isKeyPressed("KeyL")){ //Down
            this.mainFish.down();
        }
        if (this.gui.isKeyPressed("KeyC")){ //Down
            this.mainFish.catchRock();
        }
    
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
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
        
        this.setDefaultAppearance();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        
        // ---- BEGIN Primitive drawing section

        // Cube Map
        if (this.displayCubeMap)
            this.cubeMap.display();

        // Part A
        // Sphere
        if (this.displaySphere){
            this.sphereAppearance.apply();
            this.incompleteSphere.display();
        }
        // Moving Object
        if (this.displayMovingObject)
            this.movingObject.display();

        // Cylinder
        if (this.displayCylinder)
            this.cylinder.display();

        // Part B
        // Fish
        if (this.displayMainFish) {
            this.mainFish.display();
        }

        // Sandfloor
        if (this.displayFloor)
            this.sandFloor.display();

        // Nest
        if (this.displayNest)
            this.nest.display();

        // Water surface
        if (this.displayWaterSurface) 
            this.waterSurface.display();

        // Rocks
        if (this.displayRocks)
            this.rockSet.display();

        // Pillars
        if (this.displayPillars)
            this.pillarSet.display();

        this.secondFish.display();
        this.algaeSet.display();
        this.setActiveShader(this.defaultShader);
        this.setDefaultAppearance();
        
        // ---- END Primitive drawing section
    }
}
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyFish } from "./MyFish.js";
import { MyPyramid } from "./MyPyramid.js";
import { MySandFloor } from "./MySandFloor.js";
import { MyRock } from "./MyRock.js"
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

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);
        
        //Materials
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

        //Default
        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

        //Sphere previous
		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);

        



        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 10, this.sphereMaterial );
        this.movingObject = new MyMovingObject(this,new MyPyramid(this, 4, 1));
        this.cubeMap = new MyCubeMap(this, 'images/demo_cubemap/top.png', 'images/demo_cubemap/front.png',
         'images/demo_cubemap/right.png', 'images/demo_cubemap/bottom.png', 'images/demo_cubemap/back.png', 'images/demo_cubemap/left.png');
        this.cylinder = new MyCylinder(this, 16, this.cylinderMaterial);
        this.mainFish = new MyMovingObject(this,new MyFish(this));
        
        this.sandFloor = new MySandFloor(this);
        this.rock= new MyRock(this);
        

        //Objects connected to MyInterface
        this.displayAxis = true;

        //Part A
        this.displayPartA = false;
        this.displayMovingObject = false;
        this.displaySphere = false;
        this.displayCubeMap = false;
        this.displayCylinder = false;

        //Part B
        this.displayPartB=true;
        this.displayMainFish = false;
        this.scaleFactor = 1.0;
        this.speedFactor = 1.0;
        this.selectedTexture = -1;
        this.textureIds = { 'View': 0, 'Test': 1 };



        //Shaders
        //this.fishBodyShader = new CGFshader(this.gl, "./Shaders/FishBodyPart.vert", "./Shaders/FishBodyPart.frag");
      
        //this.fishBodyShader.setUniformsValues({ scalesSampler : 10})


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
        this.camera = new CGFcamera(1.0, 0.1, 500, vec3.fromValues(14, 14, 14), vec3.fromValues(0, 2, 0));
    }

    updateAppliedTexture() {
        if (this.selectedTexture == 0) {
            this.cubeMap.updateTextures('images/demo_cubemap/top.png', 'images/demo_cubemap/front.png',
                'images/demo_cubemap/right.png', 'images/demo_cubemap/bottom.png', 'images/demo_cubemap/back.png', 'images/demo_cubemap/left.png');
        }
        else if (this.selectedTexture == 1) {
            this.cubeMap.updateTextures('images/test_cubemap/py.png', 'images/test_cubemap/pz.png',
                'images/test_cubemap/px.png', 'images/test_cubemap/ny.png', 'images/test_cubemap/nz.png', 'images/test_cubemap/nx.png');
        }
    }
    updateMovingObjectScale() {
        this.movingObject.updateScaleFactor(this.scaleFactor);
    }
    updateSpeedFactor() {
        this.movingObject.updateSpeedFactor(this.speedFactor);
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
        if (this.gui.isKeyPressed("KeyD")){//Right seen from the back of the pyramid 
            this.movingObject.turn(-Math.PI/16);
            this.mainFish.turn(-Math.PI/16);
        }
        if (this.gui.isKeyPressed("KeyR")){  //Reset speed, orientation and position
            this.movingObject.reset();
            this.mainFish.reset();
        }
    
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
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
        
        this.defaultAppearance.apply();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        
        // ---- BEGIN Primitive drawing section

        //Sphere
        if (this.displaySphere){
            this.sphereAppearance.apply();
            this.incompleteSphere.display();
        }
        //Moving Object
        if (this.displayMovingObject)
            this.movingObject.display();

        //Cube Map
        if (this.displayCubeMap)
            this.cubeMap.display();

        //Cylinder
        if (this.displayCylinder)
            this.cylinder.display();

        //Fish
        if (this.displayMainFish) {
           // this.setActiveShader(this.fishBodyShader);
            this.mainFish.display();
        }
        this.sandFloor.display();
        this.rock.display();
        this.setActiveShader(this.defaultShader);
        this.defaultAppearance.apply();
        
        // ---- END Primitive drawing section
    }
}
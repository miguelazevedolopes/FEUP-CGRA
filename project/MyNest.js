import {CGFobject,CGFtexture,CGFshader,CGFappearance} from '../lib/CGF.js';
import {MyElipseSphere} from './MyElipseSphere.js'
/**
* MySandFloor
* @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
 * @param minS - minimum texture coordinate in S
 * @param maxS - maximum texture coordinate in S
 * @param minT - minimum texture coordinate in T
 * @param maxT - maximum texture coordinate in T
*/
export class MyNest extends CGFobject {
	constructor(scene) {
		super(scene);
		this.createMaterials();
		this.createShaders();
		this.sphere = new MyElipseSphere(this.scene, 16, 10, this.nestMaterial,0.5,0.4,1.0);
		this.xCenter = 5.0;
		this.yCenter = -0.5;		
	}
	createMaterials() {
		//Sand material
		this.nestMaterial = new CGFappearance(this.scene);
        this.nestMaterial.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.nestMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.nestMaterial.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.nestMaterial.setEmission(1.0, 1.0, 1.0, 1.0);
        this.nestMaterial.setShininess(10.0);
    
		this.rockTex = new CGFtexture(this.scene,"./images/rock.png");
		this.nestMaterial.setTexture(this.rockTex);
	}
	createShaders() {
		this.nestShader = new CGFshader(this.scene.gl,"./Shaders/nest.vert","./Shaders/nest.frag");
		this.nestShader.setUniformsValues({ uSamplerRock : 11 });
	}
	display() {
		this.rockTex.bind(11);
		this.scene.pushMatrix();	
		this.scene.setActiveShader(this.nestShader);
        this.scene.translate(this.xCenter,this.yCenter,0)
        this.scene.scale(2,2,2)
		this.sphere.display();
		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);
		this.scene.setDefaultAppearance();
	}
}

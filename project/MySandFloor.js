import {CGFobject,CGFtexture,CGFshader,CGFappearance} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js'
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
export class MySandFloor extends CGFobject {
	constructor(scene) {
		super(scene);
		this.createMaterials()
		this.start()
	}
	createMaterials(){
		//Sand material
		this.sandMaterial = new CGFappearance(this.scene);
        this.sandMaterial.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.sandMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.sandMaterial.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.sandMaterial.setEmission(1.0, 1.0, 1.0, 1.0);
        this.sandMaterial.setShininess(10.0);
		
		
		this.sandTex = new CGFtexture(this.scene,"./images/sand.png");
        this.sandTexMap = new CGFtexture(this.scene,"./images/sandMap.png");
		this.sandFloorShader= new CGFshader(this.scene.gl,"./Shaders/SandFloor.vert","./Shaders/SandFloor.frag");
		this.sandFloorShader.setUniformsValues({ uSamplerSand : 0 });
		this.sandFloorShader.setUniformsValues({ uSamplerSandMap : 1 });
	}
	start(){
		this.plane=new MyPlane(this.scene,16);
	}
	display(){
		this.scene.pushMatrix();	
		this.sandMaterial.apply();
		this.scene.setActiveShader(this.sandFloorShader);
		this.scene.scale(50,1,50);	
		this.sandTex.bind(0);
		this.sandTexMap.bind(1);	
		this.plane.display();
		this.scene.popMatrix();
	}
}

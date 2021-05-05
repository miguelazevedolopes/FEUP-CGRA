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
		this.plane = new MyPlane(this.scene,16);
		this.createShaders();
	}
	createShaders() {
		this.sandTex = new CGFtexture(this.scene,"./images/sandWithShell.png");
        this.sandTexMap = new CGFtexture(this.scene,"./images/sandMap.png");
		this.sandFloorShader = new CGFshader(this.scene.gl,"./Shaders/SandFloor.vert","./Shaders/SandFloor.frag");
		this.sandFloorShader.setUniformsValues({ uSamplerSand : 0 });
		this.sandFloorShader.setUniformsValues({ uSamplerSandMap : 1 });
	}
	display(){
		this.sandTex.bind(0);
		this.sandTexMap.bind(1);	
		this.scene.pushMatrix();
		this.scene.setActiveShader(this.sandFloorShader);
		this.scene.scale(50,1,50);	
		this.plane.display();
		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);
		this.scene.defaultAppearance.apply();
	}
}

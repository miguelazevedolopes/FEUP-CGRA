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
export class MyRock extends CGFobject {
	constructor(scene) {
		super(scene);
		this.createMaterials();
		this.createShaders();
		this.sphere = new MyElipseSphere(this.scene, 16, 10, this.rockMaterial,0.5,0.4,1.0);;
		
	}
	createMaterials() {
		//Sand material
		this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.rockMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.rockMaterial.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.rockMaterial.setEmission(1.0, 1.0, 1.0, 1.0);
        this.rockMaterial.setShininess(10.0);
        this.rockMaterial.loadTexture("./images/rock.png")
		
		this.rockTex = new CGFtexture(this.scene,"./images/rock.png");
        this.rockMap = new CGFtexture(this.scene,"./images/rock.png");
	}
	createShaders() {
		this.rockShader= new CGFshader(this.scene.gl,"./Shaders/rock.vert","./Shaders/rock.frag");
		this.rockShader.setUniformsValues({ uSamplerRock : 11 });
		this.rockShader.setUniformsValues({ uSamplerRockMap : 12 });
	}
	display() {
		this.rockTex.bind(11);
		this.rockMap.bind(12);
		this.scene.pushMatrix();	
		this.scene.setActiveShader(this.rockShader);
        this.scene.translate(5,-0.5,0)
        this.scene.scale(2,2,2)
		this.sphere.display();
		this.scene.popMatrix();
		this.scene.setActiveShader(this.scene.defaultShader);
		this.scene.defaultAppearance.apply();
	}
}

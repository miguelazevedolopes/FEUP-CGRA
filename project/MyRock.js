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
        this.sandMaterial.loadTexture("./images/rock.png")
		
		
		this.rockTex = new CGFtexture(this.scene,"./images/rock.png");
        this.rockMap = new CGFtexture(this.scene,"./images/rock.png");
		this.rockShader= new CGFshader(this.scene.gl,"./Shaders/rock.vert","./Shaders/rock.frag");
		this.rockShader.setUniformsValues({ uSamplerRock : 11 });
		this.rockShader.setUniformsValues({ uSamplerRockMap : 12 });
	}
	start(){
		this.sphere=new MyElipseSphere(this.scene, 16, 10, this.sandMaterial,0.5,0.4,1.0);
	}
	display(){
		this.scene.pushMatrix();	
		this.sandMaterial.apply();
		this.scene.setActiveShader(this.rockShader);
		this.rockTex.bind(11);
		this.rockMap.bind(12);
        this.scene.translate(5,-0.5,0)
        this.scene.scale(2,2,2)
		this.sphere.display();
		this.scene.popMatrix();
	}
}

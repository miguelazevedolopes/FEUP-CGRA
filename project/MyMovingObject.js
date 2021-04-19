import {CGFobject, CGFappearance} from '../lib/CGF.js';
/**
* MyMovingObject
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.velocity=0.0;
        this.orientation=0.0;
        this.position=[0.0,0.0,0.0];
        
        this.initBuffers();
        this.createMaterial();  
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,1,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    createMaterial() {
        //BLUE
        this.MaterialBlue = new CGFappearance(this.scene);
        this.MaterialBlue.setAmbient(0.2, 0.2, 0.9, 1.0);
        this.MaterialBlue.setDiffuse(0.2, 0.2, 0.9, 1.0);
        this.MaterialBlue.setSpecular(0.2, 0.2, 0.9, 1.0);
        this.MaterialBlue.setShininess(10.0);
    }

    display() {
        this.update(); //Update position

        this.scene.pushMatrix();

        //Rotates and travels depending on its orientation and position
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);

        //Interface Scale Factor
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        //Initial rotate
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.MaterialBlue.apply();

        super.display();

        this.scene.popMatrix();
    }
    update(){
        this.position[0] += this.velocity*Math.sin(this.orientation);
        this.position[2] += this.speed*Math.cos(this.orientation);
        
    }
    accelerate(val) {
        //Increases speed
        this.speed += val;
    }
    turn(val) {
        //Changes orientation
        this.orientation += val;
        this.orientation %= 2*Math.PI;
    }
    reset(){
        this.velocity=0;
        this.orientation=0;
        this.position=[0,0,0];
    }

}



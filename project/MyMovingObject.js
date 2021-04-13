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

        //Movement variables
        this.orientationAngle = 0.0;
        this.speed = 0.0;
        this.coordinates = [0.0, 0.0, 0.0];

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

            var sa = Math.sin(ang);
            var saa = Math.sin(ang + alphaAng);
            var ca = Math.cos(ang);
            var caa = Math.cos(ang + alphaAng);

            this.vertices.push(0,2,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal = [
                saa - sa,
                ca*saa - sa*caa,
                caa - ca
            ];

            // normalization
            var nsize = Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, 3*i + 1, 3*i + 2);
            this.indices.push(3*i + 2, 3*i + 1, 3*i); //So that it can be seen from behind

            ang += alphaAng;
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

        //Rotates and travels depending on its orientation and position
        this.scene.pushMatrix();
        this.scene.translate(this.coordinates[0], this.coordinates[1], this.coordinates[2]);
        this.scene.rotate(this.orientationAngle, 0, 1, 0);

        //Initial rotate
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        //Coloring
        this.MaterialBlue.apply();

        super.display();

        this.scene.popMatrix();
    }
    update() {
        //Update position with terms to speed and orientation
        this.coordinates[0] += this.speed*Math.sin(this.orientationAngle);
        this.coordinates[2] += this.speed*Math.cos(this.orientationAngle);
    }
    turn(val) {
        //Changes orientation
        this.orientationAngle += val;
        this.orientationAngle %= 2*Math.PI;
    }
    accelerate(val) {
        //Increases speed
        this.speed += val;
    }
    reset() {
        //Resets initial position
        this.speed = 0.0;
        this.orientationAngle = 0.0;
        this.coordinates = [0.0, 0.0, 0.0];
    }
}



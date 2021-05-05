import {CGFobject, CGFappearance} from '../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPyramid extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.createMaterial();
        this.initBuffers();
    }
    createMaterial() {
        //BLUE
        this.MaterialBlue = new CGFappearance(this.scene);
        this.MaterialBlue.setAmbient(0.2, 0.2, 0.9, 1.0);
        this.MaterialBlue.setDiffuse(0.2, 0.2, 0.9, 1.0);
        this.MaterialBlue.setSpecular(0.2, 0.2, 0.9, 1.0);
        this.MaterialBlue.setShininess(10.0);
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
            this.normals.push(0.0, -1.0, 0.0);
            this.normals.push(0.0, -1.0, 0.0);

            this.indices.push(5*i, 5*i + 1, 5*i + 2);
            this.indices.push(1, 5*i + 2, 5*i + 1); //So that it can be seen from behind

            ang += alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    display() {
        //Initial rotate
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        //Coloring
        this.MaterialBlue.apply();
        super.display();
        this.scene.setDefaultAppearance();
    }
}



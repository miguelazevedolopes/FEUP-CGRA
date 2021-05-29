import {CGFobject, CGFappearance} from '../lib/CGF.js';
/**
* MyAlgae
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyAlgae extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.noLeafs = Math.random() * 4 + 1;
        this.createCoords();
        this.createMaterial();
        this.createLeafs();
        this.initBuffers();
        this.materialUse = Math.floor(Math.random() * 3); // To activate different materials
    }
    createCoords() {
        this.coords = [Math.random() * 51 - 25, 0.0, Math.random() * 51 - 25]; 
        while(this.scene.nest.distanceFromCenter(this.coords) <= this.scene.nest.radius + 0.5) { // Algae can't be inside the nest
            this.coords = [Math.random() * 51 - 25, 0.0, Math.random() * 51 - 25]; 
        }
    }
    createMaterial() {
        this.materials = [];

        this.materials[0] = new CGFappearance(this.scene);
        this.materials[0].setAmbient(0.2, 0.81, 0.2, 1.0);
        this.materials[0].setDiffuse(0.2, 0.81, 0.2, 1.0);
        this.materials[0].setSpecular(0.2, 0.81, 0.2, 1.0);
        this.materials[0].setShininess(10.0);

        this.materials[1] = new CGFappearance(this.scene);
        this.materials[1].setAmbient(0.0, 0.41, 0.0, 1.0);
        this.materials[1].setDiffuse(0.0, 0.41, 0.0, 1.0);
        this.materials[1].setSpecular(0.0, 0.41, 0.0, 1.0);
        this.materials[1].setShininess(10.0);

        this.materials[2] = new CGFappearance(this.scene);
        this.materials[2].setAmbient(0.5, 0.92, 0.5, 1.0);
        this.materials[2].setDiffuse(0.5, 0.91, 0.5, 1.0);
        this.materials[2].setSpecular(0.5, 0.91, 0.5, 1.0);
        this.materials[2].setShininess(10.0);
    }
    createLeafs() {
        this.leafOffset = []; // For the position of the leaves
        this.leafSize = []; // For the scalings, leaves with different sizes
        for (let i = 0; i < this.noLeafs; i++) {
            this.leafOffset.push(Math.random() * 2 - 0.5);
            this.leafOffset.push(0.0);
            this.leafOffset.push(Math.random() * 2 - 0.5);
            this.leafSize.push(Math.random() * 1 + 0.25);
            this.leafSize.push(Math.random() * 1 + 0.5);
            this.leafSize.push(Math.random() * 1 + 0.5);
        }
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
        this.materials[this.materialUse].apply();
        this.scene.pushMatrix();
        this.scene.translate(this.coords[0], this.coords[1], this.coords[2]); 
        this.scene.scale(0.3,0.6,0.3);
        for (let i = 0; i < this.noLeafs; i++) { // For each leaf
            this.scene.pushMatrix();
            this.scene.translate(this.leafOffset[i*3], this.leafOffset[i*3 + 1], this.leafOffset[i*3 + 2]);
            this.scene.scale(this.leafSize[i*3], this.leafSize[i*3 + 1], this.leafSize[i*3 + 2]);
            super.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}
import { CGFobject, CGFappearance } from '../lib/CGF.js';

export class MyPillar extends CGFobject {
    constructor(scene, slices, x, z) {
        super(scene);
        this.slices = slices;
        this.x = x; //Positioning
        this.z = z;
        this.createMaterial();
        this.initBuffers();
    }
    createMaterial() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.5, 0.5, 0.5, 1.0);
        this.material.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.material.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.material.setShininess(10.0);
        this.material.loadTexture("./images/tree-trunk.jpg");
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Use of angles to determine the vertices of the faces
        var ang = 0;
        var alphaAng = 2 * Math.PI/this.slices;

        for (var i = 0; i < this.slices; i++) {

            // Degrees
            var sin1 = Math.sin(ang);
            var sin2 = Math.sin(ang + alphaAng);
            var cos1 = Math.cos(ang);
            var cos2 = Math.cos(ang + alphaAng);

            // Vertexes
            this.vertices.push(cos1, -1.0, sin1); 
            this.vertices.push(cos2, -1.0, sin2);
            this.vertices.push(cos1, 10.0, sin1);
            this.vertices.push(cos2, 10.0, sin2); // Tall cylinder
            this.vertices.push(cos1, -1.0, sin1); 
            this.vertices.push(cos2, -1.0, sin2);
            this.vertices.push(cos1, 10.0, sin1);
            this.vertices.push(cos2, 10.0, sin2);

            // Indexes
            this.indices.push(8*i + 2, 8*i + 1, 8*i);
            this.indices.push(8*i + 2, 8*i + 3, 8*i + 1);
            if (i > 0) {
                this.indices.push(0, 8*i, 8*i + 1);
                this.indices.push(8*i + 3, 8*i + 2, 2);
            }

            // Normals
            this.normals.push(cos1, 0.0, sin1); 
            this.normals.push(cos2, 0.0, sin2);
            this.normals.push(cos1, 0.0, sin1);
            this.normals.push(cos2, 0.0, sin2);
            this.normals.push(0.0, -1.0, 0.0); 
            this.normals.push(0.0, -1.0, 0.0);
            this.normals.push(0.0, 1.0, 0.0);
            this.normals.push(0.0, 1.0, 0.0);

            //Texture Coords
            this.texCoords.push(1.0 - (i)/this.slices, 1.0);
            this.texCoords.push(1.0 - (i + 1)/this.slices, 1.0);
            this.texCoords.push(1.0 - (i)/this.slices, 0.0);
            this.texCoords.push(1.0 - (i + 1)/this.slices, 0.0);
            this.texCoords.push(1.0 - (i)/this.slices, 1.0);
            this.texCoords.push(1.0 - (i + 1)/this.slices, 1.0);
            this.texCoords.push(1.0 - (i)/this.slices, 0.0);
            this.texCoords.push(1.0 - (i + 1)/this.slices, 0.0);

            ang += alphaAng; // Increment current degree(ang), going arround
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    display() {
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0.0, this.z);
        this.scene.scale(0.15, 1.0, 0.15); // Thin the cylinder
        super.display();
        this.scene.popMatrix();
        this.scene.setDefaultAppearance();
    }
}
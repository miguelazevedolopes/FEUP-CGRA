import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, texture) {
        super(scene);
        this.slices = slices;
        this.texture = new CGFtexture(this.scene, texture);
        this.createMaterial();
        this.initBuffers();
    }
    createMaterial() {
        this.Material = new CGFappearance(this.scene);
        this.Material.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.Material.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.Material.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.Material.setEmission(1.0, 1.0, 1.0, 1.0);
        this.Material.setShininess(10.0);
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        //Use of angles to determine the vertices of the faces
        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for (var i = 0; i < this.slices; i++) {

            //Degrees
            var sin1 = Math.sin(ang);
            var sin2 = Math.sin(ang + alphaAng);
            var cos1 = Math.cos(ang);
            var cos2 = Math.cos(ang + alphaAng);

            //Vertexes
            this.vertices.push(cos1, 0.0, sin1); 
            this.vertices.push(cos2, 0.0, sin2);
            this.vertices.push(cos1, 1.0, sin1);
            this.vertices.push(cos2, 1.0, sin2);
            this.vertices.push(cos1, 0.0, sin1); 
            this.vertices.push(cos2, 0.0, sin2);
            this.vertices.push(cos1, 1.0, sin1);
            this.vertices.push(cos2, 1.0, sin2);

            //Indexes
            this.indices.push(8*i + 2, 8*i + 1, 8*i);
            this.indices.push(8*i + 2, 8*i + 3, 8*i + 1);
            if (i > 0) {
                this.indices.push(0, 8*i, 8*i + 1);
                this.indices.push(8*i + 3, 8*i + 2, 2);
            }

            //Normals
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

            ang += alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    display() {
        this.Material.setTexture(this.texture);
        this.Material.apply();
        super.display();
    }
}
import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices,texture) {
        super(scene);
        this.slices = slices;

        this.initBuffers();
    }
    createMaterial() {
        //Material to use the texture with
        this.Material = new CGFappearance(this.scene);
        this.Material.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.Material.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.Material.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.Material.setEmission(1.0, 1.0, 1.0, 1.0);
        this.Material.setShininess(10.0);
        this.Material.setTexture(this.texture);
    }
    initBuffers() {
    
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var deltaAng = 2 * Math.PI / this.slices; 

        var faceWidth = 1 / this.slices;

        for(var i = 0; i <= this.slices; i++) {

            var cos = Math.cos(ang);
            var sin = Math.sin(ang);

            this.vertices.push(cos, 0, sin);
            this.vertices.push(cos, 1, sin);

            //add normals for the newly created vertices
            var normal = [cos, 0, sin];
            var normalSize = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
            normal[0] /= normalSize;
            normal[1] /= normalSize;
            normal[2] /= normalSize;
            this.normals.push(...normal);
            this.normals.push(...normal);


            // only once for each pair of vertices (final pair only used for proper texturing)
            if (i < this.slices) {
                // define a face 
                this.indices.push(2*i, (2*i+1), (2*i+3));
                this.indices.push(2*i, (2*i+3), (2*i+2));
            }

            var currentCoord = [
                1 - (i * faceWidth), 1,
                1 - (i * faceWidth), 0
            ];

            this.texCoords.push(...currentCoord);
            ang += deltaAng
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}

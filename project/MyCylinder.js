import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;

        //Movement variables
        this.orientationAngle = 0.0;
        this.speed = 0.0;
        this.coordinates = [0.0, 0.0, 0.0];

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

            
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);
            this.vertices.push(-sa, 1, ca);
            this.vertices.push(-saa, 1, caa);

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
            this.indices.push(1, 3*i + 2, 3*i + 1); //So that it can be seen from behind

            ang += alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}

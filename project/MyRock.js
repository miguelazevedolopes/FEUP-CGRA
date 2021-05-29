import {CGFobject, CGFappearance} from '../lib/CGF.js';

export class MyRock extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
     */
    constructor(scene, slices, stacks, pos, deform) {
        super(scene);
        this.latDivs = stacks * 2;
        this.longDivs = slices;
        this.coords = pos;
        this.startingCoords = pos;
        this.nestCoords=[Math.random()*4-2,0,Math.random()*4-2]; //Predefines a random position for the rock in the nest area
        this.rockDeform = deform;
        this.createMaterial();
        this.initBuffers();
    }
    /**
     * @method initBuffers
     * Initializes the sphere buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;
        var theta = 0;
        var phiInc = Math.PI / this.latDivs;
        var thetaInc = (2 * Math.PI) / this.longDivs;
        var latVertices = this.longDivs + 1;

        // build an all-around stack at a time, starting on "north pole" and proceeding "south"
        for (let latitude = 0; latitude <= this.latDivs; latitude++) {
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            // in each stack, build all the slices around, starting on longitude 0
            theta = 0;
            for (let longitude = 0; longitude <= this.longDivs; longitude++) {
                //--- Vertices coordinates
                var x = Math.cos(theta) * sinPhi;
                var y = cosPhi;
                var z = Math.sin(-theta) * sinPhi;

                var randomModifier = Math.floor(Math.random() * 3);
                this.vertices.push(x - randomModifier / 25.0, y - randomModifier / 25.0, z - randomModifier / 25.0);

                //--- Indices
                if (latitude < this.latDivs && longitude < this.longDivs) {
                var current = latitude * latVertices + longitude;
                var next = current + latVertices;
                // pushing two triangles using indices from this round (current, current+1)
                // and the ones directly south (next, next+1)
                // (i.e. one full round of slices ahead)
                
                this.indices.push( current + 1, current, next);
                this.indices.push( current + 1, next, next +1);
                }

                //--- Normals
                // at each vertex, the direction of the normal is equal to 
                // the vector from the center of the sphere to the vertex.
                // in a sphere of radius equal to one, the vector length is one.
                // therefore, the value of the normal is equal to the position vectro
                this.normals.push(x, y, z);
                theta += thetaInc;

                //--- Texture Coordinates
                // To be done... 
                // May need some additional code also in the beginning of the function.
                this.texCoords.push(longitude/this.longDivs, latitude/this.latDivs)
            
            }
            phi += phiInc;
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    createMaterial() {
        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.rockMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.rockMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.rockMaterial.setShininess(10.0);
        this.rockMaterial.loadTexture("./images/rock.png");
    }
    display() {
        this.rockMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.coords[0], this.coords[1], this.coords[2]); 
        this.scene.scale(this.rockDeform[0], this.rockDeform[1], this.rockDeform[2]);
        this.scene.scale(0.1, 0.1, 0.1); // Rocks are small
        super.display();
        this.scene.popMatrix();
        this.scene.setDefaultAppearance();
    }
}

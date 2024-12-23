/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        var transformedMvp = mvp;
        var transformedModelView = modelView;
        var transformedNormals = normalMatrix;
        var transformedModel = modelMatrix;

        // get the transformation matrix to apply the transformations.
        var transformationMatrix = this.trs.getTransformationMatrix();

        // apply the transformations using the matrix multiplication function defined 
        transformedMvp = MatrixMult( mvp , transformationMatrix);
        transformedModelView = MatrixMult( modelView , transformationMatrix) ;
        transformedNormals = MatrixMult( normalMatrix, transformationMatrix) ;
        transformedModel = MatrixMult( modelMatrix , transformationMatrix) ; 

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }


        // apply the same transformations to the childs of the current node too. 
        // (the child nodes will have their own transformation matrices as well 
        // and they will be applied on the transformation that is (here) passed from the parent node.  )
        for(let child of this.children){
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel );

        }

    }

    

}
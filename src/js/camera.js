import vector from "./vector.js";

export default class Camera{
    constructor(){
        this.pos = new vector(0,0);
        this.size = new vector(512,408);
    }
}
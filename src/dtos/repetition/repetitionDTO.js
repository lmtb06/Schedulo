import { DTO } from "../DTO";

export class repetitionDTO extends DTO{
    id;
    intervalle;
    unite;
    fin;

    constructor(repetition){
        this.id = repetition.id;
        this.intervalle = repetition.intervalle;
        this.unite = repetition.unite;
        this.fin = repetition.fin;
    }

    toJSON(){
        return JSON.stringify({
            id:this.id,
            intervalle:this.intervalle,
            unite:this.unite,
            fin:this.fin
        });
    }
}
import { DTO } from "../DTO";

export class createRepetitionDTO extends DTO{
    intervalle;
    unite;
    fin;

    constructor(repetition){
        this.intervalle = repetition.intervalle;
        this.unite = repetition.unite;
        this.fin = repetition.fin;
    }

    toJSON(){
        return JSON.stringify({
            intervalle:this.intervalle,
            unite:this.unite,
            fin:this.fin
        });
    }
}
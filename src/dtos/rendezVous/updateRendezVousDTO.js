import { DTO } from "../DTO";

export class updateRendezVousDTO extends DTO{
    id;
    idAgenda;
    debut;
    fin;
    titre;
    description;
    repetition;

    constructor(rendezVous){
        this.id = rendezVous.id;
        this.idAgenda = rendezVous.idAgenda;
        this.debut = rendezVous.debut;
        this.fin = rendezVous.fin;
        this.titre = rendezVous.titre;
        this.description = rendezVous.description;
        this.repetition = rendezVous.repetition;
    }

    toJSON(){
        return JSON.stringify({
            id:this.id,
            idAgenda:this.idAgenda,
            debut:this.debut,
            fin:this.fin,
            titre:this.titre,
            description:this.description,
            repetition:this.repetition ? this.repetition.toJSON() : null
        });
    }
}
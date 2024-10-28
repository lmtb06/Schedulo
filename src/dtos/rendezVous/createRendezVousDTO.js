import { DTO } from "../DTO";

export class createRendezVousDTO extends DTO{
    idCreateur;
    idAgenda;
    debut;
    fin;
    titre;
    description;
    repetition;

    constructor(rendezVous){
        this.idCreateur = rendezVous.idCreateur;
        this.idAgenda = rendezVous.idAgenda;
        this.debut = rendezVous.debut;
        this.fin = rendezVous.fin;
        this.titre = rendezVous.titre;
        this.description = rendezVous.description;
        this.repetition = rendezVous.repetition;
    }

    toJSON(){
        return JSON.stringify({
            idCreateur:this.idCreateur,
            idAgenda:this.idAgenda,
            debut:this.debut,
            fin:this.fin,
            titre:this.titre,
            description:this.description,
            repetition:this.repetition ? this.repetition.toJSON() : null
        });
    }
}
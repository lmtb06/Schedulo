import { DTO } from "../DTO";

export class rendezVousDTO extends DTO{
    id;
    idCreateur;
    idAgenda;
    debut;
    fin;
    titre;
    description;
    dateCreation;
    dateModification;
    repetition;

    rendezVousDTO(rendezVous){
        this.id = rendezVous.id;
        this.idCreateur = rendezVous.idCreateur;
        this.idAgenda = rendezVous.idAgenda;
        this.debut = rendezVous.debut;
        this.fin = rendezVous.fin;
        this.titre = rendezVous.titre;
        this.description = rendezVous.description;
        this.dateCreation = rendezVous.dateCreation;
        this.dateModification = rendezVous.dateModification;
        this.repetition = rendezVous.repetition;
    }

    toJSON(){
        return JSON.stringify({
            id:this.id,
            idCreateur:this.idCreateur,
            idAgenda:this.idAgenda,
            debut:this.debut,
            fin:this.fin,
            titre:this.titre,
            description:this.description,
            dateCreation:this.dateCreation,
            dateModification:this.dateModification,
            repetition:this.repetition ? this.repetition.toJSON() : null
        });
    }
}
import { DTO } from "../DTO";

export class deleteRendezVousDTO extends DTO{
    id;

    constructor(rendezVous){
        this.id = rendezVous.id;
    }

    toJSON(){
        return JSON.stringify({
            id:this.id,
        });
    }
}
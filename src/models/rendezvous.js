let rendezvous = [];

class RendezVous {
  constructor(titre, debut, fin, description) {
    this.id = Date.now().toString();
    this.titre = titre;
    this.debut = debut;
    this.fin = fin;
    this.description = description;
  }

  async save() {
    rendezvous.push(this);
  }

  static getAll() {
    return rendezvous;
  }
}

export default RendezVous;
import fs from 'fs';
const fJSON = "utilisateurs.json";

function insert(utilisateur){
    if(fs.existsSync(fJSON)){ //Si le fichier existe déjà on le parse et y ajoute un utilisateur
        fs.readFile(fJSON, "utf-8", (err, data) => {
           if(err){
               console.error(err);
               return;
           }

           let utilisateurs = [];

           try{
               utilisateurs = JSON.parse(data);
           }catch(pErr){
               console.error(pErr)
               return;
           }

           utilisateurs.push(utilisateur);

            fs.writeFile(fJSON, JSON.stringify(utilisateurs, null, 1), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });

        });
    }else{ //Sinon on écrit le seul utilisateur
        let utilisateurs = [];
        utilisateurs.push(utilisateur);

        fs.writeFile(fJSON, JSON.stringify(utilisateurs, null, 2), (err) => {
            if(err){
                console.error(err);
                return;
            }
        });
    }
}

function get_utilisateurs(){

    let utilisateurs = [];

    if(fs.existsSync(fJSON)){
        try{
            const data = fs.readFileSync(fJSON, "utf-8");
            utilisateurs = JSON.parse(data);
        }catch(err){
            console.error(err);
        }
        return utilisateurs;
    }
}

export {insert, get_utilisateurs }
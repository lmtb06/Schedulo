import {createHash} from 'node:crypto';
import fs from 'fs';
import {insert} from "./public/scripts/manip_json.js"; // Importer le module 'fs'

let currentId = 0;
const agenda = createDefaultAgenda();

function createDefaultAgenda(){
    return {users:{}};
}

function getNewId() { return ++currentId; }

export function index(req, res){

    res.render("index")
}

export function getAccountCreationPage(req,res){
    res.render("account/inscription");
}

export function createAccount(req,res){
    const { email, password, picture} = req.body;
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const user = {
        id: getNewId(),
        email: email,
        password: createHash("sha256").update(password).digest("hex"),
        picture: picture,
        dateCreation: formattedDate,
    };
    insert(user);
    //res.redirect("/");
}
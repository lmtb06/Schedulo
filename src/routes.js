import {createHash} from 'node:crypto';
import {get_utilisateurs, insert} from "./public/scripts/manip_json.js";
import jwt from "jsonwebtoken";
import * as path from "node:path";

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

    if(!res.locals.user){

        res.render("account/inscription");
    }
    else{

        res.render("index");
    }
}

export function getConnexion(req, res){

    if(!res.locals.user){

        res.render("account/connexion");
    }
    else{

        res.render("index");
    }
}

export function createAccount(req,res){
    const { email, password, name,surname,picture} = req.body;
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const user = {
        id: getNewId(),
        email: email,
        password: createHash("sha256").update(password).digest("hex"),
        name: name,
        surname: surname,
        picture: picture,
        dateCreation: formattedDate,
    };
    insert(user);
    res.redirect("/");
}

export function authenticate(req, res, next) {
    try {
        const token = req.cookies.accessToken;
        const user = jwt.verify(token, process.env.SECRET);
        res.locals.user = user;
    } catch {}
    next();
}

function createJWT(user) {
    return jwt.sign(
        { id: user.id, email: user.email ,name: user.name, surname: user.surname},
        process.env.SECRET,
        { expiresIn: "1d" },
    );
}

export function login(req, res){

    const { email, password } = req.body;
    const user = get_utilisateurs().find((user) => user.email === email);
    if (user && user.password === createHash("sha256").update(password).digest("hex")) {
        const token = createJWT(user);
        res.cookie("accessToken", token, { httpOnly: true });
        res.redirect("/");
    } else {
        res.render("account/connexion", { message: "email/mot de passe invalide." });
    }
}

export function logout(req, res){

    if(res.locals.user){

        res.cookie("accessToken", null);
        res.redirect("/");
    }
    else{

        res.render("index");
    }
}

export function getCalendarPage(req, res){
    res.render("calendar/calendar");
}

// recup les events depuis le fichier JSON
export function getEvents(req, res) {
    const filePath = path.join(process.cwd(), 'events.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture des events');
        }
        const events = JSON.parse(data || '[]');
        res.json(events);
    });
}

export function saveEvent(req, res) {
    const newEvent = req.body;
    const filePath = path.join(process.cwd(), 'events.json');

    fs.readFile(filePath, (err, data) => {
        let events = [];

        if (err) {
            console.error('Erreur lors de la lecture du fichier:', err);
            return res.status(500).send('Erreur lors de la lecture du fichier');
        }

        if (data.length) {
            try {
                events = JSON.parse(data);
            } catch (parseError) {
                console.error('Erreur lors du parsing des données:', parseError);
                return res.status(500).send('Erreur lors du parsing des données');
            }
        }

        events.push(newEvent);

        fs.writeFile(filePath, JSON.stringify(events, null, 2), (err) => {
            if (err) {
                console.error('Erreur lors de la sauvegarde de levent:', err);
                return res.status(500).send('Erreur lors de la sauvegarde de levent');
            }
            res.status(201).send('event sauvegardé');
        });
    });
}
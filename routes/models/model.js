const path = require('path');
const sqlite3 = require('sqlite3');


class ContactosModel {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname, "/database", "database.db"), (err) => {
            if (!err) {
                console.log('Archivo creado con exito!')
            }
            console.log(err)
        });
    }

    conn() {
        this.db.run('CREATE TABLE IF NOT EXISTS contacts(name VARCHAR(255), email VARCHAR(255), message TEXT,ip VARCHAR(255),date TEXT)');
    }

    sv(name, email, message, ip, date) {
        this.db.run("INSERT INTO contacts VALUES (?, ?, ?, ?, ?)", [name, email, message, ip, date]);
    }
}


class ContactosController {
    constructor() {
        this.encapsulacion = new ContactosModel();
        this.encapsulacion.conn();
    }

    async saveContact(req, res) {
        const { name, email, message } = req.body;
        const ip = (req.headers['x-forwarded-for'] || '').split(',')[0];
        const date = new Date();
        this.encapsulacion.sv(name, email, message, ip, date);
        res.send({
            name:name,
            email:email,
            message:message,
            ip:ip,
            date:date
        })
    }
}


module.exports = ContactosController
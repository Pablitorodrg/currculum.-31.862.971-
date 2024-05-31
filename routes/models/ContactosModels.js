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
        this.db.run('CREATE TABLE IF NOT EXISTS contacts(name VARCHAR(255), email VARCHAR(255), message TEXT,ip VARCHAR(255),date TEXT,country TEXT)');
    }

    sv(name, email, message, ip, date, country) {
        this.db.run("INSERT INTO contacts VALUES (?, ?, ?, ?, ?, ?)", [name, email, message, ip, date, country]);
    }
}

module.exports = ContactosModel
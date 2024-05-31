
const nodemailer = require('nodemailer');




const ContactosModel = require('../models/ContactosModels');
class ContactosController {
    constructor() {
        this.encapsulacion = new ContactosModel();
        this.encapsulacion.conn();
    }

    async saveContact(req, res) {
        const { name, email, message } = req.body;
        const ip = (req.headers['x-forwarded-for'] || '').split(',')[0];
        const date = new Date();

        const json = "http://ip-api.com/json/" + ip
        const countryResponse = await fetch(json);
        const JsonResponse = await countryResponse.json()
        const country = JsonResponse.country;

        const response = req.body["g-recaptcha-response"];
        const secret = process.env.RPRIVATE;
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`;

        const rp = await fetch(url, { method: "post", });
        const grp = await rp.json();
        if (grp.success) {
            let transporter = nodemailer.createTransport({
                host: "smtp.hostinger.com",
                port: 465,
                secureConnection: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                },
                debug: true
            });

            const customer = `
            <h2>Data client...</h2>
            <p>Email: ${email}</p>
            <p>Name: ${name}</p>
            <p>Message: ${message}</p>
            <p>Date Time: ${date}</p>
            <p>Ip: ${ip}</p>
            <pli>Country: ${country}</p>
                                    `;

            const receiver = {
                from: process.env.EMAIL,
                to: 'programacion2ais@dispostable.com',
                subject: 'Data client',
                html: customer
            };


            transporter.sendMail(receiver, (err, info) => {
                if (err) {
                    console.log(err)
                }

                else {
                    this.encapsulacion.sv(name, email, message, ip, date, country);
                    res.send({
                        name: name,
                        email: email,
                        message: message,
                        ip: ip,
                        date: date,
                        country: country,
                    });
                }

            })





        } else {
            res.send({ failed: 'Verifica el captcha' })
        }

    }
}


module.exports = ContactosController
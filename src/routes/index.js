const {Router} = require ('express');
const router = Router();

//importando las variables del entorno
require('dotenv').config();

//importando nodemailer
const nodemailer = require('nodemailer');

//Ruta: /send-email
router.post('/send-email', async (req, res) => {
    // console.log(req.body);
    const { name, email, phone, message} = req.body;

    //crear una estructura HTML o plantilla.
    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>UserName: ${name}</li>
            <li>User Email: ${email}</li>
            <li>Phone: ${phone}</li>
        </ul>
        <p>Message: ${message}</p>
    `;
    console.log(contentHTML);
    // res.send('Received Email...');
    console.log('HOST_SMTP:', process.env.HOST_SMTP);
    console.log('SEC_PORT_EMAIL:', process.env.SEC_PORT_EMAIL);
    console.log('PASSWORD_EMAIL_SERVER:', process.env.PASSWORD_EMAIL_SERVER);
    console.log('EMAIL_ACCOUNT_SERVER:', process.env.EMAIL_ACCOUNT_SERVER);
    console.log('EMAIL_ACCOUNT_SERVER:', process.env.TO_EMAIL_ACCOUNT);
    
//Se deben agregar variables de entorno.
//todo estas variables se guarda en: prosess.env -> procesos del entorno.


//configurando el nodemail, para enviar los correos por el smtp
const transporter = nodemailer.createTransport({
    // host: 'mail.laideatech.net',
    // port: 465,
    // secure:true,
    // auth: {
    //     user: 'barf@laideatech.net',
    //     pass: 'b4rf2022.*'
    // },
    // tls: {
    //     rejectUnauthorized: false
    // }

    host: process.env.HOST_SMTP,
    port: process.env.SEC_PORT_EMAIL,
    secure:true,
    auth: {
        user: process.env.EMAIL_ACCOUNT_SERVER,
        pass: process.env.PASSWORD_EMAIL_SERVER
    },
    tls: {
        rejectUnauthorized: false
    }
});

//Com esto es un metodo asincrono, se deben usar promesas.

const info = await transporter.sendMail({
    from: "'BARF Server' <barf@laideatech.net>",
    to: 'guaroguerito@gmail.com',
    subject: 'Website contact form',
    html: contentHTML
   
});

console.log('Message send', info.messageId);

// res.send('Received Email...');
res.redirect('/success.html');

});


//Exportar el modulo
module.exports = router;
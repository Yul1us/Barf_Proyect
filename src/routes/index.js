const {Router} = require ('express');
const router = Router();

//importando las variables del entorno
require('dotenv').config();

//importando nodemailer
  const nodemailer = require('nodemailer');
  const MS_EMAIL_ACCOUNT_SERVER = process.env['EMAIL_ACCOUNT_SERVER'];
  const MS_HOST_SMTP = process.env['HOST_SMTP'];
  const MS_SEC_PORT_EMAIL = process.env['SEC_PORT_EMAIL'];
  const MS_PASSWORD_EMAIL_SERVER = process.env['PASSWORD_EMAIL_SERVER'];
  const MS_TO_EMAIL_ACCOUNT = process.env['TO_EMAIL_ACCOUNT'];
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
    // console.log('HOST_SMTP:', process.env.HOST_SMTP);
    // console.log('SEC_PORT_EMAIL:', process.env.SEC_PORT_EMAIL);
    // console.log('PASSWORD_EMAIL_SERVER:', process.env.PASSWORD_EMAIL_SERVER);
    // console.log('EMAIL_ACCOUNT_SERVER:', process.env.EMAIL_ACCOUNT_SERVER);
    // console.log('EMAIL_ACCOUNT_SERVER:', process.env.TO_EMAIL_ACCOUNT);
    console.log('HOST_SMTP:', MS_HOST_SMTP);
    console.log('SEC_PORT_EMAIL:', MS_SEC_PORT_EMAIL);
    console.log('PASSWORD_EMAIL_SERVER:', MS_PASSWORD_EMAIL_SERVER);
    console.log('EMAIL_ACCOUNT_SERVER:', MS_EMAIL_ACCOUNT_SERVER);
    console.log('EMAIL_ACCOUNT_SERVER:', MS_TO_EMAIL_ACCOUNT); 
//Se deben agregar variables de entorno.
//todo estas variables se guarda en: prosess.env -> procesos del entorno.


//configurando el nodemail, para enviar los correos por el smtp
const transporter = nodemailer.createTransport({
    host: MS_HOST_SMTP,
    port: MS_SEC_PORT_EMAIL,
    secure:true,
    auth: {
        user: MS_EMAIL_ACCOUNT_SERVER,
        pass: MS_PASSWORD_EMAIL_SERVER
    },
    tls: {
        rejectUnauthorized: false
    }
});

//Com esto es un metodo asincrono, se deben usar promesas.

const info = await transporter.sendMail({
    // from: "'BARF Server' <barf@Dominio>",
    // to: 'cuenta@Dominio',

    from: `BARF Server <${MS_EMAIL_ACCOUNT_SERVER}>`,
    to: `${MS_TO_EMAIL_ACCOUNT}`,
    subject: 'Website contact form',
    html: contentHTML
   
});

console.log('Message send', info.messageId);

// res.send('Received Email...');
res.redirect('/success.html');

});


//Exportar el modulo
module.exports = router;
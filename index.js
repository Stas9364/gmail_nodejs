const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())


const LOGIN = process.env.SMTP_LOGN || '---';
const PASSWORD = process.env.SMTP_PASSWORD || '---';


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: LOGIN, // generated ethereal user
        pass: PASSWORD, // generated ethereal password
    },
});


app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.post('/send-message', async (request, response) => {
    const {contacts, name, message} = request.body;

    // send mail with defined transport object
    await transporter.sendMail({
        from: 'HR :)', // sender address
        to: "lisovskiy.nodejs@gmail.com", // list of receivers
        subject: 'Job offer ✔', // Subject line
        //text: "Hello world?", // plain text body
        html: `<b>Message from portfolio page!</b> 
                <div>name: ${name}</div>
                <div>${message}</div>
                <div>contacts: ${contacts}</div>`
    });

    response.send('Success');
});

const PORT = process.env.PORT || 3010;

app.listen(PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on 3010`);
});
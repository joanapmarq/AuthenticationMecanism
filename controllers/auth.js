const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const { hash, generate_card } = require("../utils")
var nodemailer = require('nodemailer');

const db = mysql.createConnection({
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projeto'
});


//nodemailer and transporter 

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'emailauxiliar75@gmail.com',
        pass: 'Qwertyuiop12344$$'
    }
});


/* fazer isto --- colorCodes.back -- https://stackoverflow.com/questions/3244361/can-i-access-variables-from-another-file
var colorCodes = {

    vermelho  : "#fff",
    front : "#888",
    side  : "#369"
  
  };
  //first.js
const colorCode = {
    black: "#000",
    white: "#fff"
};
export { colorCode };

//second.js
import { colorCode } from './first.js'

  */


exports.register = (req, res) => {
    //tem os dados que prenchemos no form register
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;

    //  const {name, email} = req.body;

    db.query('SELECT email FROM Utilizador WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        // results = array , se for > 0 quer dizer que ja ha email 
        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is alredy in use'
            })
        }

        /////
        //Generate screct token 
        const secretToken = randomstring.generate();
        const active = false;

        var date = new Date();
        // const token_mail_verification = jwt.sign({ id: email, "created": date.toString() }, secretToken, { expiresIn: 86400 });
        var url = "http://localhost:2000/auth/verify?name=" + secretToken;


        const Frente = gerarAleatoriamenteFrente();
        const Tras = gerarAleatoriamenteTras();

        /*
        const pass = gerarAleatoriamentePass();
        let hashedPassword = await bcrypt.hash(pass, 8);

        */

        const passTemporaria = "temporaria"

        db.query('SELECT email FROM Utilizador WHERE cor_frente = ? and cor_verso = ? ', [Frente, Tras],
            async (error, results) => {
                if (error) {
                    console.log(error);
                }
                // results = array , se for > 0 quer dizer que ja ha cores iguais  
                if (results.length > 0) {
                    const Frente = gerarAleatoriamenteFrente();
                    const Tras = gerarAleatoriamenteTras();
                }

                db.query('INSERT INTO Utilizador SET ?', { name: name, email: email, cor_frente: Frente, cor_verso: Tras, password: passTemporaria, Activate: active, secretToken: secretToken }, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        //////
                        var mailOptions = {
                            from: 'emailauxiliar75@gmail.com',
                            to: email,
                            subject: "Account Verification",
                            text: "Click on the link below to veriy your account " + url,
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                //Handle error here
                                res.send('Please try again!');
                            } else {
                                console.log('Email sent: ' + info.response);
                                res.send('Thanks for registering! Please confirm your email! We have sent a link!');
                            }
                        });
                        ////
                        return res.render('register', {
                            message: 'User Register - Check your email for confirmation'
                        })
                    }
                });
            });

    });

}

//GERAR CARTÃO E PASSWORD ALEATORIAMENTE 

const colors = ["Vermelho", "Amarelo", "Azul", "Rosa", "Verde"];
const codes = ["#FF0000", "#FFFF00", "#0000FF", "#f00c93", "#00FF00"];


function gerarAleatoriamenteFrente() {

    const frente = colors[Math.floor(Math.random() * colors.length)];

    return frente;
}

function gerarAleatoriamenteTras() {

    const tras = colors[Math.floor(Math.random() * colors.length)];

    return tras;
}

function gerarAleatoriamentePass(frente, tras) {

    const posicao = ["V", "H"];

    // const frente = gerarAleatoriamenteFrente();
    //const tras = gerarAleatoriamenteTras();

    const randomFT = [frente, tras];

    const sequencia = [randomFT[Math.floor(Math.random() * randomFT.length)],
    posicao[Math.floor(Math.random() * posicao.length)],
    randomFT[Math.floor(Math.random() * randomFT.length)],
    posicao[Math.floor(Math.random() * posicao.length)],
    randomFT[Math.floor(Math.random() * randomFT.length)],
    posicao[Math.floor(Math.random() * posicao.length)]
    ]

    const finalSequencia = sequencia.join('')

    return finalSequencia;
}


exports.verify = (req, res) => {
    var token = req.query.name;
    console.log(token)
    if (token) {
        db.connect(function () {
            var query = `UPDATE  Utilizador  SET  Activate = 1 WHERE secretToken = "${token}"`
            console.log(query)
            db.query(query, async function (err, results, _fields) {
                if (err) {
                    console.log(err);
                    res.send('Please try again!');
                }
                else {
                    console.log("updated Successfully");

                    /////
                    var query = `SELECT  cor_frente, cor_verso FROM Utilizador WHERE secretToken = "${token}"`
                    console.log(query)
                    db.query(query, async function (err, results, _fields) {
                        if (err) {
                            console.log(err);
                            res.send('Please try again!');
                        }
                        else {
                            console.log("updated Successfully");
                            let result = await getUniquePassword(results[0].cor_frente, results[0].cor_verso)

                            const hashedPassword = result[0]
                            const pass = result[1]

                            var query = `UPDATE  Utilizador  SET password = "${hashedPassword}" WHERE secretToken = "${token}"`
                            console.log(query)
                            db.query(query, function (err, results, _fields) {
                                if (err) {
                                    console.log(err);
                                    res.send('Please try again!');
                                }
                                else {
                                    console.log("updated Successfully");
                                }
                            })


                            res.render('paginapdf', { frente: codes[colors.indexOf(results[0].cor_frente)], tras: codes[colors.indexOf(results[0].cor_verso)], pass: pass })
                            let docImage =
                                generate_card(
                                    codes[colors.indexOf(results[0].cor_frente)],
                                    codes[colors.indexOf(results[0].cor_verso)],
                                    pass,
                                    res
                                )

                            // Pipe generated PDF into response
                            docImage.pipe(res);
                            docImage.end()

                        }

                    })

                }

            })
        })

    } else {
        return res.sendStatus(403)
    }
}




exports.login = async (req, res) => {
    if (req.body.passwordhidden == null) {
        return
    }
    console.log(req.body)

    let CurrentString = req.body.passwordhidden

    const currentPass = hash(CurrentString, 8);

    db.query('SELECT name, email FROM Utilizador WHERE password = ? ', [currentPass],
        (error, results) => {
            if (error) {
                console.log(error);
            }
            if (results.length > 0) {
              //  const name = results[0]
                console.log("sucesso")
                console.log(results)
                return  res.render('profile', { name: results[0].name , email: results[0].email } )
                //return res.render('profile')
            } else {
                console.log("Não encontrado")
            }

        })

}


async function getUniquePassword(frente, verso) {
    var isUnique = false
    var pass
    var hashedPassword

    pass = gerarAleatoriamentePass(frente, verso);

    hashedPassword = hash(pass);
    
    isUnique = await getByPassword(hashedPassword)

    console.log(isUnique)
    // recursivamente em vez de usar while
    if(isUnique){ // se a funcao devolveu o true 
        return [hashedPassword, pass] // devolve a pass encriptada para por na bd
    } else { // se nao é porque a passe ja existia na bd e a funcao é chamada de novo para gerar uma nova e verificar de novo 
        return getUniquePassword(frente, verso)
    }

}

function getByPassword(hashedPassword) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Utilizador WHERE password = ? ', [hashedPassword], (error, results) => {
            if (error) {
                reject(err)
            } else {
                resolve(results.length == 0) // devolve esta expressao como true
            }
        })
    })

}
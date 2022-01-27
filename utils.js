
const { createHash } = require('crypto');
const fs = require("fs")
const PDFDocument = require('pdfkit');


//points to millimeters ratios
let ptm = 0.352777778
//largura do cartao
let cardWidth = 54 / ptm
let cardHeight = 86 / ptm


module.exports.hash = (passw) => {

    return createHash('sha256').update(passw).digest('hex');

}

module.exports.generate_card = (frente, tras, pass) => {

    const doc = new PDFDocument();

      
    doc
        .lineCap('square')
        .rect(50,50,cardWidth,cardHeight)
        .fill(frente);
    
    doc
        .lineCap('square')
    
        .rect(200,50,cardWidth,cardHeight)
        .fill(tras);
    
    doc
        .fontSize(25)
        .fill("#00000")
        .text("Password: " + pass, 100, 500)
        .text("Explicação sequência -> Cor Orientação", 100, 600)

      
    return doc
}
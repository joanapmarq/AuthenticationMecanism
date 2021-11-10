
const { createHash } = require('crypto');
const fs = require("fs")
const PDFDocument = require('pdfkit');



module.exports.hash = (passw) => {

    return createHash('sha256').update(passw).digest('hex');

}

module.exports.generate_card = (frente, tras, pass, res) => {

    const doc = new PDFDocument();
      
    doc
        .lineCap('square')
        .rect(50,50,150,300)
        .fill(frente);
    
    doc
        .lineCap('square')
    
        .rect(200,50,150,300)
        .fill(tras);
    
    doc
        .fontSize(25)
        .fill("#00000")
        .text("Password: " + pass, 100, 500)
        .text("Explicação sequência -> Cor Orientação", 100, 600)

      
    return doc
}
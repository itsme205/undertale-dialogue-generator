const generator = require('./generator.js');
const fs = require('fs');

generator.createFaceSequence("Flowey_seq_01", [
    __dirname + "/src/images/faces/Flowey/2.png",
    __dirname + "/src/images/faces/Flowey/0.png"
]).then(async() => {
    generator.generateDialogue({ text: `* Hmm... You're new here, aren' tcha ?`, delay: 10, face_sequence: "Flowey_seq_01" }).then(async(buffer) => {
        await fs.writeFileSync(__dirname + "/dialog.gif", buffer);
        console.log("Your result is ready! Check " + __dirname + "/dialog.gif");
    }).catch((err) => {
        console.log(err)
    })
});

# undertale-dialogue-generator

English 🇬🇧:
> This script is generates the dialogues in Undertale game style and returns it as a .gif buffer, that could be saved as a file then. Besides, this script is have quite a few settings which could help to make a face animation of the character.

Русский 🇷🇺:
> Этот скрипт генерирует диалоги в стиле игры Undertale и возвращает в качестве .gif буфера, который потом можно сохранить как файл. Помимо этого, у него немало настроек, которые помогут анимировать лицо персонажа.


# Usage #
You can also the usage example in **example.js**.
< const generator = require('./generator.js');
const fs = require('fs');

generator.createFaceSequence("Flowey_seq_01", [ // Creating a face sequence
    __dirname + "/src/images/faces/Flowey/2.png",
    __dirname + "/src/images/faces/Flowey/0.png"
]).then(async() => {
    generator.generateDialogue({ text: `* Howdy! I'm Flowey - the flower Flowey. \n* Are you here in a first time. Aren't cha ?`, delay: 10, face_sequence: "Flowey_seq_01" }).then(async(buffer) => {
        await fs.writeFileSync(__dirname + "/dialog.gif", buffer);
        console.log("Your result is ready! Check " + __dirname + "/dialog.gif");
    }).catch((err) => {
        console.log(err)
    })
});
> 

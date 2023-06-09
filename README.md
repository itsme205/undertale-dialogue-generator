# undertale-dialogue-generator
![dialog1](https://user-images.githubusercontent.com/68152573/234369452-c9d28fbf-67e1-4ddb-b9d4-b653ff4f7256.gif)


English 🇬🇧:
> This script generates dialogues in Undertale game style and returns it as a .gif buffer, that buffer could be saved as a file then. Besides, this script have quite a few settings which could help to make a face animation of the character. Great for Chat-Bot RPG Game.

Русский 🇷🇺:
> Этот скрипт генерирует диалоги в стиле игры Undertale и возвращает в качестве .gif буфера, который потом можно сохранить как файл. Помимо этого, у него немало настроек, которые помогут анимировать лицо персонажа. Отлично подойдет для создания какой-либо RPG игры в чатах.


# Usage #
You can see this usage example in **example.js**.
```js
const generator = require('./generator.js');
const fs = require('fs');

generator.createFaceSequence("Flowey_seq_01", [ // Creating a face sequence
    __dirname + "/src/images/faces/Flowey/2.png",
    __dirname + "/src/images/faces/Flowey/0.png"
]).then(async() => {
    generator.generateDialogue({ text: `Hmm... You're new here, aren' tcha ?`, delay: 10, face_sequence: "Flowey_seq_01" }).then(async(buffer) => {
        await fs.writeFileSync(__dirname + "/dialog.gif", buffer);
        console.log("Your result is ready! Check " + __dirname + "/dialog.gif");
    }).catch((err) => {
        console.log(err)
    })
});
```

# Functions & Parameters #

## .generateDialogue() ##
> Renders dialogue with provided parameters.
> {  <br/>
            **``text``**: "The text of your dialogue. *string*",  <br/>
            **``face_path``**: "The path to your character's face. This wouldn't work if you set **face_sequence**. *string*",  <br/>
            **``face_sequence``**: "Sequence name. You should register it by using function **.createFaceSequence()** first. *string*",  <br/>
            **``delay``**: "Milliseconds delay between frames, that is between characters render. *number*",  <br/>
            **``shakeFace``**: "Responsible for face shaking while dialogue draw. *boolean*"  <br/>
        }  <br/>
  <br/>
  
**Returns:**
> Promise returns generated buffer so you can save it as a **.gif** with using **fs module**.  <br/>

**Example:**
```js
const generator = require('./generator.js');
generator.generateDialogue({ text: `* H-H-Hello!`, delay: 10, face_path: __dirname + "/src/images/faces/Alphys/0.png" }).then(async(buffer) => {
        await fs.writeFileSync(__dirname + "/mydialogue.gif", buffer);
    }).catch((err) => {
        console.log(err)
    })
```
> This code creates dialogue with text ``* H-H-Hello!`` and delay between characters ``10`` and static face which located in ``__dirname + "/src/images/faces/Alphys/0.png"``  <br/>
   
   <br/>
   <br/>
   <br/>

## .createFaceSequence() ##
> Creating face sequence which could be played in **.generateDialogue()**.
> 1. sequenceName = "name" - ``name of the sequence``
> 2. sequenceFrames = [] - ``array with paths to the sequences``  <br/>
  <br/>
  
**Returns**
> Nothing.  <br/>

**Example**
```js
const generator = require('./generator.js');

    generator.createFaceSequence("Flowey_seq_01", [
    __dirname + "/src/images/faces/Flowey/2.png",
    __dirname + "/src/images/faces/Flowey/0.png"
]).then(async() => {
    console.log("Sequence is created.");
});
```
> This code is creating sequence with name ``Flowey_seq_01``.


P.S: String transfer (\n) could be working bad. I know it and maybe I will fix it later.

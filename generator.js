const { createCanvas, Canvas, registerFont, loadImage } = require('canvas');
const GIFEncoder = require('gif-encoder-2')
const fs = require('fs');
var registeredFonts = new Set();
var faceSequences = new Map();

module.exports = {
    font: {
        path: __dirname + "/src/fonts/determination.otf",
        name: "Determination"
    },
    createFaceSequence: function (sequenceName = "Unnamed", framesArray = []) {
        return new Promise(async (resolve, reject) => {
            if (framesArray.length === 0) return reject(new Error("Sequences length cannot be 0."))

            const filteredArray = framesArray.filter((path) => { return fs.existsSync(path) })
            if (filteredArray.length === 0) return reject(new Error("There is no one valid frame. Please, provide a path to the frame."))

            var loadedImages = []
            for (let i in filteredArray) {
                loadedImages.push(await loadImage(filteredArray[i]))
            }
            faceSequences.set(sequenceName, loadedImages)

            resolve()
        })
    },
    generateDialogue: async function generateDialogue({ text = "Text is not setted up.", face_path = undefined, face_sequence = undefined, delay = 10, shakeFace = false }) {
        return new Promise(async (resolve = function (buffer = Buffer) { }, reject) => {
            if (!registeredFonts.has(this.font.path)) {
                if (fs.existsSync(this.font.path)) {
                    registerFont(this.font.path, { family: this.font.name })
                } else {
                    this.font.name = "Sans"
                }
            }

            var dialogueData = new Map();
            dialogueData.set("stringMaxCharacters", 29);
            dialogueData.set("x", 330);
            dialogueData.set("y", 100);

            const canvas = createCanvas(1530, 425)
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false

            const background = await loadImage(__dirname + '/src/images/background.png');

            var face = undefined;
            if (face_path && !face_sequence && fs.existsSync(face_path)) {
                face = await loadImage(face_path)

                dialogueData.set("stringMaxCharacters", 21)
            } else if (face_sequence && faceSequences.get(face_sequence)) {
                face = faceSequences.get(face_sequence)[0]

                if (faceSequences.get(face_sequence).length === 1) {
                    face_sequence = undefined
                }

                dialogueData.set("stringMaxCharacters", 21)
            }

            if (!face && !face_sequence) {
                dialogueData.set("x", 50)
            }

            function loadBackground() {
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
                if (face) {
                    ctx.drawImage(face, (shakeFace ? Math.floor(Math.random() * (40 - 32) + 32) : 37), (shakeFace ? Math.floor(Math.random() * (38 - 34) + 34) : 35), 280, 350)
                }
            }

            const encoder = new GIFEncoder(canvas.width, canvas.height)
            encoder.useOptimizer = true
            encoder.setFrameRate(60)

            encoder.start()
            var stringChars = 0;
            var splittedText = text.split(' ');
            var stringLength = 1;
            for (let i in splittedText) {
                if (splittedText[i] === "\n" || splittedText[i].startsWith("\n")) {
                    stringChars = 0
                }
                if (stringLength >= 4) break;


                if ((stringChars + splittedText[i].length) >= dialogueData.get("stringMaxCharacters")) {
                    splittedText[i] = "\n" + splittedText[i]
                    stringChars = splittedText[i].length
                    stringLength += 1;
                } else {
                    stringChars += splittedText[i].length
                }
            }

            var overwritedText = splittedText.join(" ")
            var faceSequenceCounter = 1
            for (var i = 0; i < overwritedText.length; i++) {
                if ((JSON.parse(i) + 1) == overwritedText.length) {
                    if (face_sequence) {
                        face = faceSequences.get(face_sequence)[0]
                    }
                    ctx.fillText(overwritedText, dialogueData.get("x"), dialogueData.get("y"))
                    encoder.setDelay(60000)
                    encoder.addFrame(ctx)

                    encoder.finish()
                    resolve(encoder.out.getData())
                } else {
                    if (faceSequenceCounter >= faceSequences.get(face_sequence)?.length) {
                        faceSequenceCounter = 0
                    }
                    if (face_sequence) {
                        face = faceSequences.get(face_sequence)[faceSequenceCounter]
                        faceSequenceCounter += 1
                    }
                    loadBackground()
                    ctx.fillStyle = "WHITE"
                    ctx.font = "90px " + this.font.name
                    ctx.fillText(overwritedText.substring(0, i), dialogueData.get("x"), dialogueData.get("y"))
                    encoder.setDelay(delay)
                    encoder.addFrame(ctx)
                }
            }
        })
    }
}
let chain = {};
let words = [];
let sentences = [];


let sourceText = `
Die Katze hat den Hund gejagt. 
Der Papagei ist laut.
Ich gehe zur Schule.
Ich mag Blumen und Tiere.
Seine Mutter hat ihm das verboten.
Er geht in den Wald spazieren.
Der Löwe ist ziemlich gross.
Die Blumen blühen im Frühling.
Im Sommer ist es besonders warm.
Im Herbst findet Halloween statt.
Oft schneit es im Winter.
`;

function setup(){
    createCanvas(600, 400);
    background(255);
    words = sourceText.split(/\s+/); //gibt Array zurück. \ bedeutet Leerzeichen, + eins oder mehr davon

    for(let i = 0; i < words.length -1; i++){

        let word = words[i];
        let next = words[i + 1];

        // Falls Wort nicht existiert wird Liste erstellt: 
        
        if(!chain[word]){
            chain[word] = [];
        }
        chain[word].push(next);
    }
    textSize(16);
    fill(0);

    let y = 30;   

    for(let i = 0; i < 5; i++){
        let sentence = generateSentence(10);
        sentences.push(sentence);
        text(sentence, 20, y);

        y += 30;
    }
}

function generateSentence(length){
    let keys = Object.keys(chain); // holt alles aus Chain und speichert es in Array
    let word = random(keys);
    let sentence = [word];

    for(let i = 0; i < length - 1; i++){

        if(chain[word]){

            word = random(chain[word]);
            sentence.push(word);
        } else {

            break;
        }
    }
    return sentence.join(" ");
}


function mousePressed(){

    saveCanvas("markov-text", "png");
}


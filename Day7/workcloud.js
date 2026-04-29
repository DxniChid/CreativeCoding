let chain = {};
let sentences = [];
let cloud = [];

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

function setup() {

    createCanvas(600, 400);
    background(255);

    buildMarkov();
    generateSentences();

    let fullText = sentences.join(" ");
    let freq = buildNGrams(fullText, 1);

    buildWordCloud(freq, 60);
}

function draw() {
    background(255);

    textAlign(CENTER, CENTER);
    fill(0);

    for (let w of cloud) {
        textSize(w.size);
        text(w.word, w.x, w.y);
    }
}


function buildMarkov() {
    let words = sourceText.split(/\s+/);

    for (let i = 0; i < words.length - 1; i++) {
        let word = words[i];
        let next = words[i + 1];

        if (!chain[word]) {
            chain[word] = [];
        }
        chain[word].push(next);
    }
}

function generateSentences() {
    for (let i = 0; i < 5; i++) {
        sentences.push(generateSentence(10));
    }
}

function generateSentence(length) {
    let keys = Object.keys(chain);
    let word = random(keys);
    let sentence = [word];

    for (let i = 0; i < length - 1; i++) {
        if (chain[word]) {
            word = random(chain[word]);
            sentence.push(word);
        } else {
            break;
        }
    }

    return sentence.join(" ");
}


//N-Gram = Gruppe aufeinanderfolgenden Wörter

function buildNGrams(inputText, n) {

    let words = inputText.split(/\s+/);
    let freq = {};

    for (let i = 0; i < words.length - n; i++) {
        let gram = words.slice(i, i + n).join(" ");
        freq[gram] = (freq[gram] || 0) + 1; //zählt Häufigkeit
    }

    return freq;
}



function buildWordCloud(freqMap, maxWords) {
    let entries = Object.entries(freqMap); //macht Arrays

    entries.sort((a, b) => b[1] - a[1]);  //nach Häufigkeit sortiert
    entries = entries.slice(0, maxWords);

    let maxFreq = entries[0][1];

    cloud = [];

    for (let [word, freq] of entries) {
        let size = map(freq, 1, maxFreq, 14, 48); //berechnet Schriftgrösse 

        cloud.push({
            word,
            size,
            x: random(100, width - 100),
            y: random(100, height - 100)
        });
    }
}

function mousePressed(){
    saveCanvas("markov-workcloud", "png");
}
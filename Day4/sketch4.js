let agent;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(93, 195, 255);

    agent = {
        x: width / 2,
        y: height / 2,
        angle: random(TWO_PI),
        speed: 2,
        col: color(128, 129, 129)
    };

    strokeWeight(5);
}

function draw(){
    //Verändert die Richtung leicht
    agent.angle += random(-0.2, 0.2);

    agent.x += cos(agent.angle) * agent.speed;
    agent.y += sin(agent.angle) * agent.speed;

    let r = red(agent.col) + random(-5, 5);
    let g = green(agent.col) + random(-5, 5);
    let b = blue(agent.col) + random(-5, 5);
    agent.col = color(r, g, b);

    stroke(agent.col);

    point(agent.x, agent.y);

        // Punkte kehren zurück sobald sie aus dem Rand herausgehen    
        if (agent.x < 0) agent.x = width;
        if (agent.x > width) agent.x = 0;
        if (agent.y < 0) agent.y = height;
        if (agent.y > height) agent.y = 0;

 
}
function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}

function draw(){
    strokeWeight(10);
    stroke("blue");
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function gotResults(error, result){
    if(error){
        console.error(error);
    }

    else{
        console.log(result);
        document.getElementById("label").innerHTML = "Label:" + result[0].label;
        document.getElementById("confidence").innerHTML = "Confidence:" + Math.round(result[0].confidence * 100) + "%";
        utterThis = new SpeechSynthesisUtterance(result[0].label);
        synth.speak(utterThis);
    }
}

function clearCanvas(){
    background("white");
}


//video
let video;

let classifier;

let label = 'waiting...';

const numeroDeMoves = 3


//https://teachablemachine.withgoogle.com/models/wxn2Fyk5q/
//let modelURL = 'https://teachablemachine.withgoogle.com/models/Ugx_yoTiy/';
let modelURL = 'https://teachablemachine.withgoogle.com/models/wxn2Fyk5q/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  let c = createCanvas(640, 520);
  c.position(370, 200)
  video = createCapture(VIDEO);
  video.hide();
  // step 2 : start classifying
  classifyVideo();
  timerToStart()
}

function timerToStart() {
  var currentTime = 10;
  // Update the count down every 1 second
  var x = setInterval(function () {

    if (currentTime == 0) {
      currentTime = 10
      document.getElementById("timer").innerHTML = "VAI COMEÇAR!!"
      clearInterval(x)
      return startSequence()
    }
    currentTime = currentTime - 1

    document.getElementById("timer").innerHTML = (currentTime + 1) + "s ";

  }, 1000);
}

function startSequence() {

  let currentString = ""
  let currentFetched = 0
// guardar na currentString a pass que leu 
  let timerino = setInterval(() => {  
    if (currentFetched == 3) {
      clearInterval(timerino)
      console.log(currentString)
      document.getElementById("timer").innerHTML = "Sorria :D";
      return postPassword(currentString)
    }
    let currentLabel = label
    currentString = currentString + currentLabel.replace(" ", "")
    currentFetched = currentFetched + 1
    console.log(currentLabel)
  }, 4000);

}

function postPassword(password) {

  document.getElementById("passwordhidden").value = password
  document.getElementById("hiddenform").submit()

}

// step 2 classify
async function classifyVideo() {
  classifier.classify(video, gotResults)
}

function draw() {
  background(0);
  // DRAW the video
  image(video, 0, 0);
  // DRAW 
  noFill();
  //square(100, 50, 400);   
  rect(50, 55, 550, 400);
  // step 4 :DRAW the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
}

//STEP 3 : GET THE CLASSIFICATION 
function gotResults(error, results) {
  if (error) {
    console.error * (error);
    return; //salta para outra função  
  }
  label = results[0].label;

  classifyVideo();
}
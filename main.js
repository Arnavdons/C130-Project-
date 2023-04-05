song1="";

status="";

status_1="";

score_left_wrist=0;

score_right_wrist=0;

song2="";

left_wrist_x=0;

left_wrist_y=0;

right_wrist_x=0;

right_wrist_y=0;

function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(400,350);
canvas.center();
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelloaded);
posenet.on("pose",gotPoses);
}

function modelloaded(){
console.log("Modal is Loaded!");
}

function draw(){
image(video,0,0,400,350);
fill("red");
stroke("red");
song1_name=song1.isPlaying();
song2_name=song2.isPlaying();
if(score_left_wrist>0.2){
circle(left_wrist_x,left_wrist_y,20);
song2.stop();

if(song1_name==false){
song1.play();
document.getElementById("song_name").innerHTML="Song 1 is Playing";
}
}

if(score_right_wrist>0.2){
circle(right_wrist_x,right_wrist_y);
song1.stop();

if(song2_name==false){
song2.play();
document.getElementById("song_name").innerHTML="Song 2 is Playing";
}
}

}

function gotPoses(results){
if(results.length>0){
console.log(results);

right_wrist_x=results[0].pose.rightWrist.x;
right_wrist_y=results[0].pose.rightWrist.y;
console.log(right_wrist_x,right_wrist_y);

score_left_wrist=results[0].pose.keypoints[9].score;
score_right_wrist=results[0].pose.keypoints[10].score;
console.log(score_left_wrist,score_right_wrist);

left_wrist_x=results[0].pose.leftWrist.x;
left_wrist_y=results[0].pose.leftWrist.y;
console.log(left_wrist_x,left_wrist_y);
}
}
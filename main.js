song1="";
song2="";
song1_status="";
song2_status="";
scoreLeftWrist=0;
scoreRightWrist=0;
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw()
{
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,25);
        song2.stop();
        if(song1_status==false)
        {
            song1.play();
            document.getElementById("status").innerHTML="PLaying - Harry Potter theme song";
        }
    }
    if(scoreRightWrist>0.2)
    {
        circle(RightWristX,RightWristY,25);
        song1.stop();
        if(song2_status==false)
        {
            song2.play();
            document.getElementById("status").innerHTML="PLaying - Peter Pan song";
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X : "+leftWristX+" | Left Wrist Y : "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X : "+rightWristX+" | Right Wrist Y : "+rightWristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("Left Wrist score : "+scoreLeftWrist+" | Right Wrist score : "+scoreRightWrist);
    }
}
function play()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}
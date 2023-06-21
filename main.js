//https://teachablemachine.withgoogle.com/models/JVdhtVEN3/

prediction_1="";


Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JVdhtVEN3/model.json',modelLoaded);

function modelLoaded()
{
    console.log("model loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = toSpeak;

    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}






function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error) {
        console.error(error);

    }else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        toSpeak = "";
        
        if(results[0].label == "best")
        {
            toSpeak = "all the best";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
        }
        if(results[0].label == "victory")
        {
            toSpeak = "that was a marvelous victory";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
        }
        if(results[0].label == "amazing")
        {
            toSpeak = "this is looking amazing";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
        }
        speak();

        

    }
    }

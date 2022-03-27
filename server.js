const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.listen(8080,() => {
    console.log('Express App on port 8080');
})

//router
app.use(express.static(path.join(__dirname,'html')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/', (req,res) => {
    console.log('express / get')
    res.sendFile(path.join(__dirname,'html','index.html'));
});
app.post('/', (req, res) => {
    console.log('express / post');
})
app.post('/post', (req, res) => {
    console.log('express /post post');
    console.log(req.body);
    var data = req.body
    var js = {
        height : data.height,
                    pose : {
                        nose : data.pose.nose,
                        leftEye : data.pose.leftEye,
                        rightEye : data.pose.rightEye,
                        leftEar : data.pose.leftEar,
                        rightEar : data.pose.rightEar,
                        leftShoulder : data.pose.leftShoulder,
                        rightShoulder : data.pose.rightShoulder,
                        leftElbow : data.pose.leftElbow,
                        rightElbow : data.pose.rightElbow,
                        leftWrist : data.pose.leftWrist,
                        rightWrist : data.pose.rightWrist,
                        leftHip : data.pose.leftHip,
                        rightHip : data.pose.rightHip,
                        leftKnee : data.pose.leftKnee,
                        rightKnee : data.pose.rightKnee,
                        leftAnkle : data.pose.leftAnkle,
                        rightAnkle : data.pose.rightAnkle
                    },
                    body : {
                        head : data.body.head,
                        left_upper_arm : data.body.left_upper_arm,
                        right_upper_arm : data.body.right_upper_arm,
                        left_upper_leg : data.body.left_upper_leg,
                        right_upper_leg : data.body.right_upper_leg,
                        left_lower_leg : data.body.left_lower_leg,
                        right_lower_leg : data.body.right_lower_leg,
                        torso : data.body.torso,
                        left_foot : data.body.left_foot,
                        right_foot : data.body.right_foot
                    }
    }
    const json = JSON.stringify(js);
    fs.writeFile('./test.json',json,function(err, result) {
        if(err) console.log('error', err);
      });
    });
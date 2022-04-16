import express from 'express';
import { response } from 'express';
const router = express.Router();
import * as fs from 'fs';
import {readdata} from '../database/database.js';

// get /
router.get('/', (req, res) => {
    console.log('express / get!')
    fs.readFile('./html/index.html','utf-8', (err,data) => {
        if(err) {res.send(err); }
        res.send(data);
    })
});

//get /image
router.get('/image', (req, res) => {
    console.log('get image');
    fs.readFile('./html/image/image.jpeg', (err,data) => {
        if(err) console.error(err);
        res.send(data);
    })
});

//post /post
router.post('/post', (req, res) => {
    //real person height
    let realheight = 1700;
    //real person weight
    let realweight = 76;
    console.log('express /post post');
    console.log(req.body);
    var data = req.body.body;
    let min = 999999;
    let index = 0;
    //height : real height ratio
    let ratio = parseFloat(realheight) / parseFloat(data.height);
    console.log("ratio : " + ratio);
    for(let i = 0; i < 6420; i++) {
        //콜백 함수, 추후 for문 밖으로 빼낼 예정
        readdata(i).then(function(temp) {
            console.log(i+"번째 callback 실행!");
            // height 비교 차이가 2% 이상시 데이터 사용불가
            if(Math.abs(data.height * ratio - temp.height) > (data.height * ratio / 50)) {
                console.log("height : " + Math.abs(data.height * ratio - temp.height));
                return;
            }
            // weight 비교 차이가 10% 이상시 데이터 사용불가
            if(Math.abs(realweight - temp.weight) > (realweight / 10)) {
                console.log("weight : " + Math.abs(realweight - temp.weight));
                return;
            }
            //upper leg width 비교 차이가 10% 이상시 데이터 사용불가  
            if(Math.abs((parseFloat(data.left_upper_leg.width) + parseFloat(data.right_upper_leg.width)) / 2 * ratio - temp.upper_leg_width > ((parseFloat(data.left_upper_leg.width) + parseFloat(data.right_upper_leg.width)) / 2 * ratio / 10))) {
                console.log("upper_leg : " + Math.abs((parseFloat(data.left_upper_leg.width) + parseFloat(data.right_upper_leg.width)) / 2 * ratio - temp.upper_leg_width));
                return;
            }
            //lower leg width 비교 차이가 10% 이상시 데이터 사용불가
            if(Math.abs((parseFloat(data.left_lower_leg.width) + parseFloat(data.right_lower_leg.width)) / 2 * ratio - temp.lower_leg_round / 1.9108 > (parseFloat(data.left_lower_leg.width) + parseFloat(data.right_lower_leg.width)) / 2 * ratio / 10)) {
                console.log("lower_leg : " + Math.abs((parseFloat(data.left_lower_leg.width) + parseFloat(data.right_lower_leg.width)) / 2 * ratio - (temp.lower_leg_round / 1.9108)));
                return;
            }
            //torso 비교 차이가 3.3% 이상시 데이터 사용불가
            if(Math.abs(data.torso.width * ratio - temp.torso_width) > data.torso.width * ratio / 33) {
                console.log("torso : " + Math.abs(data.torso.width * ratio - temp.torso_width));
                return;
            }
            // 합산 점수
            let t = Math.abs(data.height * ratio - temp.height) + 
            Math.abs((realweight - temp.weight) * 1.3) + 
            Math.abs((parseFloat(data.left_upper_leg.width) + parseFloat(data.right_upper_leg.width)) / 2 * ratio - temp.upper_leg_width) + 
            Math.abs((parseFloat(data.left_lower_leg.width) + parseFloat(data.right_lower_leg.width)) / 2 * ratio - temp.lower_leg_round / 1.9108) + 
            Math.abs(data.torso.width * ratio - temp.torso_width);
            // 점수가 낮을 수록 정확한 데이터라고 볼 수 있음
            if(min > t) {
                min = t;
                index = i;
            }
            console.log("min : " + min + " t : " + t + " index : " + index);
        }).catch(function(err){console.error(err)}) 
    }
    console.log(min);
    //임시적인 json 데이터 현재 콜백함수로 인해 값 안들어감 + data = req.body.body 가 되면서 오류발생함
    var js = 
    {
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
    //json 파일 저장하기
    const json = JSON.stringify(js);
    fs.writeFile('./test.json',json,function(err, result) {
        if(err) console.log('error', err);
    });
});

export default router;
import path from 'path';
import express from 'express';
import * as fs from 'fs';
import {readdata} from '../database/database.js';

const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,'html')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//router
app.get('/', (req, res) => {
    console.log('express / get!')
    fs.readFile('./html/index.html','utf-8', (err,data) => {
        if(err) {res.send(err); }
        res.send(data);
    })
});
app.get('/image', (req, res) => {
    console.log('get image');
    fs.readFile('./html/image/8_0006.jpg', (err,data) => {
        if(err) console.error(err);
        res.send(data);
    })
});
app.post('/post', (req, res) => {
    console.log(req.body);
    let index = 0;
    var data = req.body.body;
    readdata().then((snapshot) => {
        const i = index;
        var temp = {
            age : snapshot.child(i+"/age").val(),
            ankle_height : snapshot.child(i+"/ankle_height").val(),
            arm_height : snapshot.child(i+"/arm_height").val(),
            gender : snapshot.child(i+"/gender").val(),
            height : snapshot.child(i+"/height ").val(),
            id : snapshot.child(i+"/id").val(),
            lower_leg_full_height : snapshot.child(i+"/lower_leg_full_height").val(),
            lower_leg_height : snapshot.child(i+"/lower_leg_full_height").val() - snapshot.child(i+"/ankle_height").val(),
            lower_leg_width : snapshot.child(i+"/lower_leg_width").val(),
            upper_arm_height : snapshot.child(i+"/upper_arm_height").val(),
            upper_arm_width : snapshot.child(i+"/upper_arm_width").val(),
            upper_leg_height : snapshot.child(i+"/upper_leg_height").val(),
            upper_leg_width : snapshot.child(i+"/upper_leg_width").val(),
            torso_width : snapshot.child(i+"/torso_width").val()
        };
        let ratio = parseFloat(temp.height) / parseFloat(data.height);
        console.log(temp);
        const dataset = {
            height : parseFloat(data.height) * ratio - temp.height,
            left_upper_arm_width : parseFloat(data.left_upper_arm.width) * ratio - parseFloat(temp.upper_arm_width),
            right_upper_arm_width : parseFloat(data.right_upper_arm.width) * ratio - parseFloat(temp.upper_arm_width),
            left_upper_arm_height : parseFloat(data.left_upper_arm.height) * ratio - parseFloat(temp.upper_arm_height),
            right_upper_arm_height : parseFloat(data.right_upper_arm.height) * ratio - parseFloat(temp.upper_arm_height),
            left_upper_leg_width : parseFloat(data.left_upper_leg.width) * ratio - parseFloat(temp.upper_leg_width),
            right_upper_leg_width : parseFloat(data.right_upper_leg.width) * ratio - parseFloat(temp.upper_leg_width),
            left_upper_leg_height : parseFloat(data.left_upper_leg.height) * ratio - parseFloat(temp.upper_leg_height),
            right_upper_leg_height : parseFloat(data.right_upper_leg.height) * ratio - parseFloat(temp.upper_leg_height),
            left_lower_leg_width :parseFloat(data.left_lower_leg.width) * ratio - parseFloat(temp.lower_leg_width),
            right_lower_leg_width : parseFloat(data.right_lower_leg.width) * ratio - parseFloat(temp.lower_leg_width),
            left_lower_leg_height : parseFloat(data.left_lower_leg.height) * ratio - parseFloat(temp.lower_leg_height),
            right_lower_leg_height : parseFloat(data.right_lower_leg.height) * ratio - parseFloat(temp.lower_leg_height),
            torso : parseFloat(data.torso.width) * ratio - parseFloat(temp.torso_width)
        }
        fs.readFile('./data.json','utf8',(err, jsonfile) => {
            if(err){console.error("error!" + err);}
            const result = JSON.parse(jsonfile);
            const json = {
                height : parseFloat(result.height) + parseFloat(dataset.height),
                left_upper_arm_width : parseFloat(result.left_upper_arm_width) + parseFloat(dataset.left_upper_arm_width) / 2 ,
                right_upper_arm_width : parseFloat(result.right_upper_arm_width) + parseFloat(dataset.right_upper_arm_width) / 2 ,
                left_upper_arm_height : parseFloat(result.left_upper_arm_height) + parseFloat(dataset.left_upper_arm_height) / 2 ,
                right_upper_arm_height : parseFloat(result.right_upper_arm_height) + parseFloat(dataset.right_upper_arm_height) / 2 ,
                left_upper_leg_width : parseFloat(result.left_upper_leg_width) + parseFloat(dataset.left_upper_leg_width) / 2 ,
                right_upper_leg_width : parseFloat(result.right_upper_leg_width) + parseFloat(dataset.right_upper_leg_width) / 2 ,
                left_upper_leg_height : parseFloat(result.left_upper_leg_height) + parseFloat(dataset.left_upper_leg_height) / 2 ,
                right_upper_leg_height : parseFloat(result.right_upper_leg_height) + parseFloat(dataset.right_upper_leg_height) / 2 ,
                left_lower_leg_width : parseFloat(result.left_lower_leg_width) + parseFloat(dataset.left_lower_leg_width) / 2 ,
                right_lower_leg_width : parseFloat(result.right_lower_leg_width) + parseFloat(dataset.right_lower_leg_width) / 2 ,
                left_lower_leg_height : parseFloat(result.left_lower_leg_height) + parseFloat(dataset.left_lower_leg_height) / 2 ,
                right_lower_leg_height : parseFloat(result.right_lower_leg_height) + parseFloat(dataset.right_lower_leg_height) / 2 ,
                torso :  parseFloat(result.torso) + parseFloat(dataset.torso) / 2
            }
            console.log(json);
            fs.writeFileSync('./data.json',JSON.stringify(json));
        });
    })
});

export default app;
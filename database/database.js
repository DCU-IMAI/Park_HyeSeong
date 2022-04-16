import database from './config.js';
import { getDatabase, push, ref, set, get, onValue, child } from "firebase/database";
0
const db = getDatabase(database);

function readdata(i)
{
    //콜백
    return new Promise(function(resolve){
        get(child(ref(db), '/' + i)).then((snapshot) => {
            var json = {arm_height : snapshot.child('/arm_height').val(), gender : snapshot.child('/gender').val(), height : snapshot.child('/height').val(), lower_leg_height : snapshot.child('/lower_leg_height').val(),
            lower_leg_round : snapshot.child('/lower_leg_round').val(),torso_width : snapshot.child('/torso_width').val(),upper_arm_height : snapshot.child('/upper_arm_height').val(),
            waist_round : snapshot.child('/waist_round').val(),weight : snapshot.child('/weight').val(), upper_leg_width : snapshot.child('/upper_leg_width').val()};
            //json 변수 resolve
            resolve(json);
            })
    })
}

export {readdata};
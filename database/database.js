import database from './config.js';
import { getDatabase, push, ref, set, get, onValue, child } from "firebase/database";
0
const db = getDatabase(database);

export function readdata()
{
    //콜백
    return new Promise(function(resolve){
        get(child(ref(db), '/')).then((snapshot) => {
            resolve(snapshot);
            })
    })
}
import path from 'path';
import express from 'express';
import router from './router.js';
import {fileURLToPath} from 'url';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname,'html')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//router
app.use('/', router);
app.use('/post', router);

export default app;
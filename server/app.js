import express from 'express';
import fileUpload from 'express-fileupload';
import { dirname, join } from 'path';
import postsRoutes from './routes/posts.routes.js';
import {fileURLToPath} from 'url'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(fileUpload({  
    useTempFiles: true,
    tempFileDir: './upload',
}));

app.use(postsRoutes);
app.use(express.static(join(__dirname, '../client/build')))

export default app;
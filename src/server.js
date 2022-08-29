import express from 'express'
import userRouter from './routes/user.ruoter.js'
import authRouter from './routes/auth.router.js';
import videoRouter from './routes/videos.router.js';

import errorHandler from './utils/errorHandler.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import cors from 'cors'

const app = express()

// parse application/json
app.use(express.json())
app.use(fileUpload())
app.use(express.static(path.join(process.cwd(), 'src', 'uploads')))
app.use(cors("*"));
app.use(express.urlencoded({
    extended: false
  }));

// routes
app.use( authRouter )
app.use( userRouter )
app.use( videoRouter )

app.use(errorHandler)

app.listen( process.env.PORT || 4000, () => console.log("server is running on port 4000") )

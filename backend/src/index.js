import express from 'express'
import 'dotenv/config';
import cors from 'cors'

import  dataRoute  from './routes/dataRoute.js'
import  chatRoute  from './routes/chatRoute.js'

const app = express();

const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, 
}));

app.use('/api/v1/data',dataRoute)
app.use('/api/v1/chat',chatRoute)


app.listen(PORT,()=>{
    console.log(`server listning on ${PORT}`)
})
import express from 'express'
import { chatController } from '../controllers/data.js';

const router = express.Router();


router.post('/',chatController)



export default router
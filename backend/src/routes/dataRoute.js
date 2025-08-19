import express from 'express'
import { pdf, text, url } from '../controllers/data.js';
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post('/text',text)
router.post('/url',url)
router.post("/pdf", upload.single("pdf"), pdf);



export default router
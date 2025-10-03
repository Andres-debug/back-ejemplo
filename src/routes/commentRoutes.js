import {Router} from 'express'
import { createComment,getComments } from '../controllers/commentController.js'

const router = Router();

router.get("/",getComments);
router.post("/",createComment)

export default router;
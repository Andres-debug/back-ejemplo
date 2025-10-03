import {Router} from 'express'
import { getPosts,createPost } from '../controllers/postController.js'

const router = Router();

router.get("/",getPosts);
router.post("/",createPost);

export default router;
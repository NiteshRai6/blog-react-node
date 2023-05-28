import express from 'express';
import { addPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post.js';

const router = express.Router();

router.get("/", getPosts);
router.get("/:post_id", getPost);
router.post("/", addPost);
router.delete("/:post_id", deletePost);
router.put("/:post_id", updatePost);

export default router;
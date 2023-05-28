import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const getPosts = (req, res) => {
    const q = req.query.post_cat
        ? "SELECT * FROM posts WHERE post_cat =?"
        : "SELECT * FROM posts";

    db.query(q, [req.query.post_cat], (err, data) => {
        if (err) return res.status(500).send(err);
        return res.json(data);
    })
}

export const getPost = (req, res) => {
    const q = "SELECT `post_id`, `user_name`, `post_title`, `post_des`, `post_img`, `post_cat`, `post_date` FROM users JOIN posts ON users.user_id = posts.user_id WHERE post_id = ? "

    db.query(q, [req.params.post_id], (err, data) => {
        console.log(err, data);
        if (err) return res.status(500).json(err);

        return res.json(data[0]);
    })
}

export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not Authenticated');

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');

        const q = "INSERT INTO posts (`post_title`, `post_des`, `post_img` , `post_cat`, `post_date`, `user_id`) VALUES (?)"

        const values = [req.body.post_title, req.body.post_des, req.body.post_img, req.body.post_cat, req.body.post_date, userInfo.user_id];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log(data);
            if (data.affectedRows > 0) return res.json("Post has been created");
        })
    })
}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not Authenticated');

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');

        const postId = req.params.post_id;
        const q = "DELETE FROM posts WHERE `post_id` = ? AND `user_id` = ?";

        db.query(q, [postId, userInfo.user_id], (err, data) => {
            if (err) return res.status(403).json('You can delete only your post');

            return res.json('Post has been deleted');
        })
    })
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return res.status(401).json('Not Authenticated');

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');

        const postId = req.params.post_id;
        const q = "UPDATE posts SET `post_title`=?, `post_des`=?, `post_img`=? , `post_cat`=? WHERE `post_id`=? AND `user_id`=?"

        const values = [req.body.post_title, req.body.post_des, req.body.post_img, req.body.post_cat];

        db.query(q, [...values, postId, userInfo.user_id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Post has been updated");
        })
    })
}
import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {

    //CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE user_email = ? OR user_name = ?";
    console.log(req.body);
    db.query(q, [req.body.user_email, req.body.user_name], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists");

        //Hash the password & create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.user_password, salt);

        const q = "INSERT INTO users (`user_name`,`user_email`,`user_password`) VALUES (?)"
        const values = [req.body.user_name, req.body.user_email, hash];

        db.query(q, [values], (err, data) => {

            if (err) {
                console.log(err)
                return res.status(500).json(err);
            }
            console.log(data);
            if (data.affectedRows > 0) return res.json("User has been created");
        });
    });

}

export const login = (req, res) => {

    //CHECK USER

    const q = "SELECT * FROM users WHERE user_name = ?";

    db.query(q, [req.body.user_name], (err, data) => {
        if (err) return res.json(err);
        console.log(data)

        if (data.length === 0) return res.status(404).json("User not found!");

        //CHECK PASSWORD

        const isPasswordCorrect = bcrypt.compareSync(req.body.user_password, data[0].user_password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({ user_id: data[0].user_id }, "jwtkey");
        const { user_password, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other);

    });
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).json("User has been logged out.");
    console.log('logout')
}
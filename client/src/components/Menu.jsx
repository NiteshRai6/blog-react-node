import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Menu = ({ post_cat }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/posts/?post_cat=${post_cat}`, { withCredentials: true });
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [post_cat])

    return (
        <div className='menu'>
            <h1>Other post you may like:</h1>
            {posts.map((post) => (
                <div className='post' key={post.post_id}>
                    <img src={`../upload/${post.post_img}`} alt='' />
                    <h2>{post.post_title}</h2>

                    <Link className="link" to={`/post/${post.post_id}`}>
                        <button onClick={e => {
                            const scrol = document.querySelector('body');
                            scrol.scrollIntoView({
                                behavior: 'smooth'
                            },)
                        }}>Know More</button>
                    </Link>

                </div>
            ))}

        </div>
    )
}

export default Menu;
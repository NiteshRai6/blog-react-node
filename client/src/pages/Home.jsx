import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const post_cat = useLocation().search;

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/posts${post_cat}`, { withCredentials: true });
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [post_cat])

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent;
  }

  return (
    <>
      <Navbar />

      <div className="home">
        <div className="posts">
          {posts.map((post, i) => (
            <div className="post" key={post.post_id} id={`post${i}`}>
              <div className="img">
                <img src={`./upload/${post.post_img}`} alt="" />
              </div>
              <div className="content">
                <h1>{post.post_title}</h1>
                <p>{getText(post.post_des)}</p>

                {currentUser ?
                  (
                    <Link className="link" to={`/post/${post.post_id}`}>
                      <button>Know More</button>
                    </Link>
                  )
                  :
                  (
                    <Link to='/'></Link>
                  )
                }

              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

    </>
  );
}

export default Home;
import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Edit from '..//images/edit.png';
import Delete from '..//images/delete.png';
import Menu from '../components/Menu'
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/posts/${postId}`, { withCredentials: true });
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${postId}`, { withCredentials: true });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent;
  }

  return (
    <>
      <Navbar />

      <div className='single'>
        <div className='content'>
          <img src={`../upload/${post?.post_img}`} alt='Blog' />

          <div className='user'>
            <div className='info'>
              <span>{post?.user_name}</span>
              <p>posted {moment(post.post_date).fromNow()}</p>
            </div>
            {currentUser.user_name === post?.user_name && (
              <div className='edit'>
                <Link to={`/write?`} state={post}>
                  <img src={Edit} alt='' />
                </Link>
                <img onClick={handleDelete} src={Delete} alt='' />
              </div>
            )}
          </div>
          <h1>{post.post_title}</h1>
          <div className='single-para'>{getText(post.post_des)}</div>
        </div>
        <Menu post_cat={post.post_cat} />
      </div>
      <Footer />
    </>
  )
}

export default Single;
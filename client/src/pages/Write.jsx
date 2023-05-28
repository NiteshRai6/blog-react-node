import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {
  const state = useLocation().state;
  const [post_title, setPost_title] = useState(state?.post_title || '');
  const [post_des, setPost_des] = useState(state?.post_des || '');
  const [file, setFile] = useState(null);
  const [post_cat, setPost_cat] = useState(state?.post_cat || '');

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post("http://localhost:4000/api/upload", formData, { withCredentials: true });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }


  const handleClick = async e => {
    e.preventDefault();

    try {
      const imgURL = await upload();

      state ?
        await axios.put(`http://localhost:4000/api/posts/${state.post_id}`,
          { post_title, post_des, post_cat, post_img: file ? imgURL : "" },
          { withCredentials: true })

        : await axios.post(`http://localhost:4000/api/posts/`,
          { post_title, post_des, post_cat, post_img: file ? imgURL : "", post_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") },
          { withCredentials: true });

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Navbar />

      <div className='add'>
        <div className='content'>
          <input type='text' placeholder='title' value={post_title} onChange={e => setPost_title(e.target.value)} />
          <div className='editorContainer'>
            <ReactQuill className='editor' theme='snow' value={post_des} onChange={setPost_des} />
          </div>
        </div>

        <div className='menu'>
          <div className='item'>
            <h1>Category</h1>
            <div className='cat'>
              <input type='radio' checked={post_cat === "art"} name='post_cat' value='art' id='art' onChange={e => setPost_cat(e.target.value)} />
              <label htmlFor='art'>Art</label>
            </div>
            <div className='cat'>
              <input type='radio' checked={post_cat === "science"} name='post_cat' value='science' id='science' onChange={e => setPost_cat(e.target.value)} />
              <label htmlFor='art'>Science</label>
            </div>
            <div className='cat'>
              <input type='radio' checked={post_cat === "technology"} name='post_cat' value='technology' id='technology' onChange={e => setPost_cat(e.target.value)} />
              <label htmlFor='art'>Technology</label>
            </div>
            <div className='cat'>
              <input type='radio' checked={post_cat === "cinema"} name='post_cat' value='cinema' id='cinema' onChange={e => setPost_cat(e.target.value)} />
              <label htmlFor='art'>Cinema</label>
            </div>
            <div className='cat'>
              <input type='radio' checked={post_cat === "design"} name='post_cat' value='design' id='design' onChange={e => setPost_cat(e.target.value)} />
              <label htmlFor='art'>Design</label>
            </div>
            <div className='cat'>
              <input type='radio' checked={post_cat === "food"} name='post_cat' value='food' id='food' onChange={e => setPost_cat(e.target.value)} />
              <label htmlFor='art'>Food</label>
            </div>
          </div>
          <div className='item'>
            <h1>Publish</h1>
            <input type='file' id='file' name='' onChange={e => setFile(e.target.files[0])} />
            <div className='publish-button' type='button' onClick={handleClick}>Publish</div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Write;
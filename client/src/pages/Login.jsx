import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    user_name: "",
    user_password: ""
  })

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleChange = e => {
    setInputs(pre => ({ ...pre, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/')
    } catch (err) {
      setError(err.response.data);
    }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input type='text' placeholder='username' name='user_name' onChange={handleChange} />
        <input type='password' placeholder='password' name='user_password' onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {error && <p className='invalid-input'>{error}</p>}

        <span>Don't you have an account? <Link to='/register'>Register</Link>  </span>

        <span>Are you Guest? go to <Link to='/'>Home</Link> </span>
      </form>

    </div>
  )
}

export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    user_name: "",
    user_email: "",
    user_password: ""
  })

  const [error, setError] = useState(null);
  const [field_error, setField_error] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(pre => ({ ...pre, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (!document.getElementById('form1').checkValidity())
      return setField_error(true);

    // if (!inputs.user_name || !inputs.user_email || !inputs.user_password) {
    //   setField_error(true);
    //   return false;
    // }

    try {
      await axios.post("http://localhost:4000/api/auth/register", inputs);
      navigate('/login');
    } catch (err) {
      setError(err.response.data);
    }

  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form id='form1'>
        <input required type='text' placeholder='username' name='user_name' onChange={handleChange} />
        {field_error && !inputs.user_name && <span className='invalid-input'> Enter valid user name </span>}

        <input required type='email' placeholder='email' name='user_email' onChange={handleChange} />
        {field_error && !inputs.user_email && <span className='invalid-input'> Enter valid user email </span>}

        <input required type='password' placeholder='password' name='user_password' onChange={handleChange} />
        {field_error && !inputs.user_password && <span className='invalid-input'> Enter valid user password </span>}

        <button onClick={handleSubmit}>Register</button>
        {error && <p className='invalid-input'>{error}</p>}
        <span>Do you have an account? <Link to='/login'>Login</Link> </span>

        <span>Are you Guest? go to <Link to='/'>Home</Link> </span>
      </form>

    </div>
  )
}

export default Register;
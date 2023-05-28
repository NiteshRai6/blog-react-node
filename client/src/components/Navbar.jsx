import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../style.scss';
import Logo from '../images/logo.png';
import { AuthContext } from '../context/authContext';
import { SlNote } from 'react-icons/sl';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {

  const navigate = useNavigate()

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='container'>

        <input type="checkbox" id='toggle-menu' />
        <label htmlFor='toggle-menu' className='side-nav-container'><GiHamburgerMenu className='side-nav-icon' /></label>

        <div className='logo' onClick={e => {
          const scrol = document.querySelector('body');
          scrol.scrollIntoView({
            behavior: 'smooth'
          }, 100)
        }}>
          <Link to='/'>
            <img src={Logo} alt='' />
          </Link>
        </div>

        <div className='links' onClick={e => {
          const scrol = document.querySelector('body');
          document.getElementById('toggle-menu').checked = false
          scrol.scrollIntoView({
            behavior: 'smooth'
          },)
        }}>
          <Link className='link' to='/?post_cat=art'>
            <h6>ART</h6>
          </Link>
          <Link className='link' to='/?post_cat=science'>
            <h6>SCIENCE</h6>
          </Link>
          <Link className='link' to='/?post_cat=technology'>
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className='link' to='/?post_cat=cinema'>
            <h6>CINEMA</h6>
          </Link>
          <Link className='link' to='/?post_cat=design'>
            <h6>DESIGN</h6>
          </Link>
          <Link className='link' to='/?post_cat=food'>
            <h6>FOOD</h6>
          </Link>
        </div>

        <div className='user-nav'>
          <span>{currentUser?.user_name}</span>

          {currentUser ? (
            <span onClick={async () => {
              await logout()
              navigate('/')
            }}>Logout</span>
          ) : (<Link className='link' to="/login">
            Login
          </Link>)}

          {currentUser ?
            (
              <span className='write'>
                <Link to='/write'> <SlNote /> </Link>
              </span>
            )
            :
            (
              <span className='write'>
                <Link to='/'> <SlNote /> </Link>
              </span>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default Navbar;
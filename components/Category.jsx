import React, { useState } from 'react'
import {NavLink} from 'react-router-dom';
import {FaBars} from 'react-icons/fa';


function Category() {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar)
    }

  return (
    <nav  className='navbar'>
        <div className='container'>
            <div className='logo'>
                <NavLink to={'/'} className='logo-text'>
                    <h3>SIMPLE CHEF</h3>
                </NavLink>
            </div>
            <div className="menu-icon" onClick={handleShowNavbar}>
                <FaBars />
            </div>
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
                <ul>
                    <li>
                        <NavLink className='navlink' to={'/'}>TOP PICKS</NavLink>
                    </li>
                    <li>
                        <NavLink className='navlink' to={'/cuisine/Italian'}>ITALIAN</NavLink>
                    </li>
                    <li>
                        <NavLink className='navlink' to={'/cuisine/American'}>AMERICAN</NavLink>
                    </li>
                    <li>
                        <NavLink className='navlink' to={'/cuisine/Thai'}>THAI</NavLink>
                    </li>
                    <li>
                        <NavLink className='navlink' to={'/cuisine/Japanese'}>JAPANESE</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Category
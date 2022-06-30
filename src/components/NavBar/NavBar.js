import React, { useState } from 'react'
import { Navbar, NavbarBrand, NavItem, NavLink, Nav, NavbarToggler, Collapse} from 'reactstrap';
import { BsFillPersonFill, BsSearch } from "react-icons/bs";
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom'
const NavBar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    
  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/" className="mr-auto logo">
            <img title='Title company' src={'/logo.png'} alt='Logo Company' />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar className=''>
            <Nav navbar className='ms-auto mb-2 mb-lg-0 text-center'>
                <NavItem>
                    <Link to="/" className='nav-link'>
                        Home
                    </Link>
                </NavItem><NavItem>
                    <Link to="/about" className='nav-link'>
                        About Us
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/category/celular" className='nav-link'>
                        Celulares
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/category/tablet" className='nav-link'>
                        Tablets
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/contact" className='nav-link'>
                        Contact
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to='/cart' className='nav-link'>
                        <CartWidget />
                    </Link>
                </NavItem>
                <NavItem>
                    <NavLink href="/">
                       <BsFillPersonFill title='Login'/>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/">
                        <BsSearch title='Search'/>
                    </NavLink>
                </NavItem>
          </Nav>
        </Collapse>        
      </Navbar>
    </div>
  )
}

export default NavBar
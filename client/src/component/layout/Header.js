import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/userAction'
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap'

function Header({userSignin: {user} , logout}) {

    const [menu, setMenu] = useState(false);
  /*  const openMenu = () => {
        document.querySelector(".nav-links").classList.add("open")


    };
    const closeMenu = () => {
        document.querySelector(".nav-links").classList.remove("open")

    };*/

    const onLogout = () => {
        logout();
    }

    const openMenu = () => {
        setMenu(!menu)

    }

    return (
    <div>
        <header className="header d-flex">
            <div className="d-flex">
            {/*<div className="burger" onClick={openMenu}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
    </div>*/}
                <Link className="headername" to="/">Shoe Store</Link>
            </div>

            <div>
            <div className="headerlinks">
                <div className='show'>
                <Dropdown isOpen={menu} onClick={() => openMenu()}>
                <DropdownToggle  className="btn d-flex headerusername">

                   <span>Hello {user && user.name}</span>
                   <i className="fa fa-angle-down headerusericon"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown text-light">

                    <Link to="/signin" onClick={onLogout} className="logout">
                   { /*<i className=   "fa fa-sign-out font-size-16 align-middle mr-1 text-dark"></i>*/}
                    <span>Logout</span>
                </Link>
                </DropdownMenu>
            </Dropdown>
                </div>
            <div>
            <Link to="/cart" className="links">
                <i class="fa fa-shopping-cart cart"></i>

            </Link>
            </div>
        </div>
            </div>
        </header>
       {/* <nav className="nav-links">
            <h2>Shopping Caterogy</h2>
            <button className={style.close} onClick={closeMenu}>X</button>
            <ul>
                <li><a href="index.html">Shoes</a></li>
                <li><a href="index.html">Shits</a></li>
                <li><a href="index.html">Trousers</a></li>
                <li><a href="index.html">Watchs</a></li>
            </ul>
    </nav>*/}
    </div>
    )
}

const mapStateToProps = state => ({
    userSignin: state.userSignin
})

export default connect(mapStateToProps, {logout}) (Header);

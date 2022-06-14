import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
   
    <header id="home">
        <div className="container">
            {/* <!-- Navigations --> */}
            <nav>
                {/* <!-- Logo --> */}
                <div className="logo_area">
                    <Link to = "/">
                    <img src="img/logo.png" alt="Logo"/>
                    </Link>
                </div>
                {/* <!-- Nav --> */}
                <div className="nav_links">
                    <ul id="doob_nav">
                        <li className="active"><a href="#home">home.</a></li>
                        <li><a href="#about_us">about us.</a></li>
                        <li><a href="#portfolio">portfolio.</a></li>
                        <li><a href="#blog_sec">blog.</a></li>
                        <li><a href="#contact_us">contact us.</a></li>
                    </ul>
                </div>
                {/* <!-- Language Button --> */}
                <div className="language_bar_main">
                    <div className="navbar language_bar">
                        <a className="doo_btn dropdown-toggle" href="#" role="button" id="doobDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        EN
                        </a>
                        <div className="dropdown-menu language_option" aria-labelledby="doobDropDown">
                          <a className="dropdown-item" href="#">English</a>
                          <a className="dropdown-item" href="#">Bangla</a>
                          <a className="dropdown-item" href="#">Urdu</a>
                          <a className="dropdown-item" href="#">Soumi</a>
                        </div>
                    </div>
                </div>
                {/* <!-- Contact button --> */}
                <div className="contact_btn">
                    <a href="">Contact us</a>
                    <i className="icofont-long-arrow-right"></i>
                </div>
            </nav>
        </div>
    </header>
   
   
   
   
     );
}

export default Navbar;

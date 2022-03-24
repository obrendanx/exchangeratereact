import React from "react";
import {Link} from "react-router-dom";

function Nav() {
  return (
    <div className="main_nav">
            <nav className="navbar">
                <ul className="navbar_ul">
                    <Link to="/">
                        <li className="navbar_li">Home</li>
                    </Link>
                    <Link to="/data">
                        <li className="navbar_li">Data</li>
                    </Link>
                </ul>
            </nav>
      </div>
  )
}

export default Nav
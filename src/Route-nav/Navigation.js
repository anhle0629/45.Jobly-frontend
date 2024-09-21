import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import userContext from "../Authorization/UserContext"
import './Nav.css'



/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation ({logout}){
    const {currentUser} = useContext(userContext)
    console.debug("Navigation", "currentUser=", currentUser)

    function loggedInNav(){
        return(
            <ul className="navbar-nav ml-auto">
                <li  className="nav-item mr-4">
                    <NavLink lassName="nav-link" to="/comapnies">
                        companies
                    </NavLink>
                </li>

                <li className="nav-item mr-4">
                    <NavLink  className="nav-link" to="/jobs">
                        Jobs
                    </NavLink>
                </li>

                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/profile">
                        Profile
                    </NavLink>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={logout}>
                        Log out {currentUser.first_name || currentUser.username}
                    </Link>
                </li>
            </ul>

        )
    }

    function LoggedOutNav(){
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>

                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        )
    }

    return(
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">
                Jobly
            </Link>
            {currentUser ? loggedInNav() : LoggedOutNav ()}
        </nav>
    )

}

export default Navigation


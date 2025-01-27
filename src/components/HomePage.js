import React, {useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../Authorization/UserContext"
import "./Homepage.css"
// welcome the user
// props: first name of th use
// state: none 

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */
function Homepage(){
    const {currentUser} = useContext(UserContext)
    console.debug(
        "Homepage", "currentUser=", currentUser
    )

    return(
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Jobly</h1>
                <p className="lead">All the jobs in one, convient place.</p>
                {currentUser
                    ? <h2>
                        Welcome Back, {currentUser.firstName || currentUser.username}!
                    </h2>
                    :(
                        <p>
                            <Link className="btn btn-primary font-weight-bold mr-3"
                            to="/login">
                                Login in
                            </Link>
                            <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                            Sign up
                          </Link>
                        </p>
                    )}
            </div>
        </div>
    )
}

export default Homepage
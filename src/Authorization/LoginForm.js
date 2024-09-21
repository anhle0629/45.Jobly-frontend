import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import Alert from "../Common/Alert"

//login form
//show form and manage update to state on changes.
//on submission 
// call login function prop
// redirect to /companies route
// * Routes -> LoginForm -> Alert
// * Routed as /login
// */


function LoginForm({login}){
    const history = useHistory()
    const [formData, setFormData] = useState({
        username:"",
        password:""
    })

    const [formError, setFormError] = useState([])

    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formError", formError,

    )

    //handle form submit:
    // call login dunc prop and, if successful, redirect to /companies

    async function handleSubmit(evt) {
        evt.preventDefault()
        let result = await login(formData)
        if(result.success){
            history.push("/companies")
        }
        else{
            setFormError(result.error)
        }
    }

    //update form data field 
    function handleChange(evt){
        const{name, value} = evt.target
        setFormData(l => ({...l, [name]:value}))
    }

    return(
        <div className="LoginForm">
            <div lassName="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Log In</h3>

                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>username</label>
                                <input
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    autoComplete="username"
                                    required
                                />                                
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            {formError.length
                                ?<Alert type="danger" message={formError} />
                                :null}
                            
                            <button
                                 className="btn btn-primary float-right"
                                 onSubmit={handleSubmit}
                            >Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm; 
import React, {useState, useContext} from "react"
import Alert from "../Common/Alert"
import JoblyApi from "../api"
import UserContext from "../Authorization/UserContext"

// eslint-disable-next-line
import useTimeMessage from "../Hook/UsedTimeMessage"

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */


function ProfileFrom(){
    const {currentUser, setCurrentUser} = useState(UserContext)
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username:currentUser.username,
        password:"",
    })


    const [formErrors, setFormErrors] = useState([])

    // switch to use our fancy limited-time-display message hook
    // const [saveConfirm, setSaveConfirmed] = useState(false)
    const [saveConfirmed, setSaveConfirmed] = useTimeMessage()


    async function handleSubmit(evt){
        evt.preventDefault()

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        }

        let username = formData.username
        let updatedUser; 

        try{
            updatedUser = await JoblyApi.saveProfile(username, profileData)
        }
        catch (error){
            debugger;
            setFormErrors(error)
            return; 
        }

        setFormData(f=>({...f, password:""}))
        setFormData([])
        setSaveConfirmed(true)

        // trigger reloading of user information throughout the site
        setCurrentUser(updatedUser)
    }

    function handleChange(evt){
        const {name, value} = evt.target;
        setFormData(f => ({
            ...f,
            [name]:value
        }))

        setFormErrors([])
    }

    return(
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <p className="form-control-plaintext">{formData.username}</p>
                        </div>

                        <div className="form-group">
                            <label>First Name</label>
                            <input 
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input 
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                name="Email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm password to make changes:</label>
                            <input 
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        {formErrors.length
                            ? <Alert type="danger" message={formErrors} />
                            : null}

                        {saveConfirmed
                            ?
                            <Alert type="success" message={["Updated successfully."]} />
                            : null}

                        <button 
                            className="btn btn-primary btn-block mt-4"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default ProfileFrom


import './App.css';
import React, {useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Route-nav/Navigation"
import Routes from "./Route-nav/Routes"
import LoadingSpinner from './Common/LoadingSpinner';
import JoblyApi from "./api"
import UserContext from './Authorization/UserContext';
import jwt from "jsonwebtoken"
import useLocalStorage from './Hook/UseLocalStorage';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false)
  const [applicationIds, setApplicationIds] = useState(new Set([]))
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID)

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token
  )

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo(){
    
    async function getUserInfo() {
      if(token){
        try{
          let {username} = jwt.decode(token)
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token
          let currentUser = await JoblyApi.getUserInfo(username)
          setCurrentUser(currentUser)
          setApplicationIds(new Set([currentUser.application]))
        }
        catch(error){
          console.error("App loadUserInfo: problem loading", error)
          setCurrentUser(null)
        }
      }
      setInfoLoaded(true)
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false)
    getUserInfo()
  }, [token])

  /** handle site-wide logout */
  function logout(){
    setCurrentUser(null)
    setToken(null)
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */

  async function signup(signupData) {
    try{
      let token = await JoblyApi.signup(signupData)
      setToken(token)
      return{success: true}
    }
    catch(errors){
      console.error("sign up failed", errors)
      return {success: false, errors}
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */

  async function login(loginData) {
    try{
      let token = await JoblyApi.login(loginData)
      setToken(Token)
      return {success: true}
    }
    catch(errors){
      console.error("login failed", errors)
      return {success: false, errors}
    }
  }

  /**checkes if a job has been applied for. */
  function hasAppliedToJob(id){
    return applicationIds.has(id)
  }

  /** Apply to a job: make API call and update set of application IDs */
  function applyToJob(id){
    if(hasAppliedToJob(id)) return
      JoblyApi.applyToJob(currentUser.username, id);
      setApplicationIds(new Set([...applicationIds, id]))
  }

  if(infoLoaded) return <LoadingSpinner /> 

  return(
    <BrowserRouter>
      <UserContext.Provider
        value={{currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}   
      >
        <div className='App'>
          <Navigation logout={logout}/>
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )

}

export default App;

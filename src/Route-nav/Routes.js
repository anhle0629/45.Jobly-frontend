import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from "../components/HomePage"
import CompanyList from "../Companies/CompanyList"
import Joblist from "../Job/JobList"
import LoginForm from "../Authorization/LoginForm"
import ProfileForm from "../Profile/ProfileForm"
import PrivateRoute from "./PrivateRoute"

function Routes({login, signup}){
    console.log(
        "Routes",
        `login = ${typeof login}`,
        `register=${typeof register}`,
    )

    return(
        <div className="pt-5">
        <Switch>

        <Route exact path="/">
            <HomePage />
        </Route>

        <Route exact path="/login">
            <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
            <SignupForm signup={signup} />
        </Route>

        <PrivateRoute exact path="/companies">
            <CompanyList />
        </PrivateRoute>

        <PrivateRoute exact path="/jobs">
            <Joblist />
        </PrivateRoute>

        <PrivateRoute exact path="/companies/:handle">
            <CompanyDetail />
        </PrivateRoute>

        <PrivateRoute path="/profile">
            <ProfileForm />
        </PrivateRoute>

        <Redirect to="/" />
        </Switch>
    </div>
    )


}

export default Routes
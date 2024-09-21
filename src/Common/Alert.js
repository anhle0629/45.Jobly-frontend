import React from "react";

/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

function Alert({type = "danger", message= []}) {
    console.debug("Alert", "type=", type, "message=", message)

    return(
        <div className={`alert alert-${type}`} role="alert">
            {message.map(error => (
                <p className="mb-0 small" key={error}>
                    {error}
                </p>
            ))}
        </div>
    )
}

export default Alert
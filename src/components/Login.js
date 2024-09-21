import React from 'react'
import { useState } from 'react'

//login in form
//props: username, passowrd
//state: authenication and login in 

function Login  ({username, password}) {
    const [login, setLogin] = useState("")

    const handleChange = evt => {
        setTask(evt.target.value);
      };

    const gatherInput = (evt)=>{
        evt.preventDefault()
        setLogin("")
    }
    return(
        <form className='Login' onSubmit={gatherInput}>
            <label htmlFor='username'>username:</label>
            <input
                key={username.id}
                name='username'
                type='text'
                onChange={handleChange}
                value={username}
            ></input>
            <label htmlFor='password'>passowrd:</label>
            <input
                key={password}
                name='password'
                type='text'
                onChange={handleChange}
                value={password}
            ></input>
        </form>
    )
}

export default Login

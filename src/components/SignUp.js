import React from 'react'
import { useState } from 'react'
//props: username, email, name first and last, password
//state: to submit and generate a secume password 




function SignUp()  {
    const handlesubmit = ()=>{
        const [formData, setFormData] = useState("")
    }


    <form className='SignUp'>
        <label htmlFor='username'>username:</label>
        <input
            // key={}
            name='username'
            type='text'
            value={username}
        ></input>
        <label htmlFor='firstName'>First Name:</label>
        <input
            // key={}
            name='firstName'
            type='text'
            value={firstName}
        ></input>
        <label htmlFor='lastName'>Last Name:</label>
        <input
            // key={}
            name='lastName'
            type='text'
            value={lastName}
        ></input>
        <label htmlFor='username'>passowrd:</label>
        <input
            // key={}
            name='password'
            type='text'
            value={password}
        ></input>
        <label htmlFor='email'>email:</label>
        <input
            // key={}
            name='email'
            type='text'
            value={email}
        ></input>
    </form>
}

export default SignUp

import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

const Error=({errMsg})=>{
    return(
        <div>
            <p>{errMsg}</p>
        </div>
    )
}
const Signup=(props)=>{
    const [newUser,setNewUser]=useState({
        firstName:'',
        lastName:'',
        phNo:'',
        dob:'',
        uName:'',
        pass:'',
        email:''
    })
    const [errMsg,setErrMsg]=useState('')

    const handleChange=(e)=>{
        const value=e.target.value;
        setNewUser({...newUser,[e.target.name]:value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        // if()
        axios.post('http://localhost:3001/signup',newUser).then(response=>{
            console.log(response)
            const resp=response.data.mssg
            setNewUser({firstName:'',
            lastName:'',
            phNo:'',
            dob:'',
            uName:'',
            pass:'',
            email:''
        })
        if(resp=='User already exists')
        {
            setErrMsg(resp)
        }
        if(resp==='user added!')
        {
            props.history.push('/login')
        }
        })
      
    
    }
    
    return (
        
        <div>
            <form className='LSforms' onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name:</label> 
            <input type="text" value={newUser['firstName']} required onChange={handleChange} name="firstName"/>
            <label htmlFor="lastName">Last Name:</label> 
            <input type="text" value={newUser['lastName']} required onChange={handleChange} name="lastName"/>
            <label htmlFor="phNo">Phone Number:</label> 
            <input type="text" value={newUser['phNo']} required onChange={handleChange} name="phNo"/>
            <label htmlFor="uName">Username:</label> 
            <input type="text" value={newUser['uName']} required onChange={handleChange} name="uName"/>
            <label htmlFor="dob">Year of Birth:</label>
            <input type="text" value={newUser['dob']} required onChange={handleChange} name="dob"/>
            <label htmlFor="pass">Password:</label>
            <input type ="password" value={newUser['pass']} required onChange={handleChange} name="pass"/>
            <label htmlFor="email">Email:</label>
            <input type="email" value={newUser['email']} required onChange={handleChange} name="email"></input>
            <button type ="submit">SignUp</button>
            <Error errMsg={errMsg}/>
            </form>
        </div>
    )

}

export default withRouter(Signup)
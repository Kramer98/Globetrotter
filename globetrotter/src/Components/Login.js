import React,{useState,useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import Home from './Home'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Auth=(props)=>{
const [authObj,setAuth]=useState({
        uname:'',
        pass:''
    })
const [errMssg,setErrMssg]=useState('')
const [usersArr,setUsers]=useState([])
// window.localStorage.setItem('uName','Anon')
// useEffect(()=>{
// axios.get('http://localhost:3001/users').then(response=>{
//     console.log('promise fullfilled', response)
//     setUsers(response.data)
// })
// },[])


const setUname=(event)=>{

    setAuth({...authObj,uname:event.target.value})
    
}
const setPass=(event)=>{
    setAuth({...authObj,pass:event.target.value})

}
const checkUser=(user)=>{
    console.log(user)
    return (user.uname===authObj['uname'] && user.pass===authObj['pass'])
}
const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post('http://localhost:3001/checkuser',authObj).then(res=>{
        if(res.data.mssg==='user exists')
        {
        // if(res.data=)
        window.localStorage.setItem('uName',authObj.uname)
        setAuth({
            uname:'',
            pass:''
        })
        props.setLogged(authObj.uname)
        props.history.push('/home')
    }
        else
            setErrMssg(res.data.mssg)

    })

    
}
return(

    <Container>
    <Row>
      <Col></Col>
      <Col xs={6}>  
        <Form onSubmit={handleSubmit}>
  <Form.Group controlId="formBasicUser">
    <Form.Label>UserName</Form.Label>
    <Form.Control type="text" value={authObj['uname']} onChange={setUname} placeholder="Enter Username" />
  </Form.Group>
<Form.Text className="text-muted"> {errMssg}</Form.Text>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control value={authObj['pass']} onChange={setPass} type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form></Col>
      <Col></Col>
    </Row>
    </Container>
    
)
}



export default withRouter(Auth);

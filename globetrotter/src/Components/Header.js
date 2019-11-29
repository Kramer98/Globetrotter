import React,{useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Header=(props)=>{
 
  const handleLogout=(e)=>{
    window.localStorage.removeItem('uName')
    props.setToLogged('')
  }

  const state=props.ifLogged?(<Nav.Link href="/" onSelect={handleLogout}>Logout</Nav.Link>):(<Nav.Link href="/login">Login</Nav.Link>)
return(
<Navbar bg="primary" variant="dark">
<Navbar.Brand href="/mainpage">Globetrotter</Navbar.Brand>
<Nav className="mr-auto">
  <Nav.Link href="/home">Home</Nav.Link>
  {state}
  {/* <Nav.Link href="/login">Login</Nav.Link>
  <Nav.Link href="/login">Login</Nav.Link> */}
{/* <Nav.Link href="#pricing"> {props.ifLogged}</Nav.Link>
 */}    <Navbar.Text ><a href="#user">
      {props.ifLogged}</a>
    </Navbar.Text>
</Nav>
</Navbar>
)
}
export default Header
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Auth from './Components/Login'
import Home from './Components/Home'
import AddPost from './Components/AddPost';
import Signup from './Components/Signup';
import MainPage from './Components/MainPage'
import axios from 'axios'
import React,{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'




const App=()=>{
  const [ifLogged,setLogged]=useState(window.localStorage.getItem('uName'))
  console.log(ifLogged)
  const setToLogged=(value)=>{
    setLogged(value)
  }
  const[posts,setPosts]=useState([]) 
  const [isLoaded,setLoad]=useState(false)
  const[donePost,setDonePost]=useState(false)

  
  const setPostStatus=(value)=>{
    setDonePost(value)
  }
    
  const setToLoad=(value)=>{
    setLoad(value)
  }

  const setToPosts=(value)=>{
    setPosts(value)
  }
  return (

      <Router>
        {/* <Header/> */}
        <div>
    {/* <div><Signup/></div> */}
    <Route path='/' render={(props)=><Header {...props} setLogged={setToLogged} ifLogged={ifLogged}/>}/>
    <Route path='/register' render={()=><Signup/>}/>
    <Route path ='/login' render={(props)=><Auth setLogged={setToLogged} ifLogged={ifLogged}/>}/>
    <Route path ='/home' render={(props) => <Home {...props} setPostStatus={setPostStatus} setToLoad={setToLoad} setToPosts={setToPosts} posts={posts} isLoaded={isLoaded} />}/>
    <Route exact path='/' render={()=><MainPage/>}/>
    <Route path='/addpost' render={(props)=><AddPost {...props} setToPosts={setToPosts} setPostStatus={setPostStatus} posts={posts} setToLoad={setToLoad} isLoaded={isLoaded}/>}/>
    {/* <div><Home/></div> */}
    
    </div>
    </Router>
  );
}

export default App

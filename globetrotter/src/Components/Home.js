import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Post from './Post'
import {BrowserRouter as Router,withRouter} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

const Home=(props)=>
{
    const {posts,setToLoad,setToPosts,isLoaded}=props
    const currUser=window.localStorage.getItem('uName')
    props.setPostStatus(false)
    useEffect(()=>{
        const getPosts =()=>{
        console.log('in effect')
        axios.get('http://localhost:3001/posts').then(res=>{
            // let post_list=response.data
            console.log(' in here')
            setToPosts([...res.data])
            setToLoad(true)
        }).catch(err=>console.log(err))
    }
        getPosts()
        },[])
    const goToAddPost=(value)=>{
        props.history.push(value,{})
    }

    return(
         
        <Container>
        <Row>
          <Col><Button variant="primary" onClick={()=>{goToAddPost('/addpost')}} >Add Post</Button></Col>
          <Col xs={6}>  
        {/* <h1>Welcome {userID}</h1> */}

            {isLoaded?posts.map(post=>(
                <Post postObj={post} key={post._id}/>
            )):"Wall is loading"}
            </Col>
            

        <Col></Col>
                </Row>
                </Container>
    )
} 
export default withRouter(Home);
import React,{useState} from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
withRouter
  } from "react-router-dom"
import Button from 'react-bootstrap/Button'

const Image = ({ data }) => <img alt="No Img" width="400" height="400" src={`${data}`} />

const Tag=({postObj,handler,setToTag,tag})=>{
    const [tagState,setTagState]=useState('Click to add Tag!')
   const handleTagChange=(e)=>{
        setToTag(e.target.value)
    }
    const handleAddTag=()=>{
        handler(tag)
        setToTag('')
        setTagState('Click to add another!')
    } 
    return(
    <>
    <label htmlFor="tags">#Tags:</label>
    <input name="tags" value={tag} type="text" onChange={handleTagChange}></input>
    <button type="button" onClick={handleAddTag} >{tagState}</button>
    </>
    )
}

const AddPost=(props)=>{
    const[postObj,setPost]=useState({
        img:'',
        tags:[],
        location:''
    })
    const[tag,setTag]=useState('')
    
    const setToTag=(value)=>{
        setTag(value)
    }
    const setToValue=(value)=>{
        setPost({...postObj,tags:postObj.tags.concat([value])})
    }
    const handlePhotoChange=(e)=>{
        e.preventDefault();
        let file=e.target.files[0]
        let reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            // console.log(reader.result)
            setPost({...postObj,img:reader.result})
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(props.posts)
        console.log('clicked')
        axios.post('http://localhost:3001/addpost',postObj).catch(err=>{console.log(err)
    }).then(response=>{
            const resp=response.data.mssg
            // props.setToLoad(false)
            console.log(resp)
            setPost({
                img:'',
                tags:[],
                location:''
            })
            setTag('')
            props.setPostStatus(true)
            
        }).catch(err=>console.log(err))
        props.setToPosts(props.posts.concat(postObj))
        props.history.push('/home',{added:true})
        }
    const handleLocChange=(e)=>{
        setPost({...postObj,location:e.target.value})
    }

        return(
        <Router>
        <div>
            <form className="addPost" onSubmit={handleSubmit}>
            <label htmlFor="imgUp">Upload an Image:</label>
            <input name="imgUp" type="file" accept="image/*" onChange={handlePhotoChange}></input>
            <label htmlFor="location">Location:</label>
            <input name="location" value={postObj.location} type="text" onChange={handleLocChange}></input>
            <Tag postObj={postObj} tag={tag} setToTag={setToTag} handler={setToValue}/>
            <Button variant="dark" type="submit">Add Post</Button>
                {/* <Route path="/home" render={() => <Home />} /> */}
            </form>
            <Image data={postObj.img}/>
        </div>
        </Router>
    )
  
    }

export default withRouter(AddPost)
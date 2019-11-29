import React from 'react'
// import axios from 'axios'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
const DispTag=({tag})=>{
    return(
    <span>#{tag} </span>
    )
}

const Post=({postObj})=>{
    console.log(postObj)
return(
    // <Container> 
        
    // <Image width="350" height="350" alt="" src={postObj.img} rounded/>

    // </Container>
    <Card style={{ width: '30rem' }}>
  <Card.Img variant="top" src={postObj.img} />
  <Card.Body>
    <Card.Title></Card.Title>
    <Card.Text>
    {postObj['tags'].map(tag=><DispTag key={tag} tag={tag}/>)}
    </Card.Text>
    {/* <Button variant="primary">Go somewhere</Button> */}
  </Card.Body>
</Card>
) 
}


export default Post
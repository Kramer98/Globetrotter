import React from 'react'
import {withRouter} from 'react-router-dom'
import Container from 'react-bootstrap/Container'

const MainPage=(props)=>{
    return(
        <Container>
            <h1>Globetrotter</h1>
        </Container>
        
    )
}

export default withRouter(MainPage)
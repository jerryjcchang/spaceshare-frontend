import React from 'react'
import { Header, Grid, Container, Card } from 'semantic-ui-react'
import SpaceCard from '../components/SpaceCard'
import SearchBar from '../components/SearchBar'

class Spaces extends React.Component{

    render(){
        return(
            <body class="home">
                
                <Container>
                <Header as='h1' style={{color: 'white'}} textAlign='center'>
                <Header.Content>Spaces Index</Header.Content>
                </Header>
                <SearchBar />
                    {/* <div className="ui four column grid"> */}
                    <Card.Group className="spaces-list" itemsPerRow="4">
                        {/* <div className="row"> */}
                        {Array(20).join().split(',').map(function(a){return this.i++},{i:1})
                         .map(space => <SpaceCard />)}
                        {/* </div> */}
                    {/* </div> */}
                    </Card.Group>
                </Container>
                
            </body>
        )
    }
}

export default Spaces
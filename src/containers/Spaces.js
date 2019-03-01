import React from 'react'
import { Container, Card } from 'semantic-ui-react'
import SpaceCard from '../components/SpaceCard'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Spaces extends React.Component{

    render(){
        return(
            <body className="home">
                
                <Container>
                {/* <Header as='h1' style={{color: 'white'}} textAlign='center'>
                <Header.Content>Spaces Index</Header.Content>
                </Header> */}
                <SearchBar />
                    {/* <div className="ui four column grid"> */}
                    <Card.Group stackable doubling className="spaces-list" itemsPerRow="4">
                        {/* <div className="row"> */}
                        {this.props.allSpaces
                         .map(space => <SpaceCard key={space.id} space={space} />)}
                        {/* </div> */}
                    {/* </div> */}
                    </Card.Group>
                </Container>
                
            </body>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        allSpaces: state.allSpaces
    }
}



export default withRouter(connect(mapStateToProps)(Spaces))
import React from 'react'
import { Container, Card, Image, Loader } from 'semantic-ui-react'
import SpaceCard from '../components/SpaceCard'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import { statesHash } from '../StatesData'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchingAllSpaces } from '../redux/actionCreator'


class Spaces extends React.Component{

    state = {
        index: 20
    }

    filteredSpaces = () => {
        let filteredSpaces
        if(this.props.allSpaces){
        let {allSpaces, searchTerm, selectedFeatures} = this.props
        filteredSpaces = allSpaces.filter(space => space.name.toLowerCase().includes(searchTerm.toLowerCase()) || space.city.toLowerCase().includes(searchTerm.toLowerCase()) || space.state.toLowerCase().includes(searchTerm.toLowerCase()) )
        if (selectedFeatures.length > 0){
            let spaces
        selectedFeatures.forEach(
            feature => {
                // debugger
                    filteredSpaces = filteredSpaces.filter((space) => {
                        return space.features_list.includes(feature)
                    })
                }
            )
            return filteredSpaces
        }
        return filteredSpaces
        }
    }

    handleMoreSpaces = () => {
        this.setState({
            index: this.state.index + 20
        })
    }
        

    renderSpaces = () => {
        let {allSpaces, searchTerm, selectedFeatures, fetchMoreSpaces} = this.props
        if(this.props.allSpaces && !searchTerm && selectedFeatures.length <= 0){
            console.log('inside block 1')
            return(
            <InfiniteScroll
                dataLength={this.state.index}
                next={this.handleMoreSpaces}
                hasMore={this.state.index < allSpaces.length}
                loader={<Image centered size="medium" src="https://media.giphy.com/media/MtWKB3pR7vQeQ/giphy.gif"/>}
                // endMessage={
                //     <p style={{textAlign: 'center'}}>
                //       <b>Yay! You have seen it all</b>
                //     </p>
                //   }
                >
            <Card.Group id="card-group" stackable doubling className="spaces-list" itemsPerRow="4">
                {this.props.allSpaces.slice(0,this.state.index).map(space => <SpaceCard key={space.id} space={space} />)}
            </Card.Group>
            </InfiniteScroll>
            )
        } else if(searchTerm || selectedFeatures){
            console.log('inside block 2')
            return(
            <Card.Group id="card-group" stackable doubling className="spaces-list" itemsPerRow="4">
                {this.filteredSpaces().map(space => <SpaceCard key={space.id} space={space} />)}
            </Card.Group>
            )
        }
    }

    render(){
        return(
            <body className="home">
                
                <Container>
                {/* <Header as='h1' style={{color: 'white'}} textAlign='center'>
                <Header.Content>Spaces Index</Header.Content>
                </Header> */}
                <SearchBar />
                    {this.renderSpaces()}
                </Container>
                
            </body>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        allSpaces: state.allSpaces,
        searchTerm: state.searchBar.searchTerm,
        selectedFeatures: state.searchBar.selectedFeatures
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMoreSpaces: (index) => {dispatch(fetchingAllSpaces(index))},
    }
  }



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Spaces))
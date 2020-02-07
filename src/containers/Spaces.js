import React from 'react'
import { Container, Card, Image } from 'semantic-ui-react'
import SpaceCard from '../components/SpaceCard'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { increaseIndex } from '../redux/actionCreator'


class Spaces extends React.Component{

    state = {
      index: 20
    }

    filterBySearchTerm = () => {
      let {allSpaces, searchTerm} = this.props
      return allSpaces.filter(space => space.name.toLowerCase().includes(searchTerm.toLowerCase()) || space.street_address.toLowerCase().includes(searchTerm.toLowerCase()) || space.state.toLowerCase().includes(searchTerm.toLowerCase()) )
    }

    filteredSpaces = () => {
      let allSpaces = this.filterBySearchTerm()
      return allSpaces.filter(
        this.filterSpace
      )
    }

    filterSpace = (space) => {
      let {selectedFeatures} = this.props
      for(let i=0; i < selectedFeatures.length; i++){
        if(!space.features_list.includes(selectedFeatures[i])){
          return false
        }
      }
      return true
    }

    handleMoreSpaces = () => {
      console.log('getting 20 more spaces')
      this.props.increaseIndex()
    }

    handleFilters = () => {
      let { allSpaces, searchTerm, selectedFeatures, index } = this.props
      if(searchTerm || selectedFeatures){
        return this.filteredSpaces().slice(0,index).map(space => <SpaceCard key={space.id} space={space} />
        )} else {
        return allSpaces.slice(0,index).map(space => <SpaceCard key={space.id} space={space} />)
      }
    }


    renderSpaces = () => {
        let {allSpaces, index} = this.props
        return(this.props.allSpaces ?
            <InfiniteScroll
                dataLength={index}
                next={this.handleMoreSpaces}
                hasMore={index < allSpaces.length}
                loader={<Image centered size="medium" src="https://media.giphy.com/media/MtWKB3pR7vQeQ/giphy.gif"/>}
                endMessage={
                    <p id="footer" style={{textAlign: 'center'}}>
                      <b>Spaceshare © 2019 All Rights Reserved. | Privacy Policy</b>
                    </p>
                  }
                hasChildren
                >

            <Card.Group id="card-group" stackable doubling className="spaces-list" itemsPerRow="4">
                {this.handleFilters()}
            </Card.Group>
            </InfiniteScroll>
            :
            null
          )
    }

    render(){
        return(
            <body className="home">
                <SearchBar />
                <Container>
                {/* <Header as='h1' style={{color: 'white'}} textAlign='center'>
                <Header.Content>Spaces Index</Header.Content>
                </Header> */}

                    {this.props.loading ? <div id="load-wrapper"><Image id="loader" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif"/></div> : this.renderSpaces()}
                </Container>

            </body>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.loading,
        allSpaces: state.allSpaces,
        searchTerm: state.searchBar.searchTerm,
        selectedFeatures: state.searchBar.selectedFeatures,
        index: state.index
    }
}

const mapDispatchToProps = dispatch => {
    return {
        increaseIndex: () => {dispatch(increaseIndex())},
    }
  }



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Spaces))

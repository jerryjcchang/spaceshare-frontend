import React from 'react'
import { connect } from 'react-redux'
import { Input, Menu, Dropdown, Container, Icon} from 'semantic-ui-react'
import { setSearchTerm, setFeatures } from '../redux/actionCreator'

class SearchBar extends React.Component{

    moment

    state = {
        searchTerm:"",
    }

    handleSearch = (e) => {
        // change state to loading: true
        // setTimeout 300 ms set stae to loading:false
        if(e.key==="Enter"){
            this.props.setSearchTerm(this.state.searchTerm)
        }
    }

    handleClearSearch = () => {
        this.setState({searchTerm: ""}, () => {this.props.setSearchTerm(this.state.searchTerm)})
        console.log("clearing search")
    }

    handleSearchTerm = (e, {value}) => {
        this.setState({searchTerm: value})
    }

    handleDropdown = (e, {value}) => {
        this.props.setFeatures(value)
    }

    options = [
        {key: 'single', text: 'single desk', value: 'single desk'},
        {key: 'group', text: 'group desks', value: 'group desk'},
        {key: 'conference', text: 'conference room', value: 'conference room'},
        {key: 'office', text: 'office', value:'office'},
        {key: 'wifi', text: 'wifi', value: 'wifi'},
        {key: 'monitors', text: 'monitors', value: 'monitors'},
        {key: 'coffee machine', text: 'coffee machine', value: 'coffee machine'},
        {key: 'assistant', text: 'assistant', value: 'personal assistant'},
        {key: 'formal rental', text: 'formal rental', value: 'formal rental'}
    ]

    render(){
        return(
            <Container id="search-bar">
            <Menu fixed="top" className="spaces-menu">
                <Menu.Item className="search-bar">
                    <Input
                        name="searchTerm"
                        value={this.state.searchTerm}
                        className='icon'
                        icon={this.props.searchTerm ? <Icon name='delete' link onClick={this.handleClearSearch}/> : 'search' }
                        placeholder='Where to Work'
                        onChange={this.handleSearchTerm}
                        onKeyPress={this.handleSearch}
                        />
                </Menu.Item >
                <Menu.Item>
                <Dropdown clearable onChange={this.handleDropdown} id="features-dropdown" placeholder ='Select Features' fluid multiple selection options={this.options} value={this.props.selectedFeatures} />
                </Menu.Item>
            </Menu>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchTerm: state.searchBar.searchTerm,
        selectedFeatures: state.searchBar.selectedFeatures
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchTerm: (input) => {dispatch(setSearchTerm(input))},
        setFeatures: (input) => {dispatch(setFeatures(input))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

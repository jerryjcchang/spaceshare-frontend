import React from 'react'
import { connect } from 'react-redux'
import { Input, Menu, Dropdown, Container, Icon} from 'semantic-ui-react'
import CalendarInput from './CalendarInput'
import { setSearchTerm, setFeatures } from '../redux/actionCreator'

class SearchBar extends React.Component{

    moment

    state = {
        searchTerm:"",
        // startDate: "",
        // endDate: "",
        options: {
            single: false,
            group: false,
        }
    }

    // handleChange = (event, {name, value}) => {
    //     if (this.state.hasOwnProperty(name)) {
    //       this.setState({ [name]: value });
    //     }
    //   }

    handleSearch = (e, {value}) => {
        this.props.setSearchTerm(value)
    }

    handleDropdown = (e, {value}) => {
        this.props.setFeatures(value)
    }

    options = [
        {key: 'single', text: 'single desk', value: 'single desk'},
        {key: 'group', text: 'group desks', value: 'group desk'},
        {key: 'conference', text: 'conference room', value: 'conference room'},
        {key: 'wifi', text: 'wifi', value: 'wifi'},
        {key: 'monitors', text: 'monitors', value: 'monitors'},
        {key: 'coffee machine', text: 'coffee machine', value: 'coffee machine'}
    ]

    // formatDate = (date) => {
    //     var d = new Date(date),
    //     month = '' + (d.getMonth() + 1),
    //     day = '' + d.getDate(),
    //     year = d.getFullYear();

    //     if (month.length < 2) month = '0' + month;
    //     if (day.length < 2) day = '0' + day;

    //     return [year, month, day].join('-');
    // }

    render(){
        return(
            <Container>
            <Menu stackable className="spaces-menu">
                <Menu.Item className="search-bar">
                    <Input 
                        name="searchTerm"
                        value={this.props.searchTerm}
                        className='icon' 
                        icon='search' 
                        placeholder='Where to Work'
                        onChange={this.handleSearch}
                        clearable
                        />
                </Menu.Item >
                {/* <Menu.Item borderless position="right">Start</Menu.Item> */}
                <CalendarInput />
            </Menu>
            <Dropdown clearable onChange={this.handleDropdown} className="features-dropdown" placeholder ='Select Features' fluid multiple selection options={this.options} />
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
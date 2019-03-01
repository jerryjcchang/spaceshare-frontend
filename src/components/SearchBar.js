import React from 'react'
import { Input, Menu, Dropdown, Container, Icon} from 'semantic-ui-react'
import DropdownDate from 'react-dropdown-date'
import { DateInput, TimeInput, DateTimeInput, DatesRangeInput} from 'semantic-ui-calendar-react';
import moment, { isMoment } from 'moment';
import CalendarInput from './CalendarInput'

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

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }

    options = [
        {key: 'single', text: 'single desk', value: 'single desk'},
        {key: 'group', text: 'group desks', value: 'group desks'},
        {key: 'conference', text: 'conference Room', value: 'conference room'},
        {key: 'coffee machine', text: 'coffee Machine', value: 'coffee machine'},
        {key: 'monitors', text: 'monitors', value: 'monitors'},
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
                        value={this.state.searchTerm}
                        className='icon' 
                        icon='search' 
                        placeholder='Where to Work'
                        onChange={this.handleChange}/>
                </Menu.Item >
                {/* <Menu.Item borderless position="right">Start</Menu.Item> */}
                <CalendarInput />
            </Menu>
            <Dropdown className="features-dropdown" placeholder ='Select Features' fluid multiple selection options={this.options} />
            </Container>
        )
    }
}

export default SearchBar
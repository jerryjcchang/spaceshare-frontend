import React from 'react'
import { Input, Menu, Dropdown, Container,} from 'semantic-ui-react'
import DropdownDate from 'react-dropdown-date'
import { DateInput, TimeInput, DateTimeInput, DatesRangeInput} from 'semantic-ui-calendar-react';
import moment from 'moment';

class SearchBar extends React.Component{

    moment

    state = {
        searchTerm:"",
        startDate: "",
        endDate: "",
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

    formatDate = (date) => {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    render(){
        return(
            <Container>
            <Menu raised className="spaces-menu">
                <Menu.Item className="search-bar">
                    <Input 
                        name="searchTerm"
                        value={this.state.searchTerm}
                        className='icon' 
                        icon='search' 
                        placeholder='Where to Work'
                        onChange={this.handleChange}/>
                </Menu.Item >
                <Menu.Item borderless position="right">Start</Menu.Item>
                <Menu.Item>
                <DateInput
                    name="startDate"
                    placeholder="Date"
                    value={this.state.startDate}
                    iconPosition="left"
                    onChange={this.handleChange}
                    dateFormat="MM-DD-YYYY"
                    closable
                />
                </Menu.Item>
                <Menu.Item borderless>End</Menu.Item>
                <Menu.Item>
                <DateInput
                    name="endDate"
                    placeholder="Date"
                    value={this.state.endDate}
                    iconPosition="left"
                    onChange={this.handleChange}
                    closable
                    dateFormat="MM-DD-YYYY"
                    minDate={this.state.startDate}
                />
                </Menu.Item>
            </Menu>
            <Dropdown raised className="features-dropdown" placeholder ='Select Features' fluid multiple selection options={this.options} />
            </Container>
        )
    }
}

export default SearchBar
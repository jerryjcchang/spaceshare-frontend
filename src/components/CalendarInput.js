import React from 'react'
import { Menu, Icon} from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';

class CalendarInput extends React.Component{

    state = {
        startDate: "",
        endDate: "",
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }

    render(){
        return( <Menu secondary>
                <Menu.Item>
                <DateInput
                    clearable
                    clearIcon={<Icon name="remove" color="red" />}
                    name="startDate"
                    placeholder="Start Date"
                    value={this.state.startDate}
                    iconPosition="left"
                    onChange={this.handleChange}
                    dateFormat="MM-DD-YYYY"
                    closable
                    // disable={["2/28/19", "3/1/19", "3/3/19"]}
                    // marked={this.state.startDate}
                    // markColor="blue"
                />
                </Menu.Item>
                <Menu.Item>
                <DateInput
                    clearable
                    clearIcon={<Icon name="remove" color="red" />}
                    name="endDate"
                    placeholder="End Date"
                    value={this.state.endDate}
                    iconPosition="left"
                    onChange={this.handleChange}
                    closable
                    dateFormat="MM-DD-YYYY"
                    minDate={this.state.startDate}
                    initialDate={this.state.startDate}

                />
                </Menu.Item>
                </Menu>
        )
    }
}

export default CalendarInput

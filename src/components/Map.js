import React from 'react'
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'
import API_KEY from '../secret'

class MapContainer extends React.Component{

    render(){

        const style = {
            width: '97%',
            height: '90%',
        }

        const coordinates = {
            lat: this.props.space.lat,
            lng: this.props.space.long
        }

        return(
            <Map id="google-map" 
                 google={this.props.google} 
                 zoom={15}
                 style={style}
                 initialCenter={coordinates}
             >
                <Marker 
                 position={coordinates}/>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (API_KEY)
  })(MapContainer)
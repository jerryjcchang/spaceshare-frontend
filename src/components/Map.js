import React from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import API_KEY from "../secret";
import { connect } from "react-redux";

class MapContainer extends React.Component {
  componentDidMount() {
    document.getElementById("google-map").firstChild.id = "map-child";
  }
  render() {
    const style = {
      width: this.props.windowWidth > 991 ? "97%" : "94%",
      height: "90%"
    };

    const coordinates = {
      lat: this.props.space.lat,
      lng: this.props.space.long
    };

    return (
      <div id="google-map">
        <Map
          google={this.props.google}
          zoom={15}
          style={style}
          initialCenter={coordinates}
        >
          <Marker position={coordinates} />
        </Map>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    windowWidth: state.windowWidth
  };
};

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: API_KEY
  })(MapContainer)
);

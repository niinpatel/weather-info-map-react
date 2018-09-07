import React, { Component } from "react";
import MapWithAMakredInfoWindow from "./MapWithAMakredInfoWindow";
import Axios from "axios";
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
const mapsApiKey = process.env.REACT_APP_MAPS_API_KEY;

class Map extends Component {
  state = {
    marker: {}
  };

  componentDidMount() {
    this.updateCoOrds();
  }

  updateCoOrds = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(
          {
            marker: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          },
          this.updateWeatherData
        );
      });
    } else {
      console.log("error");
    }
  };

  onMapClick = event => {
    this.setState(
      {
        marker: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
      },
      this.updateWeatherData
    );
  };

  updateWeatherData = () => {
    const { lat, lng } = this.state.marker;
    const apiCallURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${weatherApiKey}`;
    const apiCall = Axios.get(apiCallURL);
    apiCall.then(res => {
      this.setState({
        weatherData: { ...res.data.main, location: res.data.name }
      });
    });
  };

  render() {
    const { lat, lng } = this.state.marker;
    return lat && lng ? (
      <MapWithAMakredInfoWindow
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `800px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        latLng={{ lat, lng }}
        onMapClick={this.onMapClick}
        weatherData={this.state.weatherData}
      />
    ) : (
      <div />
    );
  }
}
export default Map;

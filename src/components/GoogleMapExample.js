import React from "react";
import { compose, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

export default compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => {
        return {
          isOpen: !isOpen
        };
      }
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={6}
    defaultCenter={props.latLng}
    onClick={props.onMapClick}
  >
    <Marker position={props.latLng} onClick={props.onToggleOpen}>
      {props.isOpen && (
        <InfoWindow onCloseClick={props.onToggleOpen}>
          <div>
            {props.weatherData && (
              <div style={{ background: "red" }}>
                <p>Location: {props.weatherData.location}</p>
                <p>
                  Temperature: {props.weatherData.temp}
                  °C
                </p>
                <p>Pressure: {props.weatherData.pressure} hPa</p>
                <p>Humidity: {props.weatherData.humidity}%</p>
              </div>
            )}
          </div>
        </InfoWindow>
      )}
    </Marker>
  </GoogleMap>
));

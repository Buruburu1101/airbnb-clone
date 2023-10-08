// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Flat from './components/flat';
// import { compose, withProps } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import GoogleMapReact from 'google-map-react';
import Marker from './components/marker';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flats:[],
      selectedFlat:null
    };
  }

  componentDidMount() {
    const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
    fetch(url) // AJAX
      .then(response => response.json())
      .then((data) => {
        this.setState({
          flats:data
        });
      })
  }

  selectFlat=(flat) => {
    this.setState({
      selectedFlat: flat
    })
  };
  render() {


    let center = {
      lat: 48.8566,
      lng: 2.3522
    };

    if (this.state.selectedFlat) {
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng
      }
    }

    /*
    const MyMapComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        defaultZoom={11}
        defaultCenter={center}
      >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
      </GoogleMap>
    );
    */


    return (
      <div className='app'>
        <div className='main'>
          <div className='search'>
          </div>
          <div className='flats'>
            {this.state.flats.map((flat) => {
              return <Flat
              key={flat.name}
              flat={flat}
              selectFlat={this.selectFlat}/>
            })}
          </div>
        </div>
        <div className='map'>
        <GoogleMapReact
            center={center}
            zoom={14}>
              {this.state.flats.map((flat) => {
              return <Marker
              key={flat.name}
              lat={flat.lat}
              lng={flat.lng}
              text={flat.price}
              selected={flat === this.state.selectedFlat}/>
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
    }
}
export default App;

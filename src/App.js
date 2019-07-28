import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import axios from 'axios'

class App extends Component {

  state = {
    venues : []
  }

  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDonQhgJpBJtRi7JaM1T0nycwkJt7_MD4g&v=2&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "CFSJXPYRI1JTKJAQZMJMQXVNAQUWFOFVHFCKLSBPF1J4RZBL",
      client_secret: "AXBE1LPLTQ1FNHIWK3A2Z5YN4GHEKAQ0CJFF1X4PHFAGYDWH",
      query: "coffee",
      near: "Singapore",
      v: "20200404"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("error " + error)
      })
  }


  initMap = () => {
     var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 1.352083, lng: 103.819836},
      zoom: 12
    })

     this.state.venues.map(myVenue =>{

      var marker = new window.google.maps.Marker({
      position: {lat: myVenue.venue.location.lat, 
                 lng: myVenue.venue.location.lng},
      map: map,
      title: myVenue.venue.name
      });
     })

  }

  render() {
    return (
      <main>
         <div id="map"></div>
      </main>
      )
  }
}


function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}


export default App;

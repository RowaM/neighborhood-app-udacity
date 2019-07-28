import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {

  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDonQhgJpBJtRi7JaM1T0nycwkJt7_MD4g&v=2&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
     var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 36.316666, lng: 74.649986},
      zoom: 15
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

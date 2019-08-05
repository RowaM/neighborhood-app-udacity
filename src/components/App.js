import React, {Component} from 'react';
import SideList from './SideList';


class App extends Component {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            'myVenues': [
                {
                    'name': "Gardens by the Bay",
                    'lat': 1.2825535574086406,
                    'lng': 103.86434963624147,
                    'streetAddress': "18 Marina Gardens Dr"
                },
                {
                    'name': "Singapore Botanic Gardens",
                    'lat': 1.3158689657800091,
                    'lng': 103.81557234846358,
                    'streetAddress': "1 Cluny Rd."
                },
                {
                    'name': "Marina Bay Waterfront Promenade",
                    'lat': 1.2811245137355043,
                    'lng': 103.85555642836434,
                    'streetAddress': "Bayfront Ave"
                },
                {
                    'name': "Supertree Grove",
                    'lat': 1.282000108902525,
                    'lng': 103.86413390426804,
                    'streetAddress': "Gardens By The Bay"
                },
                {
                    'name': "MacRitchie Nature Trail",
                    'lat': 1.3473117419966827,
                    'lng': 103.83141058957372,
                    'streetAddress': "MacRitchie Reservoir Park"
                },
                {
                    'name': "Giraffe Enclosure@Singapore Zoo",
                    'lat': 1.4014784680607464,
                    'lng': 103.79414122180707,
                    'streetAddress': "80 Mandai Lake Rd"
                }
            ],
            'map': '',
            'infowindow': '',
            'prevmarker': ''
        };

        // retain object instance when used in the function
        this.initMap = this.initMap.bind(this);
        this.openInfoWindow = this.openInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }

    componentDidMount() {
        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
        loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDonQhgJpBJtRi7JaM1T0nycwkJt7_MD4g&v=3&callback=initMap')
    }

    /**
     * Initialise the map once the google map script is loaded
     */
    initMap() {
        var self = this;

        var mapview = document.getElementById('map');
        mapview.style.height = window.innerHeight + "px";
        var map = new window.google.maps.Map(mapview, {
            center: {lat: 1.352083, lng: 103.819836},
            zoom: 12,
            mapTypeControl: false
        });

        var InfoWindow = new window.google.maps.InfoWindow({});

        window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
            self.closeInfoWindow();
        });

        this.setState({
            'map': map,
            'infowindow': InfoWindow
        });

        window.google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            self.state.map.setCenter(center);
        });

        window.google.maps.event.addListener(map, 'click', function () {
            self.closeInfoWindow();
        });

        var myVenues = [];
        this.state.myVenues.forEach(function (location) {
            var longname = location.name;
            var marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.lat, location.lng),
                animation: window.google.maps.Animation.DROP,
                map: map
            });

            marker.addListener('click', function () {
                self.openInfoWindow(marker);
            });

            location.longname = longname;
            location.marker = marker;
            location.display = true;
            myVenues.push(location);
        });
        this.setState({
            'myVenues': myVenues
        });
    }

    /**
     * Open the infowindow for the marker
     */
    openInfoWindow(marker) {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
            'prevmarker': marker
        });
        this.state.infowindow.setContent('Loading Data...');
        this.state.map.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInfo(marker);
    }

    /**
     * Fetching venue data from the foursquare api for the marker & infowindow
     */
    getMarkerInfo(marker) {
        var self = this;
        var clientId = "CFSJXPYRI1JTKJAQZMJMQXVNAQUWFOFVHFCKLSBPF1J4RZBL";
        var clientSecret = "AXBE1LPLTQ1FNHIWK3A2Z5YN4GHEKAQ0CJFF1X4PHFAGYDWH";
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        self.state.infowindow.setContent("Sorry cannot find data");
                        return;
                    }

                    // get name and location in infomap
                    response.json().then(function (data) {
                        var location_data = data.response.venues[0];
                        var name = location_data.name;
                        var address = location_data.location.address;
                        self.state.infowindow.setContent(name + '<br>' + address);
                    });
                }
            )
            .catch(function (err) {
                self.state.infowindow.setContent("Sorry cannot find data");
            });
    }

    /**
     * Close the infowindow for the marker
     */
    closeInfoWindow() {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(null);
        }
        this.setState({
            'prevmarker': ''
        });
        this.state.infowindow.close();
    }

    /**
     * Render function of App
     */
    render() {
        return (
            <div>
                <SideList key="100" myVenues={this.state.myVenues} openInfoWindow={this.openInfoWindow}
                              closeInfoWindow={this.closeInfoWindow}/>
                <div id="map"></div>
            </div>
        );
    }
}

export default App;

/**
 * Load the google maps Asynchronously
 */
function loadMapJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = function () {
        document.write("Google Maps can't be loaded");
    };
    ref.parentNode.insertBefore(script, ref);
}
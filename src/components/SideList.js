import React, {Component} from 'react';
import SideListItems from './SideListItems';
import LogoComponent from './LogoComponent';

class SideList extends Component {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            'locations': '',
            'query': '',
            'suggestions': true,
        };

        this.filterLocations = this.filterLocations.bind(this);
    }

    /**
     * Filter Locations based on user query
     */
    filterLocations(event) {
        this.props.closeInfoWindow();
        const {value} = event.target;
        var locations = [];
        this.props.myVenues.forEach(function (location) {
            if (location.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                location.marker.setVisible(true);
                locations.push(location);
            } else {
                location.marker.setVisible(false);
            }
        });

        this.setState({
            'locations': locations,
            'query': value
        });
    }

    componentWillMount() {
        this.setState({
            'locations': this.props.myVenues
        });
    }


    render() {
        var venuelist = this.state.locations.map(function (listItem, index) {
            return (
                <SideListItems key={index} openInfoWindow={this.props.openInfoWindow.bind(this)} data={listItem}/>
            );
        }, this);

        return (
            <div className="search">
                <LogoComponent />
                <input role="search" aria-labelledby="filter" id="search-input" className="search-input" type="text" placeholder="Search"
                       value={this.state.query} onChange={this.filterLocations}/>
                <ul>
                    {this.state.suggestions && venuelist}
                </ul>
                
            </div>
        );
    }
}

export default SideList;
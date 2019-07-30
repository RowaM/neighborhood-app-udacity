import React, { Component } from 'react';
import LogoComponent from './LogoComponent.js';


class Sidebar extends Component {

	render() {
		return (
			<LogoComponent />

            <div className="drop-down">
            </div>
			)
	}

}


export default Sidebar;
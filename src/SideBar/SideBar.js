import React, { Component } from 'react';
import { Column, Row } from 'simple-flexbox';
import LogoComponent from './LogoComponent.js';
import DropDown from './DropDown.js';


class SideBar extends Component {

	render() {
		return (
			<div>
				<LogoComponent />
				<DropDown />
			</div>
			)
	}

}


export default SideBar;
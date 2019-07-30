import React, { Component } from 'react';
import { ReactComponent as Logo } from './logo.svg';


class LogoComponent extends Component {

	render() {
		return (
			<div className="logo">
              <Logo />
            </div>
			)
	}

}


export default LogoComponent;
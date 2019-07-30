import React, { Component } from 'react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const options = [
  'Food', 'Hotel', 'Museum', 'Shopping', 'Theme parks'
]


class DropDown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: ''
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  }

  render () {
    const defaultOption = this.state.selected
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

    return (
      <section>
        <h3>Points of interests</h3>
        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
        <div className='result'>
          You selected
          <strong> {placeHolderValue} </strong>
        </div>

        <section>
          <h4>Location details</h4>
          <div className='code'>
            {this.props.dataFromApp.map((item,name) => <li key={name}>{name}</li>)}
          </div>
        </section>
      </section>
    )
  }
}

export default DropDown;
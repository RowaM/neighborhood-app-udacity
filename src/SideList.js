import React, { Component } from 'react';

class SideList extends Component {

  onSelect (code) {
    console.log('You selected ', code.label)
    this.setState({selected: code})
  }

  render () {
    
    return (
      <section>
        <h4>Points Of Interest</h4>
          <div className='code'>
            {this.props.dataFromApp.map(item => <li key={item.referralId}>{item.venue.name}</li>)}
          </div>
      </section>
    )
  }
}

export default SideList;
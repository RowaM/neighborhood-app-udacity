import React, { Component } from 'react';

class SideList extends Component {

    // //test phase
    // onClick={(this) => this.props.clickListItem(venue)}

  handleClick(e){
    console.log(e.target.innerText);

  }

  render () {
    
    return (
      <section>

        <div className='code'>
            {this.props.dataFromApp.map(item => 
              <li onClick={this.handleClick} onChange={this.props.initMap} key={item.referralId}>{item.venue.name}</li>
            )}
        </div>

      </section>
    )
  }
}

export default SideList;
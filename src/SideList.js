import React, { Component } from 'react';

class SideList extends Component {

  handleClick(e){
  console.log(e.target.innerText);
  }

   render () {
    
    return (
      <section>

        <div className='code'>
            {this.props.dataFromApp.map(item => 
              <li onClick={this.handleClick} key={item.referralId}>{item.venue.name}</li>
            )}
            
        </div>

      </section>
    )
  }
}

export default SideList;
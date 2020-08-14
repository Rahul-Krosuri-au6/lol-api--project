import React from 'react'
import config from '../config/config'

const Item = React.createClass({
  render: function() {
    const backgroundStyles = {
      backgroundPosition: '-'+this.props.item.image.x+'px -'+ this.props.item.image.y+'px'
    };
    return (
      <div className={"itemicon "+this.props.item.image.sprite.replace('.png', '')} style={backgroundStyles}>
        <div className={"tooltip"} >
          {this.props.item.name}
        </div>
      </div>
      );
  }
});

module.exports = Item;
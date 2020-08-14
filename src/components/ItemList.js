import React from 'react'
import config from '../config/config'
import Item from './Item'

const ItemList = React.createClass({
  render: function  () {
    const self = this;
    return (
      <div className="item-list">
        {this.props.items.map(function(item, index) {
          return (
            <Item item={item} key={index} />
          );
        })}
      </div>
    );
  }
});

module.exports = ItemList;
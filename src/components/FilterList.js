import React from 'react'
import config from '../config/config'

const FilterList = React.createClass({
  render: function() {

    return (
      <select ref="filterList" >
      {item_choices.map(function  (item, index) {
        return (
          <option value={item.id} key={index}>{item.name}</option>
        );
      })}
      </select>
    );
  }
});

module.exports = FilterList;
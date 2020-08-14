import React from 'react'
import config from '../config/config'

let itemChoices = []

const FilterList = React.createClass({
  render: function() {

    return (
      <select ref="filterList" >
      {itemChoices.map(function  (item, index) {
        return (
          <option value={item.id} key={index}>{item.name}</option>
        );
      })}
      </select>
    );
  }
});

export default FilterList
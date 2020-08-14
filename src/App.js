import React from 'react'
import ReactDom from 'react-dom'
import LeagueSearch from './components/LeagueSearch'
import GameList from './components/GameList'
import ItemList from './components/ItemList'
import FilterList from './components/FilterList'


ReactDOM.render(
  <LeagueSearch />,
  document.querySelector('#root')
);
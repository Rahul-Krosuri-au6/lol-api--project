import React from 'react'
import config from '../config/config'
import api_key from '../config/api_key'
import FilterList from './FilterList'
import GameList from './GameList'

const LeagueSearch = React.createClass({
  getInitialState: function  () {
    return {
      summonerId: '',
      summonerName: '',
      games: [],
      champions: [],
      itemData: [],
      activeGames: [],
    }
  },
  render: function  () {
    let items = this.state.itemData;
    let item_choices = [{name: 'Any', id: 'any'}];
    for(let key in items) {
      let itemObj = {
        name: items[key].name,
        id: items[key].id
      }
      item_choices.push(itemObj);
    }
    return (
      <div className={"leagueSearch"}>
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="summonerName" placeholder="Enter summoner name.." defaultValue="godsgodgg" />
        <input type="submit" value="Search" />
      </form>
      <select games={this.state.games} items={this.state.itemData} ref="filterList" onChange={this.filter}>
      {item_choices.map(function  (item, index) {
        return (
          <option value={item.id} key={index}>{item.name}</option>
        );
      })}
      </select>
      <GameList games={this.state.activeGames} champions={this.state.champions} itemData={this.state.itemData}/>
      </div>
    );
  },
  componentDidMount: function  () {
    $.ajax({
      url: `${config.staticUrl}/${config.region}/${config.staticVersion}/${config.champPath}`,
      dataType: 'json',
      data: {
        champData: 'image',
        dataById: true,
        api_key: api_key
      },
      type: 'GET',
      success: function  (data) {
        this.setState({champions: data.data});
      }.bind(this)
    });
    $.ajax({
      url: `${config.staticUrl}/${config.region}/${config.staticVersion}/item`,
      dataType: 'json',
      data: {
        api_key: api_key,
        locale: 'en_US',
        itemListData: 'all'
      },
      type: 'GET',
      success: function  (data) {
        this.setState({itemData: data.data});
      }.bind(this)
    });
  },
  handleSubmit: function  (e) {
    e.preventDefault();
    let summonerName = this.refs.summonerName.getDOMNode().value.trim();
    let summonerId = this.state.summonerId;
    let url = 'https://'+config.region+'.api.pvp.net/api/lol/'+config.region+'/'+config.version+'/'+config.path;
      $.ajax({
        url: url+summonerName,
        dataType: 'json',
        data: {
          api_key: api_key,
        },
        success: function  (data) {
          let self = this;
          summonerName = summonerName.toLowerCase().split(' ').join('');
          let summonerId = data[summonerName].id;
          let styledName = data[summonerName].name;
          this.getGamesById(summonerId);
          this.setState({summonerId: summonerId, summonerName: styledName});
        }.bind(this)
      });
  },
  getGamesById: function  (summonerId) {
    let gameVersion = 'v1.3';
    let gamePath = 'game/by-summoner/'+summonerId+'/recent';
    let url = `https://${config.region}.api.pvp.net/api/lol/${config.region}/${gameVersion}/${gamePath}`;
    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        api_key: api_key
      },
      success: function  (data) {
        this.setState({games: data.games, activeGames: data.games});
      }.bind(this)
    });
  },
  filter: function  (e) {
    let value = this.refs.filterList.getDOMNode().value;
    let activeGames = [];
    if(value == 'any') {
      this.getGamesById(this.state.summonerId);
    } else {
    for(let key in this.state.games) {
      if(value == this.state.games[key].stats.item0 || value == this.state.games[key].stats.item1 || value == this.state.games[key].stats.item2 || value == this.state.games[key].stats.item3 || value == this.state.games[key].stats.item4 || value == this.state.games[key].stats.item5 || value == this.state.games[key].stats.item6) {
        activeGames.push(this.state.games[key]);
      }
    }
    this.setState({activeGames: activeGames});
  }
 }

});

module.exports = LeagueSearch;
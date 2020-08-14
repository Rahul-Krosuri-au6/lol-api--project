import React from 'react'
import config from '../config/config'
import Game from './Game'

const GameList = React.createClass({
  render: function  () {
    const self = this;
    return (
      <div className="game-list">
        {this.props.games.map(function(game, index) {
          return (
            <Game game={game} key={index} champions={self.props.champions} itemData={self.props.itemData}/>
          );
        })}
      </div>
    );
  }
});

module.exports = GameList;
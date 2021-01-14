import React, { Component } from 'react'
import Scores from './Scores'

/**
 * Renders buttons to play without webcamer
 * Passes string to parent components gameplay logic function
 * @extends Component
 */
class GameUI extends Component {

  render() {
    return (
      <div class="parent flexbox-item-3">
        <Scores match={this.props.match} matchId={this.props.matchId}/>
        <div className="choices">
          <div className="choice glow-on-hover" id="r" onClick={() => this.props.handlePlay("Rock")}>
            <img src="https://img.icons8.com/ios/100/000000/paper-waste.png" alt=""/>
          </div>
          <div className="choice glow-on-hover" id="p" onClick={() => this.props.handlePlay("Paper")}>
            <img src="https://img.icons8.com/ios/100/000000/toilet-paper.png" alt=""/>
          </div>
          <div className="choice glow-on-hover" id="s" onClick={() => this.props.handlePlay("Scissors")}>
            <img src="https://img.icons8.com/ios/100/000000/cut.png" alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default GameUI

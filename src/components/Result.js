import React, { Component } from 'react';

/**
 * Visualising result of the last match of the game
 * @extends Component
 */
class Result extends Component {
  render(){
    return(
      <div class="parent flexbox-item-4">
        <div class="result1">
          MATCH No. {this.props.match.matchId -1} RESULTS
        </div>
        <div class="result-table">
          <div class="result">YOU :</div>
          <div class="result2">{this.props.match.match.userChoice}</div>
          <div class="result">RESULT : </div>
          <div class="result2">{this.props.match.match.result}</div>
          <div class="result">AI : </div>
          <div class="result2">{this.props.match.match.aiChoice}</div>
        </div>
      </div>
    )
  }
}
export default Result

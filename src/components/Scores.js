import React, { Component } from 'react'

/**
 * Renders score board inside GameUI component
 * @extends Component
 */
class Scores extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userScore: 0,
      draw: 0,
      aiScore: 0
    }
  }

  /**
   * Updates score board state from the main state of game
   */
  update() {
    if (this.props.match.result === "Win"){
      this.setState({
        userScore: this.state.userScore + 1
      })
    } else if (this.props.match.result === "Lose") {
      this.setState({
        aiScore: this.state.aiScore + 1
      })
    } else if (this.props.match.result === "Draw") {
      this.setState({
        draw: this.state.draw + 1
      })
    }
  }

  /**
   * Checks when game is played and triggers update on score board state
   * @param  {[int]} prevProps running number of games played
   */
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.matchId !== prevProps.matchId) {
      this.update()
    }
  }

  render(){
    return(
      <div class="results">
        <div id="user-label" class="badge">YOU</div>
        <div className="score-board">
          <span id="user-score" class="scores">{this.state.userScore}</span>
          :
          <span id="ai-score" class="scores">{this.state.draw}</span>
          :
          <span id="ai-score" class="scores">{this.state.aiScore}</span>
        </div>
        <div id="computer-label" class="badge">AI</div>
      </div>
    )
  }
}

export default Scores

import React, { Component } from 'react'
import Header from './components/Header'
import GameUI from './components/GameUI'
import Result from './components/Result'
import Guide from './components/Guide'
import AiCamera from './components/AiCamera'
import './App.css'

/**
 * Main component. Handles main logics for gameplay.
 * @extends Component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: {
        result: "",
        userChoice: "",
        aiChoice: "",
      },
      matchId: 1
    }
    this.updateMatch = this.updateMatch.bind(this)
  }
  /** Updates main state of the game */
  updateMatch = (e) => {
    this.setState({
      match: e,
      matchId: this.state.matchId + 1
    })
  }

  /**
   * Gameplay logics. Takes user input, generates ai input and calculates
   * result that changes gamestate.
   * @param  {[string]} userChoice [players input for gameplay]
   * @return {[null]}
   */
  handlePlay(userChoice) {
    const plays = ["Rock", "Paper", "Scissors"]
    const aiChoice = plays[Math.floor(Math.random() * plays.length)]
    switch (userChoice + aiChoice) {
      case "RockRock":
      case "ScissorsScissors":
      case "PaperPaper":
        this.updateMatch({
          result: "Draw",
          userChoice: userChoice,
          aiChoice: aiChoice
        })
        break;

      case "RockScissors":
      case "ScissorsPaper":
      case "PaperRock":
        this.updateMatch({
          result: "Win",
          userChoice: userChoice,
          aiChoice: aiChoice
        })
        break;

      case "ScissorsRock":
      case "PaperScissors":
      case "RockPaper":
        this.updateMatch({
          result: "Lose",
          userChoice: userChoice,
          aiChoice: aiChoice
        })
        break;
      default:
      this.updateMatch({
        result: "",
        userChoice: "",
        aiChoice: ""
      })
    }
  }

  render(){
    const firstGamePlayed = (this.state.matchId > 1);
    return (
      <div class="disable">
        <Header />
        <div className="app flexbox-container">
          <AiCamera updateMatch={this.updateMatch}/>
          <GameUI updateMatch={this.updateMatch} handlePlay={this.handlePlay} match={this.state.match} matchId={this.state.matchId}/>
          {firstGamePlayed
            ? <Result match={this.state}/>
            : <Guide/>
          }
        </div>
      </div>
    );
  }
}

export default App

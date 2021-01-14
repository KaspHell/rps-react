import React, { Component } from 'react';

/**
 * Placeholder element to give instructions for the player.
 * Also holds credits in it.
 * Replaced by the Result -component after the game is started.
 * @extends Component
 */
class Guide extends Component {
  render(){
    return(
      <div class="parent flexbox-item-4">
        <div class="guide">
          <br/>You can play this game with your camera or with the buttons in the middle
          <br/>
          <br/>To play with the camera , you will need to show real stone, paper or scissors to the camera
          <br/>
        </div>
        <div class="infos">
          <ul>
  					<li class="info">Created by Kasperi Hellstedt</li>
            <li class="info">Source code on <a href="https://gitlab.utu.fi/kshell/rps_react">GitLab</a></li>
  					<li class="info">
            Powered by <a href="https://teachablemachine.withgoogle.com/">Google's Teachable Machine</a>
            , <a href="https://www.tensorflow.org/js/?hl=fi/">Tensorflow.js</a> and <a href="https://reactjs.org/">ReactJS</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Guide

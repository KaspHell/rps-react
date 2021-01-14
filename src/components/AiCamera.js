import React, { useState, useEffect, useCallback } from 'react'
import * as tmImage from '@teachablemachine/image'
import loadVideo from '../utilities/camera'

/**
 * Handles webcamer input and resolves it with image recognition to pass players
 * input to game logics.
 * @param       {[function]} props Function to update main state of the game
 */
function AiCamera(props)  {

  // the link to your model provided by Teachable Machine export panel
  const URL = 'https://teachablemachine.withgoogle.com/models/zecS4aGk6/'

  /*
  Variables for storing image recognition related data
   */
  const [model, setModel] = useState(null)
  const [prediction, setPrediction] = useState([])
  const [results, setResult] = useState([])

  /*
  For storing webcamera feed
   */
  const [userWebCam, setUserWebCam] = useState(null)

/*
Loads image recognition model from cloud
 */
  const loadModel = async () => {
    const modelURL = URL + 'model.json'
    const metadataURL = URL + 'metadata.json'
    const model = await tmImage.load(modelURL, metadataURL)
    setModel(model)
  }

  /**
   * Loop to use image recognition continually
   * @param  {[videofeed]} image [description]
   */
  const predictVideo = useCallback(async (image) => {
		if (model) {
			const predict = await model.predict(image, 4)
      setPrediction(predict)
      predictVideo(userWebCam)
		}
	}, [userWebCam, model])

  /**
   * Copy of App.js gameplay logics. Takes user input, generates ai input and calculates
   * result and passes it to parent component.
   * Had major issues for passing variables and using them in functions later,
   * so had bring gameplay logics to here also.
   * @param  {[string]} userChoice [players input for gameplay]
   */
  function handlePlay(userChoice) {
    const plays = ["Rock", "Paper", "Scissors"]
    const aiChoice = plays[Math.floor(Math.random() * plays.length)]
    switch (userChoice + aiChoice) {
      case "RockRock":
      case "ScissorsScissors":
      case "PaperPaper":
        props.updateMatch({
          result: "Draw",
          userChoice: userChoice,
          aiChoice: aiChoice
        })
        break;

      case "RockScissors":
      case "ScissorsPaper":
      case "PaperRock":
        props.updateMatch({
          result: "Win",
          userChoice: userChoice,
          aiChoice: aiChoice
        })
        break;

      case "ScissorsRock":
      case "PaperScissors":
      case "RockPaper":
        props.updateMatch({
          result: "Lose",
          userChoice: userChoice,
          aiChoice: aiChoice
        })
        break;
      case "EmptyRock":
      case "EmptyScissors":
      case "EmptyPaper":
        props.updateMatch({
          result: "",
          userChoice: "",
          aiChoice: ""
        })
        break;
    }
  }

  /**
   * Parsing image recognition data to get best setPrediction
   * Passes that result to gameplay logics.
   */
  async function makeMove() {
    setResult(prediction)
    var best = 0
    var className = ""
    var i;
    for (i=0; i < results.length; i++) {
      console.log(results[i].probability);
      if (results[i].probability > best) {
        best = results[i].probability
        className = results[i].className
      }
    }
    handlePlay(className)
  }

  /**
   * These functions are mandatory to load asap when component mounts
   */
  // loaded once when component is mounted
  useEffect(() => {
    loadModel()
  }, [])

  // loaded once when component is mounted
  useEffect(() => {
		try {
			const video = loadVideo(document.getElementById('userWebCam'))
			video.then((resolvedVideo) => {
				setUserWebCam(resolvedVideo)
			})
		} catch (err) {
			throw err
		}
	}, [])

  // check webcam is on and starts prediction loop
	useEffect(() => {
		if (userWebCam) {
			predictVideo(userWebCam)
		}
	}, [predictVideo, userWebCam, model])

  return (
    <div class="parent flexbox-item-2">
      <button class="btn btn-secondary btn-lg btn-block glow-on-hover" onClick={makeMove}>PUSH TO MAKE YOUR MOVE WITH WEBCAM</button>
      <video class="userWebCam" id="userWebCam"></video>
      <ul class="possibilities">
        {prediction.map(({ className, probability }) => (
          <li key={className}>
            {`${className}: ${(probability * 100).toFixed(1)}%`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AiCamera

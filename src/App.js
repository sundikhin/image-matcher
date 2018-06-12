import React, {Component, Fragment  } from 'react';
import ImageGrid from './ImageGrid';
import Timer from './Timer';
import './App.css';

class App extends Component {
  state = {
    currentRound: -1,
    remainingTime: 30,
    gameScore: 0,
    gameStarted: false,
    selectedImage: null,
    rounds: [
      {
        roundId: '00',
        images: ['a', 'b']
      },
      {
        roundId: '01',
        images: ['a', 'b']
      },
      {
        roundId: '02',
        images: ['a', 'b']
      },
      {
        roundId: '03',
        images: ['a', 'b']
      },
      {
        roundId: '04',
        images: ['a', 'b']
      },
      {
        roundId: '05',
        images: ['a', 'b']
      },
      {
        roundId: '06',
        images: ['a', 'b']
      },
      {
        roundId: '07',
        images: ['a', 'b']
      },
      {
        roundId: '08',
        images: ['a', 'b']
      },
      {
        roundId: '09',
        images: ['a', 'b']
      }
    ],
  }

  // starts game and establishes the first round
  handleStartGame = () => {
    this.setState({
      gameStarted: true,
    });
    this.newRound()
  }

  setRemainingTime = (remainingTime) => {
    this.setState({ remainingTime })
  }

  // Handles updating the score and moving to a new round
  newRound = () => {
    const { currentRound, gameScore, remainingTime } = this.state;
    this.setState({
      currentRound: currentRound + 1,
      gameScore: currentRound === -1 ? gameScore : gameScore + remainingTime,
      selectedImage: null,
      remainingTime: 30,
      shuffledArray: this.generateUrlsArray(currentRound + 1)
    })

  }

  // Reset the game
  resetGame = () => {
    const { currentRound } = this.state;
    alert( 'You lose, start again')
    this.setState({
      currentRound: 0,
      remainingTime: 30,
      selectedImage: null,
      gameScore: 0,
      shuffledArray: this.generateUrlsArray(0)
    });
  }

  // Check for win condition and handle the cases
  isWinningSelection = () => {
    const { selectedImage } = this.state;
    if (selectedImage === 'b') {
      this.newRound()
    } else {
      this.resetGame()
    }
  }

  // handle select image event
  handleSelectImage = (version) => {
    this.setState(
      {
        selectedImage: version
      },
      this.isWinningSelection
    );
  }

  onTimerUpdate = (newTime) => {
    this.setState({
      remainingTime: newTime
    })
  }

  getImageUrl = (number, version) => {
    return `https://s3-us-west-2.amazonaws.com/fugue-code-tests/fe-image-test/${number}-${version}.jpg`;
  };

  generateUrlsArray = (round) => {
    // rounds would normally be from a db
    const { rounds } = this.state;
    const images = [];

    // create the baseImageUrls based on the current round
    const baseImageUrls = rounds[round].images.map(i => {
      return {
        url: this.getImageUrl(rounds[round].roundId, i),
        version: i
      }
    })

    // add three of the 'a' images to images array
    for (let i = 0; i < 3; i++) {
      images.push(baseImageUrls[0]);
    }
    // add one of the 'b' images to images array
    images.push(baseImageUrls[1]);

    // shuffle images helper function
    const shuffledArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
      }
      return array;
    }

    // actually shuffle images array
    const shuffledImages = shuffledArray(images);

    return shuffledImages;
  }

  render() {
    const { currentRound, gameScore, gameStarted, remainingTime, selectedImage, shuffledArray } = this.state;

    return (
      <div className="App">

        { !gameStarted && <button onClick={() => this.handleStartGame()}>Start Game</button> }

        { gameStarted &&
          <Fragment>
            { remainingTime === 0 ? this.resetGame() : ''}
            <button onClick={() => this.resetGame()}>Restart</button>
            <h1>Round: {currentRound + 1}</h1>
            <Timer {...{
              onTimerUpdate: this.onTimerUpdate,
              selectedImage,
              remainingTime,
              reset: this.resetGame,
              setRemainingTime: this.setRemainingTime }}
            />
            <h1>Score: {gameScore}</h1>
            <ImageGrid images={shuffledArray} handleClick={this.handleSelectImage} />
          </Fragment>
        }
      </div>
    );
  }
}

export default App;

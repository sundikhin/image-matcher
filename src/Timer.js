import React, { Component } from 'react';

class Timer extends Component {
  state = {
    // remaining time prop is for seeding data
    remainingTime: this.props.remainingTime
  };

  componentDidMount() {
    const { remainingTime } = this.state;
    setTimeout( setInterval( () => this.timer(), 1000), 1000);
  }

  timer = () => {
    const { remainingTime } = this.state;
    if (remainingTime > 0) {
      this.setState({ remainingTime: remainingTime - 1 })
    }
    if (this.props.onTimerUpdate !== undefined) {
      this.props.onTimerUpdate(remainingTime - 1);
    }
  }

  resetTimer = (time) => {
    this.props.setRemainingTime(time);

    this.setState({ remainingTime: 30 })
  }

  render(){
    const { remainingTime } = this.state;
    const { selectedImage, selectionMade } = this.props;

    return (
      <div>
        <h1>Time Remaining: {remainingTime > 0 ? remainingTime : 'you lose' }</h1>
        { selectedImage === 'a' || selectedImage === 'b' || remainingTime === 0 ? this.resetTimer(remainingTime) : null }
      </div>
    )
  }
}

export default Timer;

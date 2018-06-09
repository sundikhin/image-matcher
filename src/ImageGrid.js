import React, { Component } from 'react';
import Image from './Image';

const styles = {
  gridContainer: {
    maxWidth: '400px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto'
  },
  image: {
    width: '200px',
    height: '200px'
  }
}

class ImageGrid extends Component {
  state = {
    currentRound: 0,
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

  handleClick = () => {
    const { currentRound } = this.state
    console.log('I WAS CLICKED');
    this.setState({currentRound: currentRound + 1});
  }

  getImageUrl = (number, version) => {
    return `https://s3-us-west-2.amazonaws.com/fugue-code-tests/fe-image-test/${number}-${version}.jpg`;
  };

  generateUrlsArray = (round) => {
    // rounds would normally be from a db
    const { rounds } = this.state;
    const images = [];

    // create the baseImageUrls based on the current round
    const baseImageUrls = rounds[round].images.map(i => this.getImageUrl(rounds[round].roundId, i))

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

    // return shuffled <Image/> components
    return shuffledImages.map((url, i) => <Image key={url+i} imgSrc={url} handleClick={this.handleClick}/>);
  }

  render() {
    console.log(this.state.currentRound);
    return (
      <div style={styles.gridContainer}>
        {this.generateUrlsArray(this.state.currentRound)}
      </div>
    );
  }
}

export default ImageGrid;
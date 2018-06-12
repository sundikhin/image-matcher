import React from 'react';
import Image from './Image';

const styles = {
  gridContainer: {
    maxWidth: '850px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto'
  },
  image: {
    width: '400px',
    height: '400px'
  }
}

const ImageGrid = (props) => {
  const { handleClick, images } = props;
    return (
      <div>
        <div style={styles.gridContainer}>
          {images.map( (image) => <Image key={Math.random()} {...{ handleClick, image }} /> ) }
        </div>
      </div>
    );
  }


export default ImageGrid;
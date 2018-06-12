import React from 'react';

const styles = {
  image: {
    width: '400px',
    height: '400px'
  }
}

const Image = (props) => {
  const { handleClick, image } = props
  return (
    <img style={styles.image} src={image.url} alt={"imgSrc"} onClick={() => handleClick(image.version)} />
  );
};

export default Image;
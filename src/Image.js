import React from 'react';

const styles = {
  image: {
    width: '200px',
    height: '200px'
  }
}

const Image = (props) => {
  const { handleClick, imgSrc, version } = props;
  return (
    <img style={styles.image} src={imgSrc} alt={"imgSrc"} onClick={() => handleClick(version)}/>
  );
};

export default Image;
import React from 'react';

const styles = {
  image: {
    width: '200px',
    height: '200px'
  }
}

const Image = (props) => {
  const { imgSrc } = props;
  return (
    <img style={styles.image} src={imgSrc} alt={"imgSrc"} onClick={() => props.handleClick()}/>
  );
};

export default Image;
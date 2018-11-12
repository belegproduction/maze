import React from 'react';
import PropTypes from 'prop-types';

class MazePlayer extends React.Component {
  componentWillMount() {
    this.props.create();
  }
  render() {
    const { posX, posY, width, height } = this.props.player;

    return (
      <rect className="player"
        x={ posX }
        y={ posY }
        width={ width }
        height={ height }
      />
    );
  }
}

MazePlayer.propTypes = {
  create: PropTypes.func.isRequired,
  grid: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
};

export default MazePlayer;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class MazePlayer extends React.PureComponent {

  render() {
    const { posX, posY, width, height, color, nickname } = this.props.player;
    if (!posX || !posY) {
      return "";
    }
    return (
      <Fragment>
        <rect className="player"
          x={ posX }
          y={ posY }
          width={ width }
          height={ height }
          style={{fill: color}}
        />
        <text x={ posX }
          y={ posY + height + height/2 }
          className="player--nickname">{ nickname }</text>
      </Fragment>
    );
  }
}

MazePlayer.propTypes = {
  player: PropTypes.object.isRequired,
};

export default MazePlayer;

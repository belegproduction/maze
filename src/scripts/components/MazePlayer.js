import React, { Fragment } from 'react';
import Transition from 'react-prop-transition';
import PropTypes from 'prop-types';

class MazePlayer extends React.PureComponent {

  render() {
    const { posX, posY, width, height, color, nickname } = this.props.player;
    if (!posX || !posY) {
      return '';
    }
    return (
      <Transition props={{
        posX,
        posY,
      }}
      duration={300}>
        {({ posX, posY }) => {
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
                y={ posY + height + height / 2 }
                className="player--nickname">{ nickname }</text>
            </Fragment>
          );
        }}
      </Transition>
    );
  }
}

MazePlayer.propTypes = {
  player: PropTypes.object.isRequired,
};

export default MazePlayer;

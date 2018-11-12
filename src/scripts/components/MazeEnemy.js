import React from 'react';
import PropTypes from 'prop-types';

class Enemy extends React.PureComponent {

  render() {
    const { posX, posY, width, height } = this.props.enemy;

    return (
      <rect className="player player__enemy"
        x={ posX }
        y={ posY }
        width={ width }
        height={ height }
      />
    );
  }
}

Enemy.propTypes = {
  enemy: PropTypes.object.isRequired,
};

export default Enemy;

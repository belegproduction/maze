import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class Enemy extends React.PureComponent {

  render() {
    const { posX, posY, width, height, color, nickname } = this.props.enemy;
    if (!posX || !posY) {
      return "";
         }
    return (
      <Fragment>
        <rect className="player player__enemy"
          key={nickname}
          x={ posX }
          y={ posY }
          width={ width }
          height={ height }
          style={{fill: color}}
        />
        <text x={ posX }
              key={nickname + 'text'}
                  y={ posY + height + height/2 }
                  className="player--nickname">{ nickname }</text>
        </Fragment>
    );
  }
}

Enemy.propTypes = {
  enemy: PropTypes.object.isRequired,
};

export default Enemy;

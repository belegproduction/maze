import React, { Fragment } from 'react';
import Path from './MazePath';
import PropTypes from 'prop-types';
import Transition from "react-prop-transition";

class Enemy extends React.PureComponent {
  render() {
    const { posX, posY, width, height, color, nickname, path } = this.props.enemy;
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
          return (<Fragment>
            <Path path={ path } color={color}/>
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
          </Fragment>);
        }}
      </Transition>
    );
  }
}

Enemy.propTypes = {
  enemy: PropTypes.object.isRequired,
};

export default Enemy;

import React from 'react';
import PropTypes from 'prop-types';

class MazePath extends React.PureComponent {
  render() {
    const { path, color } = this.props;
    const length = path.length;
    const lines = path.map((item, index) => {
      if (index !== length - 1 ) {
        return <line
          key={ index }
          x1={ item.posX }
          y1={ item.posY }
          x2={ path[index + 1].posX }
          y2={ path[index + 1].posY }
          stroke={ color ? color : 'white' }
          strokeWidth="3"/>;
      }
    });

    return (
      <g className="maze--path">
        {
          lines
        }
      </g>
    );
  }
}

MazePath.propTypes = {
  path: PropTypes.array.isRequired,
};

export default MazePath;

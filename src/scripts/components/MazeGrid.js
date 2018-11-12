import React from 'react';
import PropTypes from 'prop-types';

class MazeGrid extends React.PureComponent {
  render() {
    const grid = this.props.grid;


    const rect = [];

    for (const key in grid) {
      const cell = grid[key];

      if (cell.border_right) {
        rect.push(
            <rect key={key + '1'} className="maze--border"
              x={cell.border_right.x}
              y={cell.border_right.y}
              width={cell.border_right.width}
              height={cell.border_right.height} />
        );
      }

      if (cell.border_down) {
        rect.push(
            <rect key={key + '2'} className="maze--border"
              x={cell.border_down.x}
              y={cell.border_down.y}
              width={cell.border_down.width}
              height={cell.border_down.height} />);
      }

      if (cell.type == 'exit') {
        rect.push(
            <rect key={key + '3'} className="maze--exit"
              x={cell.x}
              y={cell.y}
              width={cell.width}
              height={cell.height} />);
      }

      if (cell.type == 'border') {
        rect.push(
            <rect key={key + '3'} className="maze--border"
              x={cell.x}
              y={cell.y}
              width={cell.width}
              height={cell.height} />);
      }
    }

    return (
      <g>{ rect }</g>
    );
  }
}

MazeGrid.propTypes = {
  grid: PropTypes.object.isRequired,
};

export default MazeGrid;

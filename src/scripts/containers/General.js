import React from 'react';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import setting from '../constants/index';
import { isShowMenuSelector, isShowMazeSelector } from '../selectors';
import { showSettings } from '../actions/index';

import Maze from './Maze';
import Menu from './Menu';


class General extends React.Component {
  render() {
    const { isShowMenu, isShowMaze } = this.props;

    return (
      <div>
        { isShowMenu && <Menu /> }
        { isShowMaze && <Maze /> }
      </div>
    );
  }
}

const mapStateToProps = createPropsSelector({
  isShowMenu: isShowMenuSelector,
  isShowMaze: isShowMazeSelector,
});

export default connect(mapStateToProps, {})(General);



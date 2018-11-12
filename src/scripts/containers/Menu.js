import React from 'react';
import { connect } from 'react-redux';
import setting from '../constants/index';
import { showMaze } from '../actions/general';

const mapDispatchToProps = (state) => {
  const { dispatch, menu } = state;
  return {
    dispatch,
    menu,
  };
};

class Menu extends React.Component {
  constructor() {
    super();
  }


  _handlerShowMaze() {
    const { dispatch } = this.props;
    dispatch(showMaze());
  }

  render() {
    const { menu } = this.props;

    return (
      <div className="menu">
        <div className="menu--stars"></div>
        <div className="menu--stars2"></div>
        <div className="menu--stars3"></div>

        <menu className="menu--list">
          <div className="menu--list--item">
            <a href="javascript: void(0);"
              onClick={ () => this._handlerShowMaze() }>
              Начать
            </a>
          </div>
        </menu>
      </div>
    );
  }
}


Menu = connect(
    mapDispatchToProps)(Menu);

export default Menu;



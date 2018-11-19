import React from 'react';
import { DIRECTION_MOVE } from '../constants/general'

class Ctrl extends React.PureComponent {
  constructor(){
    super();
    this.handlerClick = this.handlerClick.bind(this);
  }
  handlerClick(event) {
    const { handlerMoveOfUser } = this.props;
    const direction = event.currentTarget.dataset.direction;
    console.log(direction);
    if (DIRECTION_MOVE[direction]) {
      handlerMoveOfUser(DIRECTION_MOVE[direction].moveX, DIRECTION_MOVE[direction].moveY);
    }
  }
  render() {
    return (
      <div className="ctrl">
        <button className='ctrl--arrow ctrl--arrow__top' type="button" data-direction='top' onClick={this.handlerClick}>&#9650;</button>
        <button className='ctrl--arrow ctrl--arrow__bottom' type="button" data-direction='bottom' onClick={this.handlerClick}>&#9660;</button>
        <button className='ctrl--arrow ctrl--arrow__right' type="button" data-direction='right' onClick={this.handlerClick}>&#9658;</button>
        <button className='ctrl--arrow ctrl--arrow__left' type="button" data-direction='left' onClick={this.handlerClick}>&#9668;</button>
      </div>
    );
  }
}

export default Ctrl;

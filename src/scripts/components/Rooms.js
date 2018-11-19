import React, { Fragment } from 'react';
import connect from 'react-redux/es/connect/connect';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { postRoom, putRoom, updateRoomAction } from '../actions/general';
import { getCurrentRoomSelector, getCurrentUser } from '../selectors';
import Maze from '../actions/maze';
import setting from '../constants';
import RoomList from './RoomList';
import RoomForm from './RoomForm';
import Room from './Room';
import { COLOR_DEFAULT } from '../constants/colors';
import { createMathAction } from '../actions';
import { showLoader } from '../helpers';

class Rooms extends React.PureComponent {
  constructor() {
    super();
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.connectToRoom = this.connectToRoom.bind(this);
  }
  handlerSubmit(event) {
    event.preventDefault();
    showLoader();
    const { handlerPostRoom } = this.props;
    const elements = event.currentTarget;
    const size= elements['size'].value;
    const title= elements['title'].value;
    const grid = Maze.createGrid(
        size, // setting.maze.cellWidth,
        size, // setting.maze.cellHeight,
        setting.maze.borderWidth,
        setting.maze.scale,
        setting.maze.cellCount,
    );
    handlerPostRoom({
      title,
      grid: {
        title,
        content: JSON.stringify(grid),
        size,
      },
    });
  }
  connectToRoom(roomHash) {
    const { handlerUpdateRoom, user } = this.props;
    handlerUpdateRoom({
      hash: roomHash,
      body: {
        users: [{
          nickname: user.nickname,
          hash: user.hash,
          color: COLOR_DEFAULT.hex,
          ready: false,
        }],
      },
    });
  }
  render() {
    const { room, user, handlerUpdateRoom, handlerUpdateRoomLocal, handlerCreateMath, handlerShowMaze } = this.props;
    return (
      <div className="rooms">
        {room ?
          <Room room={room} user={user} handlerUpdateRoom={handlerUpdateRoom} handlerUpdateRoomLocal={handlerUpdateRoomLocal} handlerCreateMath={handlerCreateMath} handlerShowMaze={handlerShowMaze}/>
          :
          <Fragment>
            <RoomList user={user} handlerConnectToRoom={this.connectToRoom} />
            <RoomForm handlerSubmit={this.handlerSubmit}/>
          </Fragment>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handlerPostRoom(body) {
    dispatch(postRoom(body));
  },
  handlerUpdateRoom(params) {
    dispatch(putRoom(params));
  },
  handlerUpdateRoomLocal(params) {
    dispatch(updateRoomAction(params));
  },
  handlerCreateMath(params) {
    dispatch(createMathAction(params));
  },
});


const mapStateToProps = createPropsSelector({
  room: getCurrentRoomSelector,
  user: getCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);

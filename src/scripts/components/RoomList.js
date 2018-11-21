import React, { Fragment } from 'react';
import connect from 'react-redux/es/connect/connect';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { SIZES, WS_ROOMS_URL } from '../constants/general';
import { setRoomsToStore } from '../actions/general';
import { getRoomsSelector } from '../selectors';
import { showLoader, hideLoader } from '../helpers';


class RoomList extends React.PureComponent {
  componentDidMount() {
    this.initWebSocketForListRooms();
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.removeWebSocket();
  }
  removeWebSocket() {
    if (this.ws.readyState === this.ws.OPEN){
      return this.ws.close();
    }
  }
  initWebSocketForListRooms() {
    const { handlerSetRoom, user } = this.props;
    showLoader();
    this.ws = new WebSocket(WS_ROOMS_URL, user.token);
    this.ws.onopen = (response) => {
      hideLoader();
    };
    this.ws.onclose = () => {
      console.log("Disconnected");
    };
    this.ws.onmessage = (response) => {
      hideLoader();
      const { type, value } = JSON.parse(response.data);
      if (type === 'ALL_ROOMS') {
        handlerSetRoom(value);
      }
    };
  }
  async goIntoRoom(hash) {
    const { handlerConnectToRoom } = this.props;
    showLoader();
    await this.removeWebSocket();
    this.props.handlerConnectToRoom(hash);
  }
  render() {
    const { rooms, handlerConnectToRoom } = this.props;
    if (Array.isArray(rooms) && rooms.length) {
      return (
        <Fragment>
          <h5 className='rooms--title'>
            Комнаты
          </h5>
          <ul className="rooms--list">
            <li className="rooms--list--item rooms--list--item__header">
              <span>Наз.</span>
              <span>Размер</span>
              <span>Кол.</span>
              <span></span>
            </li>
            {rooms.map((room) => (
              <li key={room.hash} className="rooms--list--item">
                <span>{room.title}</span>
                {SIZES.map((size) => {
                  if (parseInt(room.gridSize, 10) === parseInt(size.value, 10)) {
                    return <span key={size.value}>{size.title}</span>;
                  }
                })}
                <span>{room.users.length}</span>
                <span>
                  <button className="button" onClick={() => this.goIntoRoom(room.hash)}>&raquo;</button>
                </span>
              </li>
            ))}
          </ul>
        </Fragment>
      );
    }
    return <Fragment />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  handlerSetRoom(rooms) {
    dispatch(setRoomsToStore(rooms));
  },
});


const mapStateToProps = createPropsSelector({
  rooms: getRoomsSelector,
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);

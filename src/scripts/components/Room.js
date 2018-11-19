import React, { Fragment } from 'react';
import { COLORS } from '../constants/colors';
import { SIZES, WS_ROOM_URL } from '../constants/general';


class Room extends React.PureComponent {
  constructor() {
    super();
    this.changeColor = this.changeColor.bind(this);
    this.changeReady = this.changeReady.bind(this);
    this.getOutFromRoom = this.getOutFromRoom.bind(this);
    this.startGame = this.startGame.bind(this);
  }
  componentDidMount() {
    this.initWebSocketForRoom();
  }
  componentWillUnmount() {
    this.ws.close();
  }
  initWebSocketForRoom() {
    const { room, user, handlerUpdateRoomLocal, handlerCreateMath, handlerShowMaze } = this.props;
    this.ws = new WebSocket(`${WS_ROOM_URL}/${room.hash}`, user.token);
    this.ws.onclose = () => {
      console.log('Disconnected');
    };
    this.ws.onmessage = (response) => {
      const { type, value } = JSON.parse(response.data);
      if (type === 'UPDATE_ROOM') {
        handlerUpdateRoomLocal(value);
      } else if (type === 'STARTING') {
        const { enemies, mazeHash, grid } = value;
        handlerUpdateRoomLocal(null);
        handlerCreateMath(
            {
              enemies: enemies.filter((enemy) => (enemy.hash !== user.hash)),
              user: enemies.find((_user) => (_user.hash === user.hash)),
              mazeHash,
              grid: {
                title: grid.title,
                content: JSON.parse(grid.content),
                size: grid.size,
              },
            }
        );
        handlerShowMaze();
      }
    };
  }
  changeColor(event) {
    const color = event.currentTarget.value;
    this.changeUserInRoom({ color });
  }
  changeReady(event) {
    const ready = event.currentTarget.checked;
    this.changeUserInRoom({ ready });
  }
  changeUserInRoom(properties) {
    const { handlerUpdateRoom, room, user } = this.props;
    const currentUser = room.users.find((_user) => (_user.hash === user.hash));
    handlerUpdateRoom({
      hash: room.hash,
      body: {
        users: [{
          ...currentUser,
          ...properties,
        }],
      },
    });
  }
  startGame() {
    this.ws.send(JSON.stringify({
      type: 'LETS_START',
    }));
  }
  getOutFromRoom() {
    const { handlerUpdateRoomLocal } = this.props;
    handlerUpdateRoomLocal(null);
  }
  render() {
    const { room, user } = this.props;
    return (
      <div className="room">
        <h4 className="room--title">{ room.title }</h4>
        <div className="room--size">
          Размер:
          {SIZES.map((size) => {
            if (parseInt(room.gridSize, 10) === parseInt(size.value, 10)) {
              return size.title;
            }
          })}
        </div>
        <ul className="rooms--list">
          <li className="rooms--list--item rooms--list--item__header">
            <span>Игрок</span>
            <span>Цвет</span>
            <span>Готовность</span>
          </li>
          {Array.isArray(room.users) && room.users.sort((userPrev, userNext) => (userPrev.nickname.localeCompare(userNext.nickname))).map((_user) => {
            const isCurrentUser = _user.hash === user.hash;
            return (<li key={_user.hash} className={`rooms--list--item ${isCurrentUser ? 'rooms--list--item__active' : ''}`}>
              <span>{_user.nickname}</span>
              <span>
                {isCurrentUser ? <select onChange={this.changeColor} value={_user.color} className="room--select select">
                  {COLORS.map((color, idx) => (
                    <option key={idx} value={color.hex} style={{color: color.hex, backgroundColor: 'black'}}>
                      { color.title }
                    </option>
                  ))}
                </select> : <i className="rooms--list--item--color" style={{ backgroundColor: _user.color }}></i>
                }
              </span>
              <span>
                {
                  isCurrentUser ? <input type="checkbox" className="checkbox" value={_user.ready} checked={_user.ready} onChange={this.changeReady}/> : _user.ready ? <span>&#10004;</span> : <span>&#10008;</span>
                }
              </span>
            </li>);
          })}
        </ul>
        {user.hash === room.userHash ?
          <Fragment>
            <button type="button" className="button" onClick={this.getOutFromRoom}>
              Закрыть комнату
            </button>
            <button type="button" className={`button button__start ${room.users.every((user) => (user.ready)) ? '' : 'button__disabled'}`} onClick={this.startGame}>
              Старт
            </button>
          </Fragment> :
          <div className="text-center">
            <button type="button" className="button" onClick={this.getOutFromRoom}>
              Выйти из комнаты
            </button>
          </div>
        }
      </div>
    );
  }
}

export default Room;

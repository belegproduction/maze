import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
  createPlayerAction,
  putDistanceTraveledAction,
  updateEnemiesAction,
  movePlayer,
  checkPosition } from '../actions/index';
import MazeGrid from '../components/MazeGrid';
import Enemy from '../components/MazeEnemy';
import Player from '../components/MazePlayer';
import Path from '../components/MazePath';
import setting from '../constants/index';
import { scrollToAnimation } from '../utilities/index';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { getGrid, getPlayer, getPath, getEnemies, getMazeHash, getCurrentUser } from '../selectors';
import { WS_MATH_URL } from '../constants/general';

class Maze extends React.Component {
  constructor() {
    super();
    this.canPlayerMove = true;
  }
  componentDidMount() {
    this.initWebSocketForRoom();
    this._handlerOnKeyDown();
    this.handlerCreatePlayer();
  }
  handlerCreatePlayer() {
    const { createPlayer, user } = this.props;
    if (this.ws.readyState === this.ws.OPEN) {
      createPlayer(this.ws, user);
    } else {
      setTimeout(() => (this.handlerCreatePlayer()), 300);
    }
  }
  initWebSocketForRoom() {
    const { mazeHash, user } = this.props;
    this.ws = new WebSocket(`${WS_MATH_URL}/${mazeHash}`, user.token);
    this.ws.onclose = () => {
      console.log("Disconnected Maze");
    };
    this.ws.onmessage = (response) => {
      const { updateEnemies, player, enemies, user } = this.props;
      const { type, value } = JSON.parse(response.data);
      console.log(type, value);
      if (type === 'CREATE_PLAYER') {
        if (value && user.hash !== value.player.hash) {
          updateEnemies(enemies.map((enemy) => {
            if (enemy.hash === value.player.hash) {
              return {
                ...enemy,
                ...value.player,
              };
            }
            return enemy;
          }));
        }
      } else if (type === 'GO_PLAYER') {
        if (value && player.hash !== value.player.hash) {
          updateEnemies(enemies.map((enemy) => {
            if (enemy.hash === value.player.hash) {
              return {
                ...enemy,
                ...value.player,
              };
            }
            return enemy;
          }));
        }
      } else if (type === 'GAME_OVER') {
        if (user.hash !== value.userHash) {
          alert('Ксожалению, Вы проиграли!');
          location.reload();
        }
      } else if (type === 'CLOSE') {
        alert('Противник сбежал!');
        location.reload();
      }
    };
  }

  _handlerOnKeyDown() {
    document.addEventListener('keydown', (event) => {
      if (36 < event.keyCode && 41 > event.keyCode && this.canPlayerMove) {
        const { player, grid, user } = this.props;

        const moveX = (event.keyCode - 38) % 2;


        const moveY = (event.keyCode - 39) % 2;

        const check = checkPosition(
            player,
            grid,
            moveX,
            moveY);

        if (check) {
          if (check == 'exit') {
            this.ws.send(JSON.stringify({
              type: 'GAME_OVER',
              value: {
                userHash: user.hash,
              },
            }));
            alert('Это победа, Вы словно Тесей!');
            location.reload();
          }

          this.props.handlerMove(
              player,
              grid,
              moveX,
              moveY, this.ws, user.hash);

          this.props.putDistanceTraveled(player,
              grid,
              moveX,
              moveY);

          // this.canPlayerMove = false;
          // setTimeout(() => {
          //   this._setScrollPosition();
          //   this.canPlayerMove = true;
          // }, 250);
          this._setScrollPosition();
          // this.canPlayerMove = true;
        }

        event.preventDefault();
      }
    });
  }

  _setScrollPosition() {
    // возвращает координаты обьекта с учетом прокрутки страницы
    const playerCord = ReactDOM.findDOMNode(this.refs.player).offset();

    // определяет следущее состояние прокрутки
    let x = playerCord.left - window.innerWidth / 2;
    let y = playerCord.top - window.innerHeight / 2;

    if (x < 0) x = 0;
    if (y < 0) y = 0;

    scrollToAnimation(x, y, 20);
  }

  render() {
    const { grid, player, path, enemies } = this.props;

    return (
      <div>
        {
          grid &&
            <svg id="maze" className="maze"
              width={ setting.maze.width }
              height={ setting.maze.height } >
              <MazeGrid grid={ grid } />
              <Path path={ path }/>
              {
                Array.isArray(enemies) && enemies.map((enemy) => (
                  <Enemy key={enemy.hash} enemy={ enemy } />
                ))
              }
              <Player player={ player }
                ref="player" />
            </svg>
        }
      </div>
    );
  }
}

const mapStateToProps = createPropsSelector({
  grid: getGrid,
  player: getPlayer,
  path: getPath,
  mazeHash: getMazeHash,
  enemies: getEnemies,
  user: getCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  createPlayer(ws, user) {
    dispatch(createPlayerAction(ws, user));
  },
  updateEnemies(enemies) {
    dispatch(updateEnemiesAction(enemies));
  },
  handlerMove(obj, grid, moveX, moveY, ws, hash) {
    dispatch(movePlayer(obj, grid, moveX, moveY, ws, hash));
  },
  putDistanceTraveled(obj, grid, moveX, moveY) {
    dispatch(putDistanceTraveledAction(obj, grid, moveX, moveY));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Maze);

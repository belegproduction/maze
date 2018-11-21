import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
  createPlayerAction,
  updateEnemiesAction,
  movePlayer,
  checkPosition } from '../actions/index';
import MazeGrid from '../components/MazeGrid';
import Enemy from '../components/Enemy';
import Player from '../components/MazePlayer';
import Path from '../components/MazePath';
import Ctrl from '../components/Ctrl';
import { scrollToAnimation } from '../utilities/index';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { getGrid, getPlayer, getPath, getEnemies, getMazeHash, getCurrentUser } from '../selectors';
import { WS_MATH_URL, IS_MOBILE } from '../constants/general';
import maze from '../constants/maze';
import { showLoader, hideLoader, overHiddenBody, overVissibleBody } from '../helpers';
import playerDefault from '../constants/player';

class Maze extends React.Component {
  constructor() {
    super();
    this.canPlayerMove = true;
    this.handlerMoveOfUser = this.handlerMoveOfUser.bind(this);
    overHiddenBody();
    document.head.querySelector('[name="viewport"]').remove();
  }
  componentDidMount() {
    scrollToAnimation(0, 0);
    this.initWebSocketForRoom();
    this._handlerOnKeyDown();
    this.handlerCreatePlayer();
  }
  componentWillUnmount() {
    overVissibleBody();
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
    showLoader();
    this.ws = new WebSocket(`${WS_MATH_URL}/${mazeHash}`, user.token);
    this.ws.onclose = () => {
      console.log("Disconnected Maze");
    };
    this.ws.onopen = () => {
      hideLoader();
    };
    this.ws.onmessage = (response) => {
      const { updateEnemies, player, enemies, user } = this.props;
      const { type, value } = JSON.parse(response.data);
      if (type === 'CREATE_PLAYER') {
        if (value && user.hash !== value.player.hash) {
          updateEnemies(enemies.map((enemy) => {
            if (enemy.hash === value.player.hash) {
              return {
                ...enemy,
                ...value.player,
                path: [value.player.pathPart],
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
                ...playerDefault,
                ...enemy,
                ...value.player,
                path: Array.isArray(enemy.path) ? [...enemy.path, value.player.pathPart] : [value.player.pathPart],
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
  handlerMoveOfUser(moveX, moveY) {
    if (this.canPlayerMove) {
      const { player, grid:{ content }, user, handlerMove } = this.props;
      const check = checkPosition(
          player,
          content,
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
        handlerMove(
            player,
            content,
            moveX,
            moveY, this.ws, user.hash);
        this.canPlayerMove = false;
        setTimeout(() => {
          this._setScrollPosition();
          this.canPlayerMove = true;
        }, 230);
      }
    }
  }

  _handlerOnKeyDown() {
    document.addEventListener('keydown', (event) => {
      if (36 < event.keyCode && 41 > event.keyCode) {
        const moveX = (event.keyCode - 38) % 2;
        const moveY = (event.keyCode - 39) % 2;
        this.handlerMoveOfUser(moveX, moveY);
        event.preventDefault();
      }
    });
  }

  _setScrollPosition() {
    // возвращает координаты обьекта с учетом прокрутки страницы
    const playerCord = ReactDOM.findDOMNode(this.refs.player).offset();
    let x, y;
    if (IS_MOBILE) {
      if (window.innerWidth < window.innerHeight) {
        x = playerCord.left - window.innerWidth / 2;
        y = playerCord.top - window.innerHeight / 4;
      } else {
        x = playerCord.left - window.innerWidth / 4;
        y = playerCord.top - window.innerHeight / 2;
      }
    } else {
      // определяет следущее состояние прокрутки
      x = playerCord.left - window.innerWidth / 2;
      y = playerCord.top - window.innerHeight / 2;
    }
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    scrollToAnimation(x, y, 20);
  }

  render() {
    const { grid, player, path, enemies } = this.props;

    return (
      <div>
        {
          grid && Object.keys(grid).length &&
            <svg id="maze" className={`maze ${IS_MOBILE ? 'maze__is-mobile' : ''}`}
              width={ maze.scale * grid.size + maze.borderWidth }
              height={ maze.scale * grid.size + maze.borderWidth }
              style={{
                marginRight: window.innerWidth / 2,
                marginBottom: window.innerHeight / 2,
              }}>
              <MazeGrid grid={ grid.content } />
              {
                Array.isArray(enemies) && enemies.map((enemy) => (
                  <Enemy key={enemy.hash} enemy={ enemy } />
                ))
              }
              <Path path={ path } color={player.color}/>
              <Player player={ player }
                ref="player" />
            </svg>
        }
        <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=no" />
        {IS_MOBILE && <Ctrl handlerMoveOfUser={this.handlerMoveOfUser}/>}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Maze);

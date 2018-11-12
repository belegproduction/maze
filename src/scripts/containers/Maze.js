import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
  createGridAction,
  createPlayerAction,
  putDistanceTraveledAction,
  updateEnemiesAction,
  movePlayer,
  saveGridAction,
  checkPosition } from '../actions/index';
import MazeGrid from '../components/MazeGrid';
import Enemy from '../components/MazeEnemy';
import Player from '../components/MazePlayer';
import Path from '../components/MazePath';
import setting from '../constants/index';
import { scrollToAnimation } from '../utilities/index';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { getGrid, getPlayer, getPath, getEnemies } from '../selectors';


class Maze extends React.Component {
  constructor() {
    super();
    this.canPlayerMove = true;
    this.ws = new WebSocket(`ws://${location.host}/api/game`);
    
    this.ws.onopen = (response) => {
    
    };
  
    this.ws.onclose = () => {
      console.log("Disconnected");
    };
  
    this.ws.onmessage = (response) => {
      const { createGrid, saveGrid, updateEnemies, player, enemies } = this.props;
      const { type, value } = JSON.parse(response.data);
      console.log(response, value);
      if (type === 'CONNECT') {
        if (value.grid) {
          saveGrid(value.grid);
        } else {
          createGrid(this.ws);
        }
        
        if(Array.isArray(enemies)) {
          updateEnemies([...enemies, ...value.enemies]);
        }
        
      } else if (type === 'CREATE_PLAYER') {
        if (value && player.id !== value.player.id) {
          updateEnemies([...enemies, value.player]);
        }
      } else if (type === 'GO_PLAYER') {
        if (value && player.id !== value.player.id) {
          updateEnemies(enemies.map((enemy) => {
            if (enemy.id === value.player.id) {
              return {
                ...enemy,
                ...value.player,
              };
            }
            return enemy;
          }));
        }
      } else if (type === 'GAME_OVER') {
        if (player.id !== value.playerId) {
          alert('Ксожалению, Вы проиграли!');
          location.reload();
        }
      }
    };
  }

  componentDidMount() {
    this._handlerOnKeyDown();
  }

  _handlerOnKeyDown() {
    document.addEventListener('keydown', (event) => {
      if (36 < event.keyCode && 41 > event.keyCode && this.canPlayerMove) {
        const { player, grid } = this.props;

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
                playerId: player.id,
              },
            }));
            alert('Это победа, Вы словно Тесей!');
            
            location.reload();
          }

          this.props.handlerMove(
              player,
              grid,
              moveX,
              moveY, this.ws);

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
    const { grid, player, createPlayer, path, enemies } = this.props;

    return (
      <div>
        {
          grid &&
            <svg id="maze" className="maze"
              width={ setting.maze.width }
              height={ setting.maze.height } >
              <MazeGrid grid={ grid } />
              <Path path={ path }/>
              <Player
                create={ () => createPlayer(this.ws) }
                player={ player }
                ref="player"
                grid={ grid }/>
              {
                enemies.map((enemy) => (
                  <Enemy key={enemy.id} enemy={ enemy } />
                ))
              }
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
  enemies: getEnemies,
});

const mapDispatchToProps = (dispatch) => ({
  createGrid(ws) {
    dispatch(createGridAction(ws));
  },
  saveGrid(grid) {
    dispatch(saveGridAction(grid));
  },
  createPlayer(ws) {
    dispatch(createPlayerAction(ws));
  },
  updateEnemies(enemies) {
    dispatch(updateEnemiesAction(enemies));
  },
  handlerMove(obj, grid, moveX, moveY, ws) {
    dispatch(movePlayer(obj, grid, moveX, moveY, ws));
  },
  putDistanceTraveled(obj, grid, moveX, moveY) {
    dispatch(putDistanceTraveledAction(obj, grid, moveX, moveY));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Maze);

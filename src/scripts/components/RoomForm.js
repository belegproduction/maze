import React from 'react';

class RoomList extends React.PureComponent {
  render() {
    const { handlerSubmit } = this.props;
    return (
      <div className="rooms--add">
        <h4 className="rooms--title rooms--title__sub">Создать комнату</h4>
        <form method="POST" onSubmit={handlerSubmit}>
          <div className="rooms--add--list">
            <div className="rooms--add--list--item">
              <div className='input--title'>
                Наименование
              </div>
              <input type="text" name="title" className="rooms--add--input input" placeholder="Лабиринт" required/>
            </div>
            <div className="rooms--add--list--item rooms--add--list--item__size">
              <div className='input--title'>
                Размер
              </div>
              <input type="number" name="size" className="rooms--add--input input" placeholder="10" max="200" min="10" required/>
            </div>
            <div className="rooms--add--list--item rooms--add--list--item__button">
              <button type="submit" className="rooms--add--button button">
                Создать
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RoomList;

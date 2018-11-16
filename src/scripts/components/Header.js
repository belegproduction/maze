import React from 'react';


class Header extends React.PureComponent {
  render() {
    const { nickname, handlerLogout } = this.props;
    return (
      <div className="header">
        <div className="header--nickname">
          Привет, <b>{ nickname }</b>
          <button type="button" className="button" onClick={handlerLogout}>
            Выйти
          </button>
        </div>
      </div>
    );
  }
}

export default Header;

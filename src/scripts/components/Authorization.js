import React from 'react';
import { SIGN_UP } from '../constants/authorization';


class Authorization extends React.PureComponent {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    const { typeForm, handlerOnSubmit } = this.props;
    const elements = event.currentTarget.elements;
    handlerOnSubmit({
      typeForm,
      nickname: elements['nickname'].value,
      password: elements['password'].value,
    });
  }
  render() {
    const { typeForm, handlerToggleForm } = this.props;
    return (
      <div className="authorization">
        <h5 className='authorization--title'>
          {typeForm === SIGN_UP ? 'Регистрация' : 'Авторизация'}
        </h5>
        <form method="POST" onSubmit={this.onSubmit}>
          <label className='input--title' htmlFor="authorization-nickname">
            Введите никнейм
          </label>
          <input id="authorization-nickname" type="text" name="nickname" className="authorization--input input" placeholder="Тесей"/>
          <label className='input--title' htmlFor="authorization-password">
            Введите пароль
          </label>
          <input id="authorization-password" type="password" name="password" className="authorization--input input"/>
          <button type="submit" className="authorization--button button">
            Отправить
          </button>
        </form>
        <a href="#" className="authorization--toggle" onClick={handlerToggleForm}>
          {typeForm === SIGN_UP ? 'Авторизоваться' : 'Регистрироватся'}
        </a>
      </div>
    );
  }
}

export default Authorization;

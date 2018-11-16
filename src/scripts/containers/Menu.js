import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { getTypeOfForm, getCurrentUser } from '../selectors';
import Authorization from '../components/Authorization';
import Header from '../components/Header';
import Rooms from '../components/Rooms';
import { SIGN_UP, SIGN_IN } from '../constants/authorization';
import { changeTypeForm, showMaze } from '../actions/general';
import { loginUser, getCurrentUserAction, registration, logout,  } from '../actions/user';

class Menu extends React.PureComponent {
  constructor() {
    super();
    this.onSubmitAuthorization = this.onSubmitAuthorization.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }
  onSubmitAuthorization(data) {
    const { handlerLogin, handlerRegistration, typeForm } = this.props;
    const { nickname, password } = data;
    console.log(typeForm);
    if (typeForm === SIGN_IN) {
      handlerLogin({
        nickname,
        password,
      });
    } else if (typeForm === SIGN_UP) {
      handlerRegistration({
        nickname,
        password,
      });
    }
  }
  toggleForm() {
    const { handlerChangeTypeForm, typeForm } = this.props;
    handlerChangeTypeForm(typeForm ===SIGN_UP ? SIGN_IN : SIGN_UP);
  }
  componentDidMount() {
    const { handlerGetCurrentUser } = this.props;
    if (localStorage.getItem('token')) {
      handlerGetCurrentUser();
    }
  }

  render() {
    const { typeForm, user, handlerLogout, handlerShowMaze } = this.props;

    return (
      <div className="menu">
        <div className="menu--stars"></div>
        <div className="menu--stars2"></div>
        <div className="menu--stars3"></div>
        {user.hash ?
          <Fragment>
            <Header nickname={user.nickname} handlerLogout={handlerLogout}/>
            <Rooms handlerShowMaze={handlerShowMaze} />
          </Fragment>
          :
          <Authorization typeForm={typeForm} handlerOnSubmit={this.onSubmitAuthorization} handlerToggleForm={this.toggleForm}/>
        }
        {/*<menu className="menu--list">*/}
          {/*<div className="menu--list--item">*/}
            {/*<a href="javascript: void(0);"*/}
              {/*onClick={ () => this._handlerShowMaze() }>*/}
              {/*Начать*/}
            {/*</a>*/}
          {/*</div>*/}
        {/*</menu>*/}
        <div className="copy">Спасибо Эллеру за это!</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handlerChangeTypeForm(typeForm) {
    dispatch(changeTypeForm(typeForm));
  },
  handlerLogin(body) {
    dispatch(loginUser(body));
  },
  handlerGetCurrentUser() {
    dispatch(getCurrentUserAction());
  },
  handlerRegistration(body) {
    dispatch(registration(body));
  },
  handlerLogout() {
    dispatch(logout());
  },
  handlerShowMaze() {
    dispatch(showMaze());
  },
});


const mapStateToProps = createPropsSelector({
  typeForm: getTypeOfForm,
  user: getCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);



const menu = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_SETTINGS':
      return Object.assign({}, state, {
        is_show: false,
      });
    default:
      return state;
  }
};

export default menu;

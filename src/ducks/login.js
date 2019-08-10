import loginService from '../services/login';

export const actionTypes = {
  login: 'login/SET_USUARIO',
  logout: 'login/LOGOUT'
};

export const actionCreators = {
  logar(login, senha) {
    return dispatch => {
      return loginService.logar(login, senha)
        .then(() => {
          dispatch({
            type: actionTypes.login,
            usuarioTag: login
          });
        })
    }
  },

  logout() {
    return { type: actionTypes.logout };
  }
}

export const initialState = {
  usuarioTag: ''
};

export const actionHandler = {
  [actionTypes.login]: (state, action) => ({
    ...state,
    usuarioTag: action.usuarioTag
  }),

  [actionTypes.logout]: () => initialState
}

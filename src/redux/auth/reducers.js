import actions from './actions'

const initialState = {
  loading: false,
  logged_in: false,
  token: null,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGGIN_ASYNC:
      return { ...state, logged_in: true }

    case actions.SET_STATE:
      return { ...state, ...action.payload }

    case actions.LOGGOUT_ASYNC:
      return {
        ...state,
        logged_in: false,
        token: null,
      }
    case actions.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      }
    case actions.TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      }

    default:
      return state
  }
}

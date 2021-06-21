import actions from './actions'

export const initialState = {
  code: '',
  message: '',
  errors: [],
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case actions.CLEAR_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.key]: null,
        },
      }

    case actions.CLEAR_ALL_ERRORS:
      return {
        ...state,
        errors: [],
      }

    default:
      return state
  }
}
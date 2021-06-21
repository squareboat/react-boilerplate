import { all, takeEvery, put, call } from 'redux-saga/effects'

import actions from './actions'
import { initialState } from './reducers'

export function* CLEAR_ERROR() {
  yield put({
    type: actions.SET_STATE,
    payload: initialState,
  })
}

export default function* rootSaga() {
  yield all([takeEvery(actions.SET_STATE, CLEAR_ERROR)])
}
import { all } from 'redux-saga/effects'
import auth from './auth/sagas'
import user from './user/sagas'
import error from './error/sagas'

export default function* rootSaga() {
    yield all([
      auth(),
      error()
    ])
  }
  
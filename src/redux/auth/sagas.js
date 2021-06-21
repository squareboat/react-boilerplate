import { all, takeEvery, put, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { notification } from 'antd'
import Login from '../../services/auth'
import { get } from 'lodash'
import actions from './actions'
import errorActions from '../error/actions'
import userActions from '../user/actions'

export function* WATCH_LOGGIN(action) {
  yield put({
    type: actions.TOGGLE_LOADING,
  })

  const response = yield call(Login, {
    email: action.payload.email,
    password: action.payload.password,
  })
  console.log('request payload', action.payload)
  try{
      if (response) {
        if (response.data.success) {
          yield put({
            type: actions.SET_TOKEN,
            payload: {
              token: response.data.data.token,
            },
          })
          yield put({
            type: userActions.SET_STATE,
            payload: response.data.data.user,
          })
          yield put({
            type: actions.LOGGIN_ASYNC,
          })
        //   yield put(push('/dashboard/home'))
        } else {
          yield put({
            type: errorActions.SET_STATE,
            payload: response.data,
          })
        }
      }
      yield put({
        type: actions.TOGGLE_LOADING,
      })
  }catch{
    yield put({
        type: actions.TOGGLE_LOADING,
      })
  }
}

// export function* WATCH_LOGOUT() {
// //   const response = yield call(Logout, {})
//   if (response.data.success) {
//     yield put({
//       type: userActions.LOGOUT,
//     })
//     notification.success({
//       message: 'Success !',
//       description: 'Logged Out Success',
//     })
//     yield put({
//       type: actions.LOGGOUT_ASYNC,
//     })
//   }
// }

// export function* WATCH_UNAUTORIZED() {
//   yield put({
//     type: actions.LOGGOUT_ASYNC,
//   })
//   yield put(push('/'))
// }

// export function* WATCH_SEND_RESET_LINK(action) {
//   yield put({
//     type: actions.SET_STATE,
//     payload: {
//       loading: true,
//     },
//   })

//   const response = yield call(resetLink, action.payload)
//   try {
//     if (response.data.success) {
//       notification.success({
//         message: 'Success !',
//         description: get(response, 'data.message', 'Reset Link Send To Email'),
//       })
//     } else {
//       yield put({
//         type: errorActions.SET_STATE,
//         payload: response.data,
//       })
//       notification.warning({
//         message: 'Failure !',
//         description: get(response, 'data.message', 'Something Went Wrong'),
//       })
//     }
//   } catch {
//     yield put({
//       type: actions.SET_STATE,
//       payload: {
//         loading: false,
//       },
//     })
//   }
//   yield put({
//     type: actions.SET_STATE,
//     payload: {
//       loading: false,
//     },
//   })
// }

// export function* WATCH_RESET_PASSWORD(action) {
//   yield put({
//     type: actions.SET_STATE,
//     payload: {
//       loading: true,
//     },
//   })

//   const response = yield call(resetPassword, action.payload)
//   try {
//     if (response.data.success) {
//       yield put(push('/'))
//       notification.success({
//         message: 'Success !',
//         description: get(response, 'data.message', 'Reset Link Send To Email'),
//       })
//     } else if (response.data.code === 422) {
//       yield put({
//         type: errorActions.SET_STATE,
//         payload: response.data,
//       })
//       notification.warning({
//         message: 'Failure !',
//         description: get(response, 'data.message', 'Something Went Wrong'),
//       })
//     }
//   } catch {
//     yield put({
//       type: actions.SET_STATE,
//       payload: {
//         loading: false,
//       },
//     })
//   }

//   yield put({
//     type: actions.SET_STATE,
//     payload: {
//       loading: false,
//     },
//   })
// }

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGGIN, WATCH_LOGGIN),
  ])
}

import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'authType',
    storage,
    whitelist:['user']
}

export default persistConfig
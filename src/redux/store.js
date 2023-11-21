import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import statusReducer from './reducer/statusReducer';
import userReducer from './reducer/userReducer';

const userPersistConfig = {
    key: 'user',
    storage,
    whitelist: ['account', 'isAuthenticated'] //only persist account
}

const statusPersistConfig = {
    key: 'status',
    storage,
    whitelist: ['userStatus', 'isAuthenticated'] //only persist userStatus
}

//combine
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'status'] //exclude all the three
}

//apply presist config
const presistedUserReducer = persistReducer(userPersistConfig, userReducer)
const presistedStatusReducer = persistReducer(statusPersistConfig, statusReducer)

//combine with the rest
const persistedRootReducer = combineReducers({
    user: presistedUserReducer,
    status: presistedStatusReducer,
})

//apply root config
const persistedReducer = persistReducer(persistConfig, persistedRootReducer)

//create store
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
let persistor = persistStore(store);

export { store, persistor };

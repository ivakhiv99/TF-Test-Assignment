import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import {createStore} from 'redux';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(persistedReducer);
const persistor = persistStore(store);
export {store, persistor}

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import reducer from './reducers/reducers';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, reducer)
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const store = createStore(persistedReducer,
    compose(
        applyMiddleware(thunk),
        (typeof window !== "undefined" && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__())) ||
        compose,
    ));

const persistor = persistStore(store);
export { store, persistor };
export type IRootState = ReturnType<typeof store.getState>
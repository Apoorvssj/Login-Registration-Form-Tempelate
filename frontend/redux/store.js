import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//local imports
import allReducers from "./reducers/combineReducer";

const persistConfig = {
  key: "root",
  storage,
};

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistedReducer = persistReducer(persistConfig, allReducers);

export let store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export let persistor = persistStore(store);

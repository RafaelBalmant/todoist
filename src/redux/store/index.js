import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Reducers } from "../reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, Reducers);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

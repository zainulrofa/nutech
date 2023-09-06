import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducer/authSlice";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";
import { authQuery } from "./reducer/authQuery";
import { homeQuery } from "./reducer/homeQuery";
import { transactionQuery } from "./reducer/transactionQuery";
const persistConfig = {
  storage,
  key: "root",
};

const reducer = combineReducers({
  auth: authSlice,
  [authQuery.reducerPath]: authQuery.reducer,
  [homeQuery.reducerPath]: homeQuery.reducer,
  [transactionQuery.reducerPath]: transactionQuery.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authQuery.middleware)
      .concat(homeQuery.middleware)
      .concat(transactionQuery.middleware),
});

export const persistor = persistStore(store);

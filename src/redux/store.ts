import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authSlice from "./auth";
import recipientSlice from "./recipient";
import collectionSlice from "./collections";
import paymentSlice from "./payment";
import orderSlice from "./orders";

const rootReducer = combineReducers({
  authSlice,
  recipientSlice,
  collectionSlice,
  paymentSlice,
  orderSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authSlice"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "auth/getCustomer/fulfilled",
          "auth/updateMedusaCustomerAccount/fulfilled",
          "payment/getSavedPaymentMethods/fulfilled",
          "payment/getSavedPaymentMethods/pending",
          "payment/detachPaymentMethod/fulfilled",
        ],
      },
    }),
});

export const persistor = persistStore(store);
export const getSession = () => store.getState();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

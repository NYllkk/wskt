import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import storage from "redux-persist/lib/storage"
import dataReducer, { fetchData } from "./dataSlice.js"

// import { thunk } from "redux-thunk"
import { persistReducer } from "redux-persist"
import { combineReducers } from '@reduxjs/toolkit';

const persisconfig = {
    key: "root",
    version: 1,
    storage
};
const rootreducer = combineReducers({
    data: dataReducer,
    auth: authReducer,
})
const persistReducerr = persistReducer(persisconfig, rootreducer)

export const store = configureStore({
    // auth: authReducer,

    reducer: persistReducerr,



});
store.dispatch(fetchData());
export default store


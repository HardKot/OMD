import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({})

export type RootReducer = typeof rootReducer
export type RootState = ReturnType<RootReducer>

export type TypeStore = ReturnType<typeof configureStore<RootState>>

export type AppDispatch = TypeStore['dispatch']


import { configureStore } from "@reduxjs/toolkit";
import createPageSlice from "../Components/Users/Create/createPageSlice";

export const store = configureStore({
    reducer:{
        create:createPageSlice,
    }
})

export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;
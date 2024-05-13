import { configureStore } from "@reduxjs/toolkit";
import daeSlice from "./projectSlice";

const store = configureStore({
    reducer: {
        dae: daeSlice.reducer
    }
});


export default store;
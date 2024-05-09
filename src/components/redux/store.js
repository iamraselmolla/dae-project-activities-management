import { configureStore } from "@reduxjs/toolkit";
import projectsSlice from "./projectSlice";

const store = configureStore({
    reducer: {
        projects: projectsSlice.reducer
    }
});


export default store;
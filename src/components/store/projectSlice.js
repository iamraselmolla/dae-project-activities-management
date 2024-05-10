import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    projects: [],
    users: [],
}

const daeSlice = createSlice({
    name: 'dae-user-data',
    initialState,
    reducers: {
        setAllProjects: (state, action) => {
            state.projects = action.payload
        },
        setAllUsers: (state, action) => {
            state.users = action.payload
        }

    }
})

export default daeSlice;
export const daeAction = daeSlice.actions
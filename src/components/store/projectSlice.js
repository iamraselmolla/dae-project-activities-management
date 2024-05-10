import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    projects: [],
    users: [],
    projects: [],
    trainings: [],
    notes: []
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
        },
        setAllProjects: (state, action) => {
            state.projects = action.payload
        },
        setAllTrainings: (state, action) => {
            state.trainings = action.payload
        },
        setUserNotes: (state, action) => {
            state.notes = action.payload
        }

    }
})

export default daeSlice;
export const daeAction = daeSlice.actions
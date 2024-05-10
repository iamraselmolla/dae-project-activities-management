import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    projects: [],
    users: [],
    projects: [],
    trainings: [],
    notes: [],
    demos: [],
    fieldDays: []
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
        },
        setUserDemos: (state, action) => {
            state.demos = action.payload
        },
        setUserFieldDays: (state, action) => {
            state.fieldDays = action.payload
        }

    }
})

export default daeSlice;
export const daeAction = daeSlice.actions
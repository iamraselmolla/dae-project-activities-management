import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    projects: []
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setAllProjects: (state, action) => {
            state.projects = action.payload
        }
    }
})

export default projectsSlice;
export const projectAction = projectsSlice.actions
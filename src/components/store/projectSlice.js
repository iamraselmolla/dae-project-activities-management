import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  users: [],
  projects: [],
  trainings: [],
  notes: [],
  tours: [],
  refetch: 'all',
  endFetch: false,
  blockAndUnions: [],
  distributions: [],
  demos: [],
  fieldDays: [],
  schools: [],
  daeMeetings: [],
  refetchDemoDetails: 0

};

const daeSlice = createSlice({
  name: "dae-user-data",
  initialState,
  reducers: {
    setAllProjects: (state, action) => {
      state.projects = action.payload;
    },
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    setAllTrainings: (state, action) => {
      state.trainings = action.payload;
    },
    setUserNotes: (state, action) => {
      state.notes = action.payload;
    },
    setUserDemos: (state, action) => {
      state.demos = action.payload;
    },
    setUserFieldDays: (state, action) => {
      state.fieldDays = action.payload;
    },
    setDaeMeeting: (state, action) => {
      state.daeMeetings = action.payload;
    },
    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
    setEndFetch: (state, action) => {
      state.endFetch = action.payload;
    },
    setAllMotivationTours: (state, action) => {
      state.tours = action.payload;
    },
    setBlokAndUnion: (state, action) => {
      state.blockAndUnions = action.payload;
    },
    setDistribution: (state, action) => {
      state.distributions = action.payload;
    },
    setUserSchools: (state, action) => {
      state.schools = action.payload;
    },
    setDemoDetailsReFetch: (state, action) => {
      state.refetchDemoDetails++
    }
  },
});

export default daeSlice;
export const daeAction = daeSlice.actions;

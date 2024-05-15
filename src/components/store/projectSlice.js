import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  users: [],
  projects: [],
  trainings: [],
  notes: [],
  demos: [],
  fieldDays: [],
  daeMeetings: [],
  modalData: null,
  tours: [],
  refetch: 0,
  endFetch: false,
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
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
    setRefetch: (state, action) => {
      state.refetch++;
    },
    setEndFetch: (state, action) => {
      state.endFetch = action.payload;
    },
    setAllMotivationTours: (state, action) => {
      state.tours = action.payload;
    },
  },
});

export default daeSlice;
export const daeAction = daeSlice.actions;

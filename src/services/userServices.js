import http from "./http_services";

// Base URLs categorized by functionality
const BASE_URL = {
  // Projects
  addProject: "/projects/create-project",
  getProjects: "/projects/get-projects",
  updateProjectCrops: "/projects/update-project",
  deleteProject: "/projects/delete-project",
  findProject: "/projects/get-project",

  // Demos
  addDemo: "/demo/create-demo",
  getAllDemos: "/demo/all-demos",
  getUserDemo: "/demo/user-all-demos",
  deleteDemo: "/demo/delete-demo",

  // Users
  getUser: "/user/get-user",
  getAllUser: "/user/get-users",
  updateUser: "/user/update-user",

  // Groups
  createGroup: "/group/create-group",
  fetchAllGroupsInfo: "/group/get-groups",
  getUserGroups: "/group/get-user-groups",
  getGroupbyId: "/group/get-group-by-id",
  deleteGroupInfoById: "/group/delete-group",
  updateDaegroup: "/group/update-group",

  // Trainings
  createTraining: "/training/create-training",
  getTraining: "/training/get-trainings",
  deleteTraining: "/training/delete-training",
  getSingleTraining: "/training/get-training",
  updateTrainingData: "/training/update",

  // Field Days
  createAFieldDay: "/fieldDay/create-fieldDay",
  getFieldDays: "/fieldDay/get-all-fieldDays",
  userFieldDay: "/fieldDay/user-fielddays",
  deleteFieldDay: "/fieldDay/delete-fieldday",
  getfieldDayByid: "/fieldDay/get-fieldday-byId",
  updateFieldDay: "/fieldDay/update-fieldDay",

  // Notes
  createNote: "/note/create-note",
  findNotes: "/note/get-notes",
  deleteNote: "/note/delete-note",
  completeANote: "/note/complete-note",
};

// Project APIs
export function addProjectByAdmin(values) {
  return http.post(BASE_URL.addProject, values);
}

export function getAllProjects() {
  return http.get(BASE_URL.getProjects);
}

export function updateProjectCrops(values) {
  return http.put(BASE_URL.updateProjectCrops, values);
}

export function deleteAProject(id) {
  return http.delete(BASE_URL.deleteProject, { data: { id } });
}

export function findProjectByUserId(id) {
  return http.post(BASE_URL.findProject, { id });
}

// Demo API
export function createDemo(values) {
  return http.post(BASE_URL.addDemo, values);
}

export function getAllDemos() {
  return http.get(BASE_URL.getAllDemos);
}

export function deleteUserDemo(id) {
  return http.delete(BASE_URL.deleteDemo, { data: { id } });
}

export function getUserDemos() {
  return http.get(BASE_URL.getUserDemo);
}
// User APIs
export function getUser(username) {
  return http.delete(BASE_URL.getUser, { username });
}

export function getAllUser() {
  return http.get(BASE_URL.getAllUser);
}

export function updateUser(id, values) {
  return http.put(BASE_URL.updateUser, { id, values });
}

// Group APIs
export function createAGroup(values) {
  return http.post(BASE_URL.createGroup, values);
}

export function fetchAllGroups() {
  return http.get(BASE_URL.fetchAllGroupsInfo);
}

export function getUserAllGroupMeeting() {
  return http.get(BASE_URL.getUserGroups);
}

export function getGroupInfoById(id) {
  return http.post(BASE_URL.getGroupbyId, { id });
}

export function deleteGroupInfoById(id) {
  return http.delete(BASE_URL.deleteGroupInfoById, { data: { id } });
}

export function updateGroupInfo(id, values) {
  return http.put(BASE_URL.updateDaegroup, { id, values });
}

// Training APIs
export function createTraining(values) {
  return http.post(BASE_URL.createTraining, values);
}

export function getAllTraining() {
  return http.get(BASE_URL.getTraining);
}

export function deleteATraining(id) {
  return http.delete(BASE_URL.deleteTraining, { data: { id } });
}

export function getTrainingById(id) {
  return http.get(BASE_URL.getSingleTraining + `?id=${id}`);
}

export function updateTraining(id, trainingData) {
  return http.put(BASE_URL.updateTrainingData, { id, trainingData });
}

// Field Day APIs
export function createAFieldDay(values) {
  return http.post(BASE_URL.createAFieldDay, values);
}

export function getAllFieldDays() {
  return http.get(BASE_URL.getFieldDays);
}

export function getUserAllFieldDay() {
  return http.get(BASE_URL.userFieldDay);
}

export function deleteAFieldDay(id) {
  return http.delete(BASE_URL.deleteFieldDay, { data: { id } });
}

export function getFieldDayDataById(id) {
  return http.post(BASE_URL.getfieldDayByid, { id });
}

export function updateAFieldDay(id, data) {
  return http.put(BASE_URL.updateFieldDay, { id, data });
}

// Note APIs
export function createANote(values) {
  return http.post(BASE_URL.createNote, values);
}

export function findUserAllNotes(username) {
  return http.post(BASE_URL.findNotes, { username });
}

export function deleteAnote(id) {
  return http.delete(BASE_URL.deleteNote, { data: { id } });
}

export function markNoteAsComplete(id, comment) {
  return http.put(BASE_URL.completeANote, { id, comment });
}

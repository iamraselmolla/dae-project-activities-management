import http from "./http_services";

// Base URLs categorized by functionality
const BASE_URL = {
  // Projects
  addProject: "/projects/create-project",
  getProjects: "/projects/get-projects",
  updateProjectCrops: "/projects/update-project",
  deleteProject: "/projects/delete-project",
  findProject: "/projects/get-project",
  endProject: "/projects/end-project",
  findAllProjects: "/projects/find-all-projects",

  // Demos
  addDemo: "/demo/create-demo",
  getAllDemos: "/demo/all-demos",
  getUserDemo: "/demo/user-all-demos",
  deleteDemo: "/demo/delete-demo",
  findDemo: "/demo/find-demo",
  addDemoImage: "/demo/add-image-to-the-demo",
  editDemos: "/demo/edit-demo",
  demoComplete: "/demo/complete-demo",
  getDemoById: "/demo/get-demo",

  // Users
  getUser: "/user/get-user",
  getAllUser: "/user/get-users",
  updateUser: "/user/update-user",
  login: "/user/get-login-user",
  getUnionAndBlockInfo: "/user/get-user-info",

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

  // Distribution
  createDistribution: "/distribution/create-distribution",
  getDistribution: "/distribution/get-distributions",
  deleteADistribution: '/distribution/delete-distribution',

  // Motivational Tour
  createMotivationTour: "/tour/create-tour",
  getAllMotivationalTour: "/tour/get-tours",
  deleteTour: "/tour/delete-a-tour",

  // FBS PFS School
  creatPFSFBS: "/school/create-a-school",
  getSchools: "/school/get-all-schools",
  userSchools: "/school/get-user-schools",
  deleteSchool: '/school/delete-a-school',

  // Farmer Data
  createAFarmer: "/farmer/create-farmer",
  getFarmers: "/farmer/get-farmers-data",
  deleteFarmer: "/farmer/delete-farmer-data",
  findFarmerByNumberNID: "/farmer/find-farmer-by-nid",

  // Notice
  createANotice: "/notice/create-notice",
  getAllNotices: "/notice/get-all-notices",
  findSingleNotice: "/notice/get-a-notice",
  deleteNotice: "/notice/delete-a-notice",
  postNoticeComment: "/notice/post-a-notice-comment",
  markNoticeComplete: "/notice/complete-notice",
  updateNotice: "/notice/update-notice"
};

// Project APIs
export function addProjectByAdmin(values) {
  return http.post(BASE_URL.addProject, values);
}

export function getAllProjects(role) {
  if (!role) {
    role = "user";
  }
  return http.get(BASE_URL.getProjects + `?role=${role}`);
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

export function markProjectComplete(id) {
  return http.put(BASE_URL.endProject, { id });
}

export function findAllProjectsData() {
  return http.get(BASE_URL.findAllProjects)
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

export function findDemoById(id) {
  return http.post(BASE_URL.findDemo, { id });
}

export function addImageAndDetails(id, imageData) {
  return http.put(BASE_URL.addDemoImage, { id, imageData });
}

export function editDemobyId(id, values) {
  return http.put(BASE_URL.editDemos, { id, values });
}

export function markDemoComplete(id, values) {
  return http.put(BASE_URL.demoComplete, { id, data: values });
}

export function getSingleDemoById(id) {
  return http.post(BASE_URL.getDemoById, { id });
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

export function getLoginUser(formData) {
  return http.post(BASE_URL.login, formData);
}

export function getBlockandUnion() {
  return http.get(BASE_URL.getUnionAndBlockInfo);
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

export function findUserAllNotes() {
  return http.get(BASE_URL.findNotes);
}

export function deleteAnote(id) {
  return http.delete(BASE_URL.deleteNote, { data: { id } });
}

export function markNoteAsComplete(id, comment) {
  return http.put(BASE_URL.completeANote, { id, comment });
}

// Distribution
export function createDistribution(data) {
  return http.post(BASE_URL.createDistribution, { data });
}

export function getAllDistributions() {
  return http.get(BASE_URL.getDistribution);
}

export function deleteADistribution(id) {
  return http.delete(BASE_URL.deleteADistribution, { data: { id } });
}

// Motivatinal Tour
export function createMotivationTour(data) {
  return http.post(BASE_URL.createMotivationTour, { data });
}

export function getAllMotivationalTours() {
  return http.get(BASE_URL.getAllMotivationalTour);
}

export function deleteATour(id) {
  return http.delete(BASE_URL.deleteTour, { data: { id } });
}

// School
export function createASchool(data) {
  return http.post(BASE_URL.creatPFSFBS, { data });
}

export function getAllSchools() {
  return http.get(BASE_URL.getSchools);
}

export function getUserAllSchools() {
  return http.get(BASE_URL.userSchools);
}

export function deleteASchool(id) {
  return http.delete(BASE_URL.deleteSchool, { data: { id } });
}

// Farmer
export function createAFarmer(data) {
  return http.post(BASE_URL.createAFarmer, data);
}

export function getAllFarmers() {
  return http.get(BASE_URL.getFarmers);
}

export function deleteAFarmer(id) {
  return http.delete(BASE_URL.deleteFarmer, { data: { id } });
}

export function findFarmerByNID(nid, block, union) {
  return http.post(BASE_URL.findFarmerByNumberNID, { nid, block, union });
}

// Notice
export function createANotice(values) {
  return http.post(BASE_URL.createANotice, values);
}

export function getAllNotices() {
  return http.get(BASE_URL.getAllNotices);
}

export function findASingleNotice(id) {
  return http.get(BASE_URL.findSingleNotice + `?id=${id}`);
}

export function addCommentToNotice(id, userId, username, text) {
  return http.put(BASE_URL.postNoticeComment, { id, userId, username, text });
}

export function markNoticeAsCompleted(id, userId, username) {
  return http.put(BASE_URL.markNoticeComplete, { id, userId, username });
}

export function updateNotice(id, updateData) {
  return http.put(BASE_URL.updateNotice, { id, updateData });
}

export function deleteNotice(id) {
  return http.delete(BASE_URL.deleteNotice, { data: { id } });
}

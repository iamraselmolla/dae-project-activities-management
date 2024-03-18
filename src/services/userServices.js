import http from "./http_services";

const BASE_URL = {
  addProject: "/projects/create-project",
  getProjects: "projects/get-projects",
  addDemo: "/projects/create-demo",
  getUser: "/user/get-user",
  getAllUser: "/user/get-users",
  updateProjectCrops: "/projects/update-project",
  deleteProject: "/projects/delete-project",
  findProject: "/projects//get-project",
  updateUser: "/user/update-user",
  createGroup: "/group/create-group",
  fetchAllGroupsInfo: "/group/get-groups",
  createATraining: "/training/create-training",
  getTraining: "/training/get-trainings",
};

export function addProjectByAdmin(values) {
  return http.post(BASE_URL.addProject, values);
}
export function getAllProjects() {
  return http.get(BASE_URL.getProjects);
}
export function createDemo(values) {
  return http.post(BASE_URL.addDemo, values);
}
export function getUser(username) {
  return http.post(BASE_URL.getUser, { username });
}
export function getAllUser() {
  return http.get(BASE_URL.getAllUser + "?person=admin");
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
export function updateUser(id, values) {
  return http.put(BASE_URL, { id, values });
}
export function createAGroup(values) {
  return http.post(BASE_URL.createGroup, values);
}
export function fetchAllGroups() {
  return http.get(BASE_URL.fetchAllGroupsInfo);
}

export function createTraining(values) {
  return http.post(BASE_URL.createATraining, values);
}

export function getAllTraining() {
  return http.get(BASE_URL.getTraining);
}

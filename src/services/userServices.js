import http from "./http_services";

const BASE_URL = {
  addProject: "/projects/create-project",
  getProjects: "projects/get-projects",
  addDemo: "/projects/create-demo",
  getUser: "/user/get-user",
  getAllUser: "/user/get-users",
  updateProjectCrops: "/projects/update-project",
  deleteProject: "/projects/delete-project",
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
  return http.get(BASE_URL.getAllUser);
}
export function updateProjectCrops(values) {
  return http.put(BASE_URL.updateProjectCrops, values);
}
export function deleteAProject(id) {
  return http.delete(BASE_URL.deleteProject, { id })
}

import http from "./http_services"

const BASE_URL = {
    addProject: '/projects/create-project',
    getProjects: 'projects/get-projects'
}



export function addProjectByAdmin(values) {
    return http.post(BASE_URL.addProject, values)
}

export function getAllProjects() {
    return http.get(BASE_URL.getProjects)
}
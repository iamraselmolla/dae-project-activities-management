import http from "./http_services"

const BASE_URL = {
    addProject: '/api/v1/projects/create-project',
}



export function addProjectByAdmin(values) {
    return http.post(BASE_URL.addProject, values)
}
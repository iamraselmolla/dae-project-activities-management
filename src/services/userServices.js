import http from "./http_services"

const BASE_URL = {
    addProject: '/projects/create-project',
    getProjects: 'projects/get-projects',
    addDemo: '/projects/create-demo',
    getUser: '/user/get-user',
}



export function addProjectByAdmin(values) {
    return http.post(BASE_URL.addProject, values)
}

export function getAllProjects() {
    return http.get(BASE_URL.getProjects)
}

export function createDemo(values) {
    return http.post(BASE_URL.addDemo, values)
}
export function getUser(username) {
    return http.post(BASE_URL.getUser, { username })
}
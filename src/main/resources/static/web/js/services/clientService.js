const BASE_URL = '/api';

export function getClientProfile() {
    return axios.get(`${BASE_URL}/clients/current`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}

export function createClient(firstName, lastName, email, password) {
    return axios.post(`${BASE_URL}/clients`, `firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}

export function getClients() {
    return axios.get('/rest/clients')
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}
const BASE_URL = '/api';

export function logIn(email, password) {
    return axios.post(`${BASE_URL}/login`, `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}

export function signUp(email, password, fName, lName) {
    return axios.post(`${BASE_URL}/clients`, `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&firstName=${encodeURIComponent(fName)}&lastName=${encodeURIComponent(lName)}`,
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}

export function logOut() {
    return axios.post(`${BASE_URL}/logout`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}
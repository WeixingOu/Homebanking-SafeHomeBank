const BASE_URL = '/api';

export function removeAccount(accountId) {
    return axios.patch(`${BASE_URL}/clients/current/accounts/${accountId}`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}

export function createAccount(accountType) {
    return axios.post(`${BASE_URL}/clients/current/accounts`, `type=${accountType}`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}

export function getCurrentAccount(accountId) {
    return axios.get(`${BASE_URL}/accounts/${accountId}`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}
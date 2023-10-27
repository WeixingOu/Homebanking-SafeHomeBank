const BASE_URL = '/api';

export function createCard(cardColor, cardType) {
    return axios.post(`${BASE_URL}/clients/current/cards`, `color=${cardColor}&type=${cardType}`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}

export function removeCard(cardId) {
    return axios.patch(`${BASE_URL}/clients/current/cards/${cardId}`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}
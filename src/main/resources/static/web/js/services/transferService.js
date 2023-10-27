const BASE_URL = '/api';

export function sendTransfer(amount, description, origin, destinatary) {
    return axios.post(`${BASE_URL}/transactions`, `amount=${amount}&description=${description}&accountOrigin=${origin}&accountDestination=${destinatary}`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}

export function downloadTransactions(dateStartInput, dateEndInput, chosenAccountNumber) {
    return axios.get(`${BASE_URL}/transactions` + `?dateStart=${dateStartInput}&dateEnd=${dateEndInput}&accountNumber=${chosenAccountNumber}`, {responseType: "blob"})
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}
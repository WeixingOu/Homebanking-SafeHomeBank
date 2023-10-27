const BASE_URL = '/api';

export function getLoanTyeps() {
    return axios.get(`${BASE_URL}/loans`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}

export function sendLoanRequest(loanId, amount, installments, destinatary) {
    return axios.post(`${BASE_URL}/loans`, { id: loanId, amount: amount, payments: installments, destinataryAccountNumber: destinatary })
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}

export function payLoan(loanId, loanAccount) {
    return axios.patch(`${BASE_URL}/loans/${loanId}`, `accountNumber=${loanAccount}`)
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}

export function createLoan(loanNameInput, maxAmountInput, interestInput, installmentsList) {
    return axios.post(`${BASE_URL}/loans/create`, { name: loanNameInput, maxAmount: maxAmountInput, percentage: interestInput, payments: installmentsList})
    .then(res => res.data)
    .catch(err => {
        throw err;
    });
}
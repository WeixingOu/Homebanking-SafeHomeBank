import { payLoan } from "../services/loanService.js";

import clientMixin from "../mixins/clientMixin.js";

const LoansActives = {
    mixins: [clientMixin],
    emits: ['loan-paidment'],

    data() {
        return {
            loanSelected: {},
            loanAccount: null,
            payLoanConfirmation: false,
            errorMessage: ""
        }
    },

    computed: {
        loans() {
            return this.client?.loans?.filter(loan => loan.active)?.sort((a, b) => a.id - b.id) || [];
        },
        accounts() {
            return this.client?.accounts?.filter(account => account.active)?.sort((a, b) => a.id - b.id) || [];
        },
        installment() {
            if (this.loanSelected && this.loanSelected.amount && this.loanSelected.paymentsLeft) {
                const value = this.loanSelected.amount / this.loanSelected.paymentsLeft;
                
                return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            }
            return '$0.00';
        }
    }, 

    methods: {
        selectedLoan(loan) {
            this.loanSelected = loan;
            this.errorMessage = '';
        },
        confirmPay(account) {
            if(account == null) {
                this.errorMessage = "You must select an account to pay."
                return
            }
            this.errorMessage = "";
            this.payLoanConfirmation = true;
        },
        handlePayLoan() {
            payLoan(this.loanSelected.id, this.loanAccount)
            .then(res => {

                const notification = {
                    title: res,
                    loanAccount: this.loanAccount,
                    amount: this.installment,
                    time: new Date().toLocaleTimeString(),
                    loan: this.loanSelected
                }
                this.$emit('loan-paidment', notification);


                this.$root.isLoading = true;
                document.location.reload();
            })
            .catch(error => {
                if (error.response) {
                    this.$root.isLoading = false;
                    console.log(error);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    this.errorMessage = error.response.data;
                    this.payLoanConfirmation = false;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
        },
    },

    template: `
        <div class="loans-actives">
            <h2>My Requested Loans</h2>

            <table class="table bg-white table-hover mt-4" v-if="loans.length">
                <thead>
                    <tr>
                        <th scope="col">Loan ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Payments</th>
                        <th scope="col">Left</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="loan in loans">
                        <td>{{ loan.id }}</td>
                        <td>{{ loan.name }}</td>
                        <td>{{ loan.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</td>
                        <td>{{ loan.payments }}</td>
                        <td>{{ loan.paymentsLeft }}</td>
                        <td class="text-primary" data-bs-toggle="modal" data-bs-target="#loanModal" @click="selectedLoan(loan)">Pay</td>
                    </tr>
                </tbody>
            </table>

            <div v-else>
                <h4 class="text-center">You has not requested any loan yet.</h4>
            </div>
        </div>

        <div class="modal fade" id="loanModal" tabindex="-1" aria-labelledby="loanTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content p-3">
                    <div class="modal-header border-0">
                        <h4 class="modal-title fs-5" id="loanTitle">
                            With which account do you want to pay your loan?
                        </h4>
                    </div>

                    <div class="modal-body pt-3 pb-4">
                        <p class="fs-6 mb-2">
                            The amount you have to pay per installment is: 
                            <span class="fw-bold">
                                {{ installment }}
                            </span>
                        </p>
                        <label class="form-check-label" for="loanAccounts">
                            Select one of your accounts:
                        </label>
                        <select id="loanAccounts" class="form-select my-2" v-model="loanAccount">
                            <option disabled value="">- Select an account -</option>
                            <template v-for="account of accounts">
                                <template v-if="account.balance != 0">
                                    <option :value="account.number">
                                        {{ account.number }} | {{ account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
                                    </option>
                                </template>
                            </template>
                        </select>
                        <template v-if="errorMessage">
                            <div class="text-danger d-flex align-items-center justify-content-center mt-4">
                                <i class="bi bi-x-circle-fill fs-5 me-1"></i>
                                {{ errorMessage }}
                            </div>
                        </template>
                    </div>

                    <template v-if="payLoanConfirmation && loanAccount">
                        <p class="text-center">
                            Are you sure you want to pay with this account?
                        </p>
                    </template>

                    <div class="modal-footer border-0 mx-auto mx-md-0">
                        <button type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">Close</button>
                        <template v-if="payLoanConfirmation && loanAccount">
                            <button @click="handlePayLoan" type="button" class="btn btn-primary">
                                Yes, pay an installment
                            </button>
                        </template>
                        <template v-else>
                            <button @click="confirmPay(this.loanAccount)" type="button" class="btn btn-primary">
                                Pay installment
                            </button>
                        </template>
                    </div>

                </div>
            </div>
        </div>
    `
}

export default LoansActives;
import { getLoanTyeps } from "../services/loanService.js";
import { sendLoanRequest } from "../services/loanService.js";

import clientMixin from "../mixins/clientMixin.js";

const LoanForm = {
    mixins: [clientMixin],

    data() {
        return {
            loanTypes: null,
            loanType: '',
            destAccount: '',
            installments: '',
            amount: '',
            errorMessage: "",
        }
    },
    created() {
        getLoanTyeps().then(res => {
            this.loanTypes = res;
        })
        .catch(err => console.error(err))
    },

    methods: {
        handleSendLoan() {
            const amountRegex = new RegExp(/^[0-9]+\.[0-9]{2}$/);

            if (!this.amount.includes('.')) {
                this.amount += ".00";
            } else if (this.amount.split('.')[1].length === 1) {
                this.amount += "0";
            }

            if (this.inputLoan == "") {
                this.errorMessage = "Please enter a type of loan";
                return
            }
            if (this.destinatary == "") {
                this.errorMessage = "Please enter an account to deposit the loan";
                return
            }
            if (this.installments == "") {
                this.errorMessage = "Please enter a number of installments";
                return
            }
            if (this.amount == "") {
                this.errorMessage = "Please enter an amount for the loan";
                return
            }
            if (!(amountRegex.test(this.amount))) {
                this.errorMessage = "Please enter a numeric amount with the next format: 1000.00";
                return
            }
            

            this.errorMessage = "";
            Swal.fire({
                scrollbarPadding: false,
                title: 'Are you sure you want to ask for this loan?',
                text: "You won't be able to revert this!",
                icon: 'info',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg mb-3 mb-md-0',
                    cancelButton: 'btn btn-secondary btn-lg me-md-5 mb-3 mt-2 my-md-2'
                },
                showCancelButton: true,
                confirmButtonText: 'Yes, ask for this loan',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            }).then(result => {
                if (result.isConfirmed) {
                    sendLoanRequest(this.loanType, this.amount, this.installments, this.destAccount)
                        .then(res => {
                            const notification = {
                                title: res,
                                message: `Added $${this.amount} to ${this.destAccount}.`,
                                time: new Date().toLocaleTimeString()
                            }
                            this.$emit('new-loan-notification', notification);

                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Your loan has been approved!',
                                showConfirmButton: true,
                                buttonsStyling: false,
                                customClass: {
                                    confirmButton: 'btn btn-primary btn-lg',
                                }
                            })
                                .then(result => {
                                    if (result.isConfirmed) {
                                        this.$root.isLoading = false; 
                                        document.location.reload();
                                    }
                                })
                            this.loanType = "";
                            this.destAccount = "";
                            this.amount = "";
                            this.installments = "";
                        })
                        .catch(error => {
                            if (error.response) {
                                this.$root.isLoading = false; 

                                console.log(error);
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                                this.errorMessage = error.response.data;
                            } else if (error.request) {
                                console.log(error.request);
                            } else {
                                console.log('Error', error.message);
                            }
                            console.log(error.config);
                        })
                }
            })
        }
    },

    computed: {
        accounts() {
            if (!this.client || !this.client.accounts) {
                return [];
            }
            return (this.client.accounts.filter(account => account.active)).sort((a, b) => a.id - b.id);
        },
        selectedLoanType() {
            if (!this.loanTypes) return null;
            return (this.loanTypes.find(lt => lt.id == this.loanType));
        }
    },
    
    template: `
        <div class="col-12 grid-margin stretch-card flex-column" v-if="client">
            <div class="header mb-3">
                <h1 class="m-0">Ask for a loan</h1>
            </div>

            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Request Form</h4>
                    <p class="card-description mb-3">
                        Please fill out all required fields accurately and ensure that you have verified the details before submission. Incomplete or inaccurate information may delay the borrow process.
                    </p>
                    <form class="forms-transfer" @submit.prevent="handleSendLoan">
                        <div class="form-group">
                            <label for="selectLoanType">Select a type of loan</label>
                            <select 
                                class="form-control mb-2" 
                                    id="selectLoanType" 
                                    v-model="loanType"
                                >
                                <option 
                                    v-for="loanType in loanTypes" 
                                    :key="loanType.id" 
                                    :value="loanType.id"
                                >
                                    {{ loanType.name }} | Interest: {{ loanType.percentage.toFixed(2) }}%
                                </option>
                            </select>

                            <span id="loanMaxAmount" class="form-text">
                                Maximum amount: {{ selectedLoanType && selectedLoanType.maxAmount ? selectedLoanType.maxAmount.toLocaleString('en-US') : '' }}
                            </span>
                        </div>

                        <div class="form-group">
                            <label for="selectDestAccount">Select an account to deposit the loan</label>
                            <select 
                                class="form-control" 
                                id="selectDestAccount" 
                                v-model="destAccount"
                            >
                                <option 
                                    v-for="account in accounts" 
                                    :key="account.id" 
                                    :value="account.number"
                                >
                                    {{ account.number }} | {{ '$'+account.balance.toLocaleString('en-US') }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Amount</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-primary">$</span>
                                </div>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    aria-label="Amount" 
                                    v-model="amount"
                                >
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="installments">Select a number of installments</label>
                            <select 
                                class="form-control" 
                                id="installments" 
                                v-model="installments"
                            >
                                <option 
                                    v-for="payment in selectedLoanType ? selectedLoanType.payments : []"
                                    :key="payment" 
                                    :value="payment"
                                >
                                    {{ payment }}
                                </option>
                            </select>
                        </div>

                        <div class="text-danger d-flex align-items-center justify-content-center pt-4" v-if="errorMessage">
                            <i class="bi bi-x-circle-fill fs-5 me-1"></i>
                            <p class="m-0 fs-5">
                                {{ errorMessage }}
                            </p>
                        </div>
                        
                        <button type="submit" class="btn btn-primary ms-auto d-block">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    `
}

export default LoanForm;
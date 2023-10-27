import { sendTransfer } from "../services/transferService.js";

import clientMixin from "../mixins/clientMixin.js";

const TransferForm = {
    mixins: [clientMixin],

    data() {
        return {
            destinationType: "Myself",
            sourceAccount: "",
            destAccount: "",
            amount: "",
            description: "",
            errorMessage: "",
        }
    },

    methods: {
        handleSendTransfer() {
            const amountRegex = new RegExp(/^[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/);

            if (this.amount == "") {
                this.errorMessage = "Please enter an amount for the transaction";
                return
            }
            if (!(amountRegex.test(this.amount))) {
                this.errorMessage = "Please enter a numeric amount with the next format: 1000.00";
                return
            }
            if (this.destinataryType == "Others" && this.origin == this.destinatary) {
                this.errorMessage = "You can't transfer money to the same account";
                return
            }

            if (!this.amount.includes('.')) {
                this.amount += ".00";
            } else if (this.amount.split('.')[1].length === 1) {
                this.amount += "0";
            }

            const accountRegex = /^VIN-\d+$/;
            if (!accountRegex.test(this.destAccount)) {
                this.errorMessage = "Please enter a valid account number with the format: VIN- followed by digits";
                return;
            }
            

            this.errorMessage = "";

            Swal.fire({
                scrollbarPadding: false,
                title: 'Are you sure you want to make this transaction?',
                icon: 'info',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg mb-3 mb-md-0',
                    cancelButton: 'btn btn-secondary btn-lg me-md-5 mb-3 mt-2 my-md-2'
                },
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                reverseButtons: true
            }).then(result => {
                if (result.isConfirmed) {
                    sendTransfer(this.amount, this.description, this.sourceAccount, this.destAccount)
                        .then(res => {
                            const notification = {
                                title: res.includes("created successfully") ? "Transferred successfully" : "Transferred error",
                                message: `$${this.amount} ${this.sourceAccount} to ${this.destAccount}.`,
                                time: new Date().toLocaleTimeString()
                            }
                            this.$emit('new-transfer-notification', notification);
                            
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Your transaction has been made!',
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
                            this.destAccount = "";
                            this.sourceAccount = "";
                            this.amount = null;
                            this.description = "";
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
        destAccounts() {
            return this.accounts.filter(account => account.number !== this.sourceAccount);
        }
    },
    
    template: `
        <div class="col-12 grid-margin stretch-card flex-column" v-if="client">
            <div class="header mb-3">
                <h1 class="m-0">Make a transaction</h1>
            </div>

            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Request Form</h4>
                    <p class="card-description mb-3">
                        Please fill out all required fields accurately and ensure that you have verified the details before submission. Incomplete or inaccurate information may delay the transaction process.
                    </p>
                    <form class="forms-transfer" @submit.prevent="handleSendTransfer">
                        <div class="form-group row align-items-center">
                            <label class="col-sm-3 col-form-label">Destination type</label>
                            <div class="col-sm-4">
                                <div class="form-check m-0">
                                    <label class="form-check-label">
                                        <input 
                                            type="radio" 
                                            class="form-check-input" 
                                            v-model="destinationType" 
                                            value="Myself" 
                                            checked
                                        >
                                            Owner
                                        <i class="input-helper"></i></label>
                                </div>
                            </div>
                            <div class="col-sm-5">
                                <div class="form-check m-0">
                                    <label class="form-check-label">
                                        <input 
                                            type="radio" 
                                            class="form-check-input" 
                                            v-model="destinationType" 
                                            value="Others"
                                        >
                                            Others
                                        <i class="input-helper"></i></label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="selectSourceAccount">Source Account</label>
                            <select 
                                class="form-control" 
                                    id="selectSourceAccount" 
                                    v-model="sourceAccount"
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

                        <div 
                            class="form-group" 
                            v-if="destinationType === 'Myself'"
                        >
                            <label for="selectDestAccount">Destination Account</label>
                            <select 
                                class="form-control" 
                                id="selectDestAccount" 
                                v-model="destAccount"
                            >
                                <option 
                                    v-for="account in destAccounts" 
                                    :key="account.id" 
                                    :value="account.number"
                                >
                                    {{ account.number }} | {{ '$'+account.balance.toLocaleString('en-US') }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group" v-else-if="destinationType === 'Others'">
                            <label for="textDestAccount">Destination Account</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="textDestAccount"
                                placeholder="Destination Account Number VIN-0000000" 
                                pattern="^VIN-\d+$"
                                v-model=" destAccount"
                            >
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
                            <label for="description">Description</label>
                            <textarea 
                                class="form-control" 
                                id="description" 
                                rows="4" 
                                v-model="description"
                            ></textarea>
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

export default TransferForm;
import { createLoan } from "../services/loanService.js";

const LoanTypeForm = {
    data() {
        return {
            loanNameInput: "",
            maxAmountInput: "",
            interestInput: "",
            installmentsInput: "",
            installmentsList: [],
            errorMessage: "",
        }
    },

    methods: {
        handleCreateLoan() {
            if (this.maxAmountInput == "") {
                this.errorMessage = "Please enter a maximum amount for the loan.";
                return
            }
            if (this.interestInput == "") {
                this.errorMessage = "Please enter an interest rate for the loan.";
                return
            }
            const installmentsRegex = new RegExp(/^\d+(,\s*\d+)*$/); // Only digits with commas and optional spaces.
            if (!(installmentsRegex.test(this.installmentsInput))) {
                this.errorMessage = "Please write the installments in the next format: 3, 6, 9";
                return
            }

            this.installmentsList = this.installmentsInput.split(/\s*,\s*/);

            this.errorMessage = "";

            Swal.fire({
                scrollbarPadding: false,
                title: 'Are you sure you want to create this loan?',
                icon: 'info',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg mb-3 mb-md-0',
                    cancelButton: 'btn btn-secondary btn-lg me-md-5 mb-3 mt-2 my-md-2'
                },
                showCancelButton: true,
                confirmButtonText: 'Yes, create loan',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            }).then(result => {
                if (result.isConfirmed) {
                    createLoan(this.loanNameInput, this.maxAmountInput, this.installmentsInput, this.installmentsList)
                    .then(() => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'The loan has been created!',
                            showConfirmButton: true,
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'btn btn-primary btn-lg',
                            }
                        }).then(result => {
                            if (result.isConfirmed) {
                                this.$root.isLoading = false; 
                                document.location.reload()
                            }
                        })
                    })
                    .catch(error => {
                        if (error.response) {
                            this.$root.isLoading = false; 
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

    },
    
    template: `
        <div class="col-12 grid-margin stretch-card flex-column">
            <div class="header mb-3">
                <h1 class="m-0">Loan Manager</h1>
            </div>

            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Create a new loan type</h4>
                    <form class="forms-transfer" @submit.prevent="handleCreateLoan">
                        <div class="form-group">
                            <label class="form-check-label" for="loanName">
                                Name of the new loan:
                            </label>
                            <input type="text" class="form-control" id="loanName" v-model="loanNameInput" placeholder="Mortgage" required>
                        </div>

                        <div class="form-group">
                            <label for="maxAmount" class="form-label">
                                Maximum amount:
                            </label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-primary">$</span>
                                </div>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    id="maxAmount"
                                    aria-label="maxAmount" 
                                    v-model="maxAmountInput"
                                    required
                                >
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="interest" class="form-label">
                                Interest rate:
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="interest"
                                v-model="interestInput" aria-describedby="percentageSymbol" min="1" placeholder="0.00" required>
                                <span class="input-group-text" id="percentageSymbol">%</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-check-label" for="installments">
                                Number of available installments (separate them with commas):
                            </label>
                            <input type="text" class="form-control" id="installments"
                                v-model="installmentsInput" placeholder="3, 6, 9" required>
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

export default LoanTypeForm;
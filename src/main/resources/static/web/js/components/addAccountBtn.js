import { createAccount } from "../services/accountService.js";

import clientMixin from "../mixins/clientMixin.js";

const AddAcountBtn = {
    mixins: [clientMixin],

    data() {
        return {
            accountType: "CHECKING",
        }
    },

    computed: {
        accounts() {
            return (this.client.accounts.filter(account => account.active)).sort((a, b) => a.id - b.id);
        }
    },
    methods: {
        handleCreateAccount() {
            Swal.fire({
                scrollbarPadding: false,
                title: 'Are you sure you want to create a new account?',
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
                        this.$root.isLoading = true;
                        createAccount(this.accountType)
                        .then(() => {
                            this.$root.isLoading = false; 
                            document.location.reload();
                        })
                        .catch(error => {
                            this.$root.isLoading = false; 
                            
                            console.log(error);

                            if (error.response) {
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
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
    template: `
        <div 
            class="add-account"
            v-if="client"
            :class="{ 'disabled': accounts.length >= 3 }" 
            title="Maximum 3 accounts created"
            data-bs-toggle="modal" 
            :data-bs-target="accounts.length < 3 ? '#addAccountModal' : ''"
        >
            <i 
                class="bi bi-person-fill-add text-white"
                :class="{ 'bi bi-person-fill-slash': accounts.length >= 3 }"
            ></i>
        </div>

        <div 
            class="modal fade"
            id="addAccountModal" 
            tabindex="-1" 
            aria-labelledby="addAccountLabel" 
            aria-hidden="true" 
        >
            <div class="modal-dialog">
                <div class="modal-content p-3">
                    <div class="modal-header border-0 d-flex justify-content-center">
                        <h1 class="modal-title fs-4">What type of account would you like to create?</h1>
                        
                        <button 
                            type="button" 
                            class="btn-close position-absolute"
                            style="top: 1rem; right: 1rem;"
                            data-bs-dismiss="modal" 
                            aria-label="Close"
                        >
                        </button>
                    </div>
                    <div class="modal-body pt-3 pb-4">
                        <fieldset class="d-flex justify-content-center fs-5">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="accountType" id="savings" value="SAVINGS"
                                    v-model="accountType">
                                <label class="form-check-label" for="savings">
                                    Savings
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="accountType" id="checking" value="CHECKING"
                                    v-model="accountType" checked>
                                <label class="form-check-label" for="checking">
                                    Checking
                                </label>
                            </div>
                        </fieldset>
                    </div>
                    <div class="modal-footer mx-auto border-0">
                        <button 
                            @click="handleCreateAccount" 
                            type="button" 
                            class="btn btn-primary"
                        >
                            Create account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}

export default AddAcountBtn;
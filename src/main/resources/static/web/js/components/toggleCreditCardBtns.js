import { createCard } from "../services/cardService.js";
import { removeCard } from "../services/cardService.js";

import clientMixin from "../mixins/clientMixin.js";

const ToggleCreditCardBtns = {
    mixins: [clientMixin],
    
    data() {
        return {
            cardType: "CREDIT",
            cardColor: "",
            cardId: "",
            errorMessage: "",
        }
    },

    computed: {
        creditCards() {
            if(!this.client || !this.client.cards) return [];
            return this.client.cards
            .filter(card => card.isActive && card.type === 'CREDIT');
        },
    },

    methods: {
        handleCreateCard() {
            if (this.cardColor == "") {
                this.errorMessage = "You must select a card color";
                return
            }
            this.errorMessage = ""

            Swal.fire({
                scrollbarPadding: false,
                title: 'Are you sure you want to create a new card?',
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
                    createCard(this.cardColor, this.cardType)
                        .then(res => {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Your new card has been created!',
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
                            this.cardColor = "";
                        })
                        .catch(error => {
                            this.$root.isLoading = false; 

                            console.log(error);

                            if (error.response) {
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
        },
        handleRemoveCard() {
            if (this.cardId == "") {
                this.errorMessage = "You must select a card";
                return
            }
            this.errorMessage = ""

            Swal.fire({
                scrollbarPadding: false,
                title: 'Are you sure you want to delete this card?',
                icon: 'warning',
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
                    removeCard(this.cardId)
                    .then(res => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your card has been deleted!',
                            showConfirmButton: true,
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'btn btn-primary btn-lg',
                            }
                        })
                        .then(result => {
                            if (result.isConfirmed) {
                                this.$root.isLoading = true;
                                document.location.reload()
                            }
                        })
                    })
                    .catch(error => {
                        this.$root.isLoading = false;
                        console.log(error);
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    })
                }
            })
        }
    },

    template: `
        <div class="cardBtns-container d-flex flex-column">
            <div 
                class="card-toggle-btn" 
                :data-bs-toggle="creditCards.length < 3 ? 'modal' : ''"
                :data-bs-target="creditCards.length < 3 ? '#addCreditCardModal' : ''"
                :class="{ 'disabled': creditCards.length >= 3 }"
                v-if="client"
                title="Maximum 3 credit cards created"
            >
                <i class="text-white" :class="creditCards.length >= 3 ? 'bi bi-file-lock2': 'bi bi-file-plus' "></i>

            </div>

            <div 
                class="card-toggle-btn"
                data-bs-toggle="modal" 
                data-bs-target="#removeCreditCardModal"
            >
                <i class="bi bi-trash3 text-white"></i>
            </div>
        </div>

        <div 
            class="modal fade"
            id="addCreditCardModal" 
            tabindex="-1" 
            aria-labelledby="addCardLabel" 
            aria-hidden="true" 
        >
            <div class="modal-dialog">
                <div class="modal-content p-3">
                    <div class="modal-header border-0 d-flex justify-content-center">
                        <h1 class="modal-title fs-4">What type of credit card would you like to create?</h1>
                        
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
                        <fieldset class="d-flex justify-content-center fs-5 gap-4">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="cardColor" id="csilver" value="SILVER"
                                    v-model="cardColor" checked>
                                <label class="form-check-label" for="csilver">
                                    Silver
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="cardColor" id="cgold" value="GOLD"
                                    v-model="cardColor">
                                <label class="form-check-label" for="cgold">
                                    Gold
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="cardColor" id="cplatinum" value="PLATINUM"
                                    v-model="cardColor">
                                <label class="form-check-label" for="cplatinum">
                                    Platinum
                                </label>
                            </div>
                            
                        </fieldset>
                        <div class="text-danger d-flex align-items-center justify-content-center pt-4" v-if="errorMessage">
                            <i class="bi bi-x-circle-fill fs-5 me-1"></i>
                            <p class="m-0 fs-5">
                                {{ errorMessage }}
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer mx-auto border-0">
                        <button 
                            @click="handleCreateCard" 
                            type="button" 
                            class="btn btn-primary"
                        >
                            Create card
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div 
            class="modal fade"
            id="removeCreditCardModal" 
            tabindex="-1" 
            aria-labelledby="removeCreditCardLabel" 
            aria-hidden="true" 
        >
            <div class="modal-dialog">
                <div class="modal-content p-3">
                    <div class="modal-header border-0 d-flex justify-content-center">
                        <h1 class="modal-title fs-4">What credit card would you like to remove?</h1>
                        
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
                        <fieldset class="d-flex justify-content-center fs-5 gap-4">
                        <select class="form-select" id="inputGroupSelect03" v-model="cardId">
                            <option value="" selected>Choose...</option>
                            <option 
                                v-for="creditCard in creditCards" 
                                :value="creditCard.id"
                            >{{ creditCard.color + ' ' + creditCard.number }}
                            </option>
                    </select>
                        </fieldset>
                        <div class="text-danger d-flex align-items-center justify-content-center pt-4" v-if="errorMessage">
                            <i class="bi bi-x-circle-fill fs-5 me-1"></i>
                            <p class="m-0 fs-5">
                                {{ errorMessage }}
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer mx-auto border-0">
                        <button 
                            @click="handleRemoveCard" 
                            type="button" 
                            class="btn btn-primary"
                        >
                            Remove card
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}

export default ToggleCreditCardBtns;
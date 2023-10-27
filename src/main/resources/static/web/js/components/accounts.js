import { removeAccount } from "../services/accountService.js";

import clientMixin from "../mixins/clientMixin.js";

const { ref } = Vue

const Accounts = {
    props: ['theme'],
    mixins: [clientMixin],

    data() {
        return {
            isDraggingX: false,
            containerX: ref(null),
            isMouseMoved: false,
        }
    },
    mounted() {
        this.containerX = this.$refs.containerX;
    },

    computed: {
        accounts() {
            return (this.client.accounts.filter(account => account.active)).sort((a, b) => a.id - b.id);
        }
    },
    methods: {
        handleRemoveAccount(accountId) {
            if (this.isMouseMoved) {
                this.isMouseMoved = false;
                return;
            }
            Swal.fire({
                scrollbarPadding: false,
                title: 'Are you sure you want to delete this account?',
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
                    removeAccount(accountId)
                    .then(res => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your account has been deleted!',
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
                        
                        Swal.fire({
                            scrollbarPadding: false,
                            icon: 'error',
                            title: 'Oh no!',
                            text: `${error.response.data}`,
                            confirmButtonText: 'Ok',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'btn btn-primary btn-lg',
                            }
                        })
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    })
                }
            })
        },
        toAccountDetail(accountId) {
            if (this.isMouseMoved) return;
            window.location.href = `/web/pages/account.html?id=${accountId}#`;
        },
        mouseMoveHandlerX(e) {
            if (!this.isDraggingX) return;
            this.containerX.scrollLeft -= e.movementX;
            this.isMouseMoved = true;
        },
        mouseDownHandlerX(e) {
            this.isDraggingX = true;
            this.isMouseMoved = false;
        },
        mouseUpHandlerX(e) {
            this.isDraggingX = false;
        },
    },
    template: `
        <div class="header">
            <h1 class="m-0" v-if="client">Welcome Back, {{ client.firstName }}</h1>
        </div>

        <div class="accounts">
            <div class="accounts-container" 
                ref="containerX" 
                @mousemove="mouseMoveHandlerX"
                @mousedown="mouseDownHandlerX" 
                @mouseup="mouseUpHandlerX"
            >
                <div class="account" 
                    :class="{ 'dark-theme': theme === 'dark' }" 
                    v-if="client"
                    v-for="account in accounts" 
                    @mousemove="mouseMoveHandlerX" 
                    @mousedown="mouseDownHandlerX"
                    @mouseup="mouseUpHandlerX" 
                    @click="toAccountDetail(account.id)"
                    >

                    <button 
                        class="deleteAccount" 
                        @click.stop="handleRemoveAccount(account.id)"
                    >
                        <i class="bi bi-x"></i>
                    </button>

                    <div class="semicircle"></div>

                    <div class="icon">
                        <i class="bi bi-people-fill"></i>
                        <p class="m-0 p-0 fw-bold">{{ account.type }}</p>
                    </div>

                    <div class="top">
                        <small>Nr. Account</small>
                        <h2>{{ account.number }}</h2>
                    </div>

                    <div class="middle">
                        <small>Amount</small>
                        <h1>$ {{ account.balance }}</h1>
                    </div>

                    <div class="bottom">
                        <div class="left">
                            <small>Account</small>
                            <h5>{{ client.firstName.toUpperCase() }}</h5>
                        </div>

                        <div class="right">
                            <small>Created</small>
                            <h5>{{ account.creationDate }}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <slot></slot>
        </div>
    `
}

export default Accounts;
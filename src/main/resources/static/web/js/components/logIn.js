import { logIn } from "../services/authService.js";
import loginMixin from "../mixins/loginMixin.js";

const LogIn = {
    mixins: [loginMixin], 

    data() {
        return {
            emailInput: "",
            passwordInput: "",

            showErrorMessage: false,
            errorMessage: ''
        };
    },
    methods: {
        handleLogIn() {
            logIn(this.emailInput, this.passwordInput)
                .then(response => {
                    if (this.emailInput.includes("admin")) {
                        window.location.href = "/web/pages/admin/manager.html";
                    } else {
                        window.location.href = "/web/pages/accounts.html";
                    }
                    this.emailInput = "";
                    this.passwordInput = "";
                    this.showErrorMessage = false;
                })
                .catch(error => {
                    console.log(error);

                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        this.showErrorMessage = true;
                        this.errorMessage = "Incorrect email or password.";
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        }
    },
    template: `
        <form class="pt-3" @submit.prevent="handleLogIn">
            <div class="form-group">
                <input 
                    type="email" 
                    placeholder="Email"
                    class="form-login form-control form-control-lg"
                    :class="showErrorMessage && (errorMessage == 'Incorrect email or password.' || emailInput == '') ? 'border-danger' : ''"
                    v-model="emailInput"
                    required
                >
            </div>
            <div class="form-group">
                <input 
                    type="password" 
                    placeholder="Password" 
                    class="form-login form-control form-control-lg" 
                    :class="showErrorMessage && (errorMessage == 'Incorrect email or password.' || passwordInput == '') ? 'border-danger' : ''"
                    v-model="passwordInput"
                    required
                >
            </div>
            <div class="mt-3">
                <button 
                    type="submit" 
                    class="btn btn-block btn-primary btn-lg auth-form-btn"
                    >SIGN IN
                </button>
            </div>

            <div class="text-danger d-flex align-items-center justify-content-center" v-if="showErrorMessage">
                <i class="bi bi-x-circle-fill me-1 pt-4"></i>

                <p class="m-0 pt-4" v-if='emailInput == "" || passwordInput == ""'>
                    Don't leave any fields empty.
                </p>

                <p class="m-0 pt-4" v-else>
                    {{ errorMessage }}
                </p>
            </div>

            <div class="my-2 d-flex justify-content-between align-items-center">
                <div class="form-check">
                    <label class="form-check-label text-muted">
                    <input type="checkbox" class="form-check-input">
                    Keep me signed in
                    <i class="input-helper"></i></label>
                </div>
                <a href="#" class="auth-link text-black">Forgot password?</a>
            </div>
            <div class="text-center mt-4 font-weight-light">
                Don't have an account? <a class="text-primary" @click="loginOrSignIn">Create</a>
            </div>
        </form>
    `
};

export default LogIn;
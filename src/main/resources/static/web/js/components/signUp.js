import { signUp } from "../services/authService.js";
import loginMixin from "../mixins/loginMixin.js";

const SignUp = {
    mixins: [loginMixin], 

    data() {
        return {
            fNameInput: '',
            lNameInput: '',
            emailInput: '',
            passwordInput: '',

            showErrorMessage: false,
            errorMessage: ''   
        };
    },
    methods: {
        handleSignUp() {
            signUp(this.emailInput, this.passwordInput, this.fNameInput, this.lNameInput)
            .then(() => {
                this.fNameInput = "";
                this.lNameInput = "";
                this.emailInput: '';
                this.passwordInput: '';
            })
            .catch(error => {
                console.log(error);
                
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    this.showErrorMessage = true;
                    this.errorMessage = error.response.data;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
        }
    },
    template: `
            <form class="pt-3" @submit.prevent="handleSignUp">
                <div class="form-group">
                    <input 
                        type="text" 
                        placeholder="Fistname"
                        class="form-login form-control form-control-lg" 
                        :class="showErrorMessage && fNameInput == '' ? 'border-danger' : ''"
                        v-model="fNameInput"
                        required
                    >
                </div>
                <div class="form-group">
                    <input 
                        type="text" 
                        placeholder="Lastname"
                        class="form-login form-control form-control-lg" 
                        :class="showErrorMessage && lNameInput == '' ? 'border-danger' : ''"
                        v-model="lNameInput"
                        required
                    >
                </div>
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
                        minlength="8"
                        maxlength="15"
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
                        >SIGN UP
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
                        <label class="form-check-label text-muted"  for="invalidCheck">
                            <input type="checkbox" class="form-check-input" value="" id="invalidCheck" required>
                                I agree to all Terms & Conditions
                        </label>
                    </div>
                </div>
                <div class="text-center mt-4 font-weight-light">
                    Already have an account? <a class="text-primary" @click="loginOrSignIn">Login</a>
                </div>
            </form>
    `
};

export default SignUp;

import { createClient } from "../services/clientService.js";

const ManagerForm = {
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errorMessage: "",
        }
    },

    methods: {
        handleCreateClient() {
            createClient(this.firstName, this.lastName, this.email, this.password)
            .then(() => {
                this.$root.isLoading = true; 
                document.location.reload();
                this.errorMessage = "";
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.password = "";
            })
            .catch(err => {
                this.$root.isLoading = false; 
                this.errorMessage = err.response.data;
            })
        }
    },

    computed: {

    },
    
    template: `
        <div class="col-12 grid-margin stretch-card flex-column">
            <div class="header mb-3">
                <h1 class="m-0">Client Manager</h1>
            </div>

            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Request Form</h4>
                    <form class="forms-transfer" @submit.prevent="handleCreateClient">
                        <div class="form-group">
                            <label for="firstName" class="form-label">First name:</label>
                            <input v-model="firstName" type="text" class="form-control" id="firstName" placeholder="Fistname" required>
                        </div>


                        <div class="form-group">
                            <label for="lastName" class="form-label">Last name:</label>
                            <input v-model="lastName" type="text" class="form-control" id="lastName" placeholder="Lastname" required>
                        </div>

                        <div class="form-group">
                            <label for="email" class="form-label">Email address:</label>
                            <input v-model="email" type="email" class="form-control" id="email" placeholder="Email" required>
                        </div>

                        <div class="form-group">
                            <label for="password" class="form-label">Password</label>
                            <input class="form-control" id="password" v-model="password" minlength="8" maxlength="15" required>
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

export default ManagerForm;
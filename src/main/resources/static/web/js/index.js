const { createApp, ref } = Vue

const options = {
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            userRegister: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
            isSignUp: false,
        }
    },
    methods: {
        signIn() {
            axios.post('/api/login', this.user, {headers:{'content-type':'application/x-www-form-urlencoded'}})
            .then(response => {
                if (this.user.email.includes('admin')) {
                    window.location.href = "/assets/pages/admin.html";
                } else {
                    window.location.href = "/assets/pages/accounts.html";
                }
            })
            .catch(err => {
                console.error(err); 
            });
        },

        toggle() {
            this.user.email = this.userRegister.email;
            this.user.password = this.userRegister.password;
        },

        signUp() {
            axios.post('/api/clients', this.userRegister, {headers:{'content-type':'application/x-www-form-urlencoded'}})
            .then(response => {
                this.user.email = this.userRegister.email;
                this.user.password = this.userRegister.password;
                this.signIn();
            })
            .catch(err => {
                console.error(err);
            });
        },
        toggleForm() {
            this.isSignUp = !this.isSignUp;
        }
    },
}

const app = createApp(options);
app.mount('#app');
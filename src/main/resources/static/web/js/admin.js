import NavbarAdmin from "./components/navbarAdmin.js";
import SidebarAdmin from "./components/sidebarAdmin.js";
import ManagerForm from "./components/managerForm.js";
import Clients from "./components/clients.js";
import LoanTypeForm from "./components/loanTyprForm.js";
import LoanTypesAdmin from "./components/loanTypesAdmin.js";

const { ref } = Vue

const app = Vue.createApp({
    data() {
        return {
            isSignUp: true,
            isSidebarOpen: true,
            theme: localStorage.getItem('theme') || 'light',
            isLoading: true,
            fullPage: true,
        }
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false;
        }, 3000);
    },

    computed: {
        currentPage() {
            return window.location.pathname.split("/").pop().split(".")[0];
        }
    },
    methods: {
        toggleSignUp() {
            this.isSignUp = !this.isSignUp;
        },
        toggleTheme(theme) {
            this.theme = theme;
            localStorage.setItem('theme', theme);
        },
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
    },
});
app.use(VueLoading.LoadingPlugin);
app.component('navbar', NavbarAdmin);
app.component('sidebar', SidebarAdmin);
app.component('manager-form', ManagerForm);
app.component('clients', Clients);
app.component('loan-form', LoanTypeForm);
app.component('loan-types', LoanTypesAdmin)

app.component('loading', VueLoading.Component);
app.mount('#app');
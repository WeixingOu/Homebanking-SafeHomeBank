import LogIn from './components/logIn.js';
import SignUp from './components/signUp.js';
import Navbar from './components/navbar.js';
import Sidebar from './components/sidebar.js';
import Accounts from './components/accounts.js';
import AddAcountBtn from './components/addAccountBtn.js';
import Report from './components/report.js';
import Transactions from './components/transactions.js';
import Loans from './components/loans.js';
import LoanChart from './components/loanChart.js';
import Footer from './components/footer.js';
import Cards from './components/cards.js';
import ToggleCreditCardBtns from './components/toggleCreditCardBtns.js';
import ToggleDebitCardBtns from './components/toggleDebitCardBtns.js';
import Promotions from './components/promotions.js';
import Accordion from './components/accordion.js';
import TransferForm from './components/transferForm.js';
import TransferNotidfication from './components/transferNotification.js';
import LoanForm from './components/loanForm.js';
import LoanNotification from './components/loanNotification.js';
import LoanTypes from './components/loanTypes.js';
import LoansActives from './components/loansActives.js';
import LoansPaid from './components/loansPaid.js';
import Account from './components/account.js';
import DownloadPdfForm from './components/dowloadPdfForm.js';

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
        handleTransferNotification(notification) {
            this.$refs.transferNotification.notifications.unshift(notification);

            localStorage.setItem('notificationsT', JSON.stringify(this.$refs.transferNotification.notifications));
        },
        handleLoanNotification(notification) {
            this.$refs.loanNotification.notifications.unshift(notification);

            localStorage.setItem('notificationsL', JSON.stringify(this.$refs.loanNotification.notifications));
        },
        handleLoanPaidNotification(notification) {
            this.$refs.loanPaidments.notifications.unshift(notification);

            localStorage.setItem('loansPaid', JSON.stringify(this.$refs.loanPaidments.notifications));
        },
    },
});
app.use(VueLoading.LoadingPlugin);
app.component('log-in', LogIn);
app.component('sign-up', SignUp);
app.component('navbar', Navbar);
app.component('sidebar', Sidebar);
app.component('accounts', Accounts);
app.component('add-account-btn', AddAcountBtn);
app.component('report', Report);
app.component('transactions', Transactions);
app.component('loans', Loans);
app.component('foot-er', Footer);
app.component('cards', Cards);
app.component('toggle-credit-card-btns', ToggleCreditCardBtns);
app.component('toggle-debit-card-btns', ToggleDebitCardBtns);
app.component('promotions', Promotions);
app.component('accordion', Accordion);
app.component('transfer-form', TransferForm);
app.component('transfer-notification', TransferNotidfication);
app.component('loan-form', LoanForm);
app.component('loan-notification', LoanNotification);
app.component('loan-types', LoanTypes);
app.component('loans-actives', LoansActives);
app.component('loans-paid', LoansPaid);
app.component('account', Account);
app.component('download-pdf-form', DownloadPdfForm);

app.component('loan-chart', LoanChart);
app.component('loading', VueLoading.Component);
app.mount('#app');
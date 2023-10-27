import accountMixin from "../mixins/accountMixin.js";
import clientMixin from "../mixins/clientMixin.js";

const Account = {
    props: ['theme'],
    mixins: [clientMixin, accountMixin],

    data() {
        return {
            showAll: false,
            moment: moment,
            selectedDate: null,
        }
    },

    computed: {
        totalDebit() {
            if (!this.account || !this.account.transactions) return 0;
    
            return this.account.transactions
                .filter(t => t.type === 'DEBIT')
                .reduce((acc, t) => acc + t.amount, 0);
        },
        totalCredit() {
            if (!this.account || !this.account.transactions) return 0;

            return this.account.transactions
                .filter(t => t.type === 'CREDIT')
                .reduce((acc, t) => acc + t.amount, 0);
        },
        filteredTransactions() {
            if (!this.account || !this.account.transactions) return [];
    
            if (!this.selectedDate) return this.account.transactions;
    
            return this.account.transactions.filter(transaction => {
                return this.moment(transaction.transferDate).format('YYYY-MM-DD') === this.selectedDate;
            });
        },
    },
    methods: {
        toggleShowAll() {
            if (this.filteredTransactions.length > 4) {
                this.showAll = !this.showAll;
            }
        },
    },
    template: `
        <div class="header">
            <h1 class="m-0">Account Details</h1>
        </div>

        <div class="accounts">
            <div class="accounts-container">
                <div class="account" 
                    :class="{ 'dark-theme': theme === 'dark' }" 
                    v-if="account"
                >
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
                            <h5  v-if="client">{{ client.firstName.toUpperCase() }}</h5>
                        </div>

                        <div class="right">
                            <small>Created</small>
                            <h5>{{ account.creationDate }}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex flex-column flex-md-row">
                <div class="account-detail">
                    <i class="bi bi-clipboard-data-fill"></i>
                    <div class="d-flex align-items-center justify-content-center flex-column">
                        <h4 class="fw-bold mb-2">Total Sales Debit</h4>
                        <h2>{{ totalDebit.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</h2>
                    </div>
                </div>
                <div class="account-detail">
                    <i class="bi bi-graph-up bg-success"></i>
                    <h4 class="fw-bold mb-2">Total Sales Credit</h4>
                    <h2>{{ totalCredit.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</h2>
                </div>
            </div>
        </div>

        <div class="recent-transactions">
            <div class="header">
                <h2>Transactions Resume</h2>
                <div class="date">
                    <input type="date" v-model="selectedDate">
                </div>
            </div>

            <table class="table bg-white table-hover" >
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Networth</th>
                    </tr>
                </thead>
                <tbody v-if="filteredTransactions.length">
                    <tr v-for="(transaction, index) in filteredTransactions" :key="transaction.id" v-show="showAll || index < 4">

                        <td>{{ transaction.id }}</td>
                        <td :class="{ 'text-success': transaction.type === 'CREDIT', 'text-danger': transaction.type === 'DEBIT' }">{{ transaction.type }}</td>
                        <td>{{ transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</td>
                        <td>{{ moment(transaction.transferDate).format('MM/DD/YYYY | hh:mm A') }}</td>
                        <td>{{ transaction.description }}</td>
                        <td>{{ transaction.currentBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</td>
                    </tr>
                </tbody>

                <tbody v-else>
                    <tr>
                        <td colspan="10">No transactions were found for the selected date.</td>
                    </tr>
                </tbody>

                <tfoot>
                    <th colspan="10"><a @click="toggleShowAll">{{ showAll ? 'Show Less' : 'Show All' }}</a></th>
                </tfoot>
            </table>
        </div>
    `
}

export default Account;
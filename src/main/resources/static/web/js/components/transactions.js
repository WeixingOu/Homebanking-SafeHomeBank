import clientMixin from "../mixins/clientMixin.js";

const Transactions = {
    mixins: [clientMixin],

    data() {
        return {
            showAll: false,
        }
    },

    methods: {
        toggleShowAll() {
            if (this.transactions.length > 4) {
                this.showAll = !this.showAll;
            }
        }
    },
    computed: {
        transactions() {
            if (!this.client || !this.client.accounts) {
                return [];
            }
        
            return this.client.accounts.reduce((acc, account) => {
                return acc.concat(account.transactions.map(transaction => {
                    transaction.accountNumber = account.number;
                    return transaction;
                }));
            }, []).sort((a, b) => {
                return new Date(b.transferDate) - new Date(a.transferDate);
            }).map(transaction => {
                transaction.transferDate = moment(transaction.transferDate).format('MM/DD/YYYY | hh:mm A');
                return transaction;
            });
        }
    },
    template: `
        <div class="recent-transactions">
            <h2>Recent Activities</h2>

            <table class="table bg-white table-hover">
                <thead>
                    <tr>
                        <th scope="col">Account</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Networth</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaction, index) in transactions" :key="transaction.id" v-show="showAll || index < 4">
                        <td>{{ transaction.accountNumber }}</td>
                        <td :class="{ 'text-success': transaction.type === 'CREDIT', 'text-danger': transaction.type === 'DEBIT' }">{{ transaction.type }}</td>
                        <td>{{ transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</td>
                        <td>{{ transaction.transferDate }}</td>
                        <td>{{ transaction.description }}</td>
                        <td>{{ transaction.currentBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <th colspan="10"><a @click="toggleShowAll">{{ showAll ? 'Show Less' : 'Show All' }}</a></th>
                </tfoot>
            </table>
        </div>
    `
}

export default Transactions;
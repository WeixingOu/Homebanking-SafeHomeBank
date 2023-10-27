import adminMixin from "../mixins/adminMixin.js";

const LoanTypesAdmin = {
    mixins: [adminMixin],

    data() {
        return {
            showAll: false,
        }
    },

    methods: {
        toggleShowAll() {
            if (this.allLoans.length > 4) {
                this.showAll = !this.showAll;
            }
        }
    },
    computed: {
        
    },
    template: `
        <div class="client-list">
            <h2>Loan Types List</h2>

            <table class="table bg-white table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Max Amount</th>
                        <th scope="col">Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(loan, index) in allLoans" :key="loan.email" v-show="showAll || index < 4">
                        <td>{{ loan.name }}</td>
                        <td>{{ '$' + loan.maxAmount }}</td>
                        <td>{{ loan.percentage + '%' }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <th colspan="10"><a @click="toggleShowAll">{{ showAll ? 'Show Less' : 'Show All' }}</a></th>
                </tfoot>
            </table>
        </div>
    `
}

export default LoanTypesAdmin;
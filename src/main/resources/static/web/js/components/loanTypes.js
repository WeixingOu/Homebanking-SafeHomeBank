import clientMixin from "../mixins/clientMixin.js";
import { getLoanTyeps } from "../services/loanService.js";

const LoanTypes = {
    mixins: [clientMixin],

    data() {
        return {
            loanTypes: null,
        }
    },

    created() {
        getLoanTyeps().then(res => {
            this.loanTypes = res;
        })
        .catch(err => console.error(err))
    },

    template: `
        <div class="header">
            <h2 class="m-0" v-if="client">Our Types of Loans</h2>
            <h3 class="mt-3 fw-light">We provide online instant cash loans with quick approval that suit your term.</h3>
        </div>

        <div class="row mt-4 gx-5">
            <div 
                class="col-md-4 stretch-card"
                v-if="client && loanTypes" 
                v-for="loanType in loanTypes"
            >
                <div class="card card-tale">
                    <div class="card-body d-flex justify-content-center flex-column align-items-center">
                        <img class="img-fluid"
                            :src="'../../assets/images/' + loanType.name.toLowerCase() + '.png'" 
                            :alt="loanType.name + ' icono'"
                        >
                        <p class="mt-4">{{ loanType.name }} Loan</p>
                        <p class="mt-4">$3000 - {{ '$' + loanType.maxAmount }}</p>
                        <p class="mt-4">Interest rate - {{ loanType.percentage + '%' }} pa fixed</p>

                        <a href="./borrow.html" class="btn btn-primary mt-4">Apply Now</a>
                    </div>
                </div>
            </div>
        </div>
    `
}

export default LoanTypes;
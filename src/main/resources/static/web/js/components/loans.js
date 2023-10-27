import clientMixin from "../mixins/clientMixin.js";

const { ref } = Vue

const Loans = {
    mixins: [clientMixin],

    data() {
        return {
            isDraggingY: false,
            containerY: ref(null),
        }
    },
    mounted() {
        this.containerY = this.$refs.containerY;
    },

    computed: {
        loans() {
            return (this.client.loans.filter(loan => loan.active)).sort((a, b) => a.id - b.id);
        }
    },
    methods: {
        mouseMoveHandlerY(e) {
            if (!this.isDraggingY) return;
            this.containerY.scrollTop -= e.movementY;
        },
        mouseDownHandlerY(e) {
            this.isDraggingY = true;
        },
        mouseUpHandlerY(e) {
            this.isDraggingY = false;
        },
        wheelHandlerY(e) {
            e.preventDefault();
            this.containerY.scrollTop += e.deltaY;
        },
    },
    template: `
        <div class="loans">
            <div class="header">
                <h2 class="m-0">Loan History</h2>
                <a href="./loans.html">More <i class="bi bi-chevron-right"></i></a>
            </div>

            <div class="loan-container" 
                ref="containerY" 
                @mousemove="mouseMoveHandlerY"
                @mousedown="mouseDownHandlerY" 
                @mouseup="mouseUpHandlerY" 
                @wheel="wheelHandlerY"
            >
                <div class="loan" 
                    @mousemove="mouseMoveHandlerY" 
                    @mousedown="mouseDownHandlerY"
                    @mouseup="mouseUpHandlerY" 
                    @wheel="wheelHandlerY" 
                    v-if="client && loans.length" 
                    v-for="loan in loans"
                >
                    <img class="img-fluid"
                        :src="'../../assets/images/' + loan.name.toLowerCase() + '.png'" 
                        :alt="loan.name + ' icono'"
                    >
                    <h4>{{ loan.name }}</h4>
                    <div class="date-time">
                        <p class="m-0">{{ loan.loanId }}</p>
                        <small class="text-muted">Loan Id</small>
                    </div>
                    <div class="payments">
                        <p class="m-0">{{ loan.payments }}</p>
                        <small class="text-muted">Payments</small>
                    </div>
                    <div class="amount">
                        <h4>{{ loan.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</h4>
                    </div>
                </div>
                <div class="loan" v-else>
                    <h4 class="text-center">You has not requested any loan yet.</h4>
                </div>
            </div>
        </div>
    `
}

export default Loans;
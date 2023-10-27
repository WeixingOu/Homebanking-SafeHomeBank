import clientMixin from "../mixins/clientMixin.js";

const { ref } = Vue

const LoansPaid = {
    mixins: [clientMixin],

    data() {
        return {
            isDraggingY: false,
            containerY: ref(null),
            notifications: this.loadloansPaidNoticationFromLocalStorage(),
        }
    },
    mounted() {
        this.containerY = this.$refs.containerY;
    },

    methods: {
        loadloansPaidNoticationFromLocalStorage() {
            const storedNotifications = localStorage.getItem('loansPaid');
            return storedNotifications ? JSON.parse(storedNotifications) : [];
        },
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
                <h2 class="m-0">Paid Loans</h2>
            </div>

            <div class="loan-container" 
                ref="containerY" 
                @mousemove="mouseMoveHandlerY"
                @mousedown="mouseDownHandlerY" 
                @mouseup="mouseUpHandlerY" 
                @wheel="wheelHandlerY"
            >
                <div class="loan align-items-center" 
                    @mousemove="mouseMoveHandlerY" 
                    @mousedown="mouseDownHandlerY"
                    @mouseup="mouseUpHandlerY" 
                    @wheel="wheelHandlerY"
                    v-if="notifications.length" v-for="notification in notifications" :key="notification.id"
                >
                    <h4 class="text-info-emphasis m-0">{{ notification.loanAccount }}</h4>
                    <h4 class="m-0">{{ notification.loan.name }}</h4>
                    <div class="date-time">
                        <p class="m-0">{{ notification.loan.id }}</p>
                    </div>
                    <div class="amount">
                        <h4 class="text-info-emphasis">{{ notification.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</h4>
                    </div>
                    <div class="payments">
                        <p class="text-muted m-0">{{ notification.time }}</p>
                    </div>
                    
                </div>
                <div class="loan" v-else>
                    <h4 class="text-center">You has not paid any loan yet.</h4>
                </div>
            </div>
        </div>
    `
}

export default LoansPaid;
import clientMixin from "../mixins/clientMixin.js";

const Report = {
    mixins: [clientMixin],

    computed: {
        incomeCurrent() {
            if (!this.client || !this.client.accounts) return 0;

            return this.client.accounts.filter(account => account.active).reduce((acc, account) => {
                return acc + account.transactions.filter(t => t.type === "CREDIT").reduce((sum, t) => sum + t.amount, 0);
            }, 0);
        },
        incomeLastMonth() {
            if (!this.client || !this.client.accounts) return 0;

            let currentDate = new Date();
            let lastMonth = currentDate.getMonth() - 1;

            if (lastMonth < 0) {
                lastMonth = 11;
                currentDate.setFullYear(currentDate.getFullYear() - 1); 
            }

            return this.client.accounts.filter(account => account.active).reduce((acc, account) => {
                return acc + account.transactions.filter(t => 
                    t.type === "CREDIT" && 
                    new Date(t.transferDate).getMonth() === lastMonth &&
                    new Date(t.transferDate).getFullYear() === currentDate.getFullYear()  
                ).reduce((sum, t) => sum + t.amount, 0);
            }, 0);
        },
        incomePercentage() {
            if (this.incomeLastMonth === 0) {
                return this.incomeCurrent > 0 ? 100 : 0;
            }
            return ((this.incomeCurrent - this.incomeLastMonth) / this.incomeLastMonth) * 100;
        },

        expenseCurrent() {
            if (!this.client || !this.client.accounts) return 0;

            return this.client.accounts.filter(account => account.active).reduce((acc, account) => {
                return acc + account.transactions.filter(t => t.type === "DEBIT").reduce((sum, t) => sum + t.amount, 0);
            }, 0);
        },
        expenseLastMonth() {
            if (!this.client || !this.client.accounts) return 0;

            let currentDate = new Date();
            let lastMonth = currentDate.getMonth() - 1;

            if (lastMonth < 0) {
                lastMonth = 11;
                currentDate.setFullYear(currentDate.getFullYear() - 1); 
            }

            return this.client.accounts.filter(account => account.active).reduce((acc, account) => {
                return acc + account.transactions.filter(t => 
                    t.type === "DEBIT" && 
                    new Date(t.transferDate).getMonth() === lastMonth &&
                    new Date(t.transferDate).getFullYear() === currentDate.getFullYear()  
                ).reduce((sum, t) => sum + t.amount, 0);
            }, 0);
        },
        expensePercentage() {
            if (this.expenseLastMonth=== 0) {
                return this.incomeCurrent > 0 ? 100 : 0;
            }
            return ((this.incomeCurrent - this.incomeLastMonth) / this.incomeLastMonth) * 100;
        },

        balanceCurrent() {
            return this.incomeCurrent + this.expenseCurrent;
        },
        balanceLastMonth() {
            return this.incomeLastMonth + this.expenseLastMonth;
        },
        balancePercentage() {
            if (this.balanceLastMonth === 0) {
                return this.balanceCurrent > 0 ? 100 : 0;
            }
            return ((this.balanceCurrent - this.balanceLastMonth) / this.balanceLastMonth) * 100;
        },
        

        turnoverCurrent() {
            if (!this.client || !this.client.accounts) return 0;
        
            return this.client.accounts.filter(account => account.active).reduce((acc, account) => {
                return acc + account.transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
            }, 0);
        },
        turnoverLastMonth() {
            if (!this.client || !this.client.accounts) return 0;
        
            let currentDate = new Date();
            let lastMonth = currentDate.getMonth() - 1;
        
            if (lastMonth < 0) {
                lastMonth = 11;
                currentDate.setFullYear(currentDate.getFullYear() - 1); 
            }
        
            return this.client.accounts.filter(account => account.active).reduce((acc, account) => {
                return acc + account.transactions.filter(t => 
                    new Date(t.transferDate).getMonth() === lastMonth &&
                    new Date(t.transferDate).getFullYear() === currentDate.getFullYear()
                ).reduce((sum, t) => sum + Math.abs(t.amount), 0);
            }, 0);
        },
        turnoverPercentage() {
            if (this.turnoverLastMonth === 0) {
                return this.turnoverCurrent > 0 ? 100 : 0;
            }
            return ((this.turnoverCurrent - this.turnoverLastMonth) / this.turnoverLastMonth) * 100;
        },
    },
    template: `
        <div class="monthly-report pt-5">
            <div class="report">
                <h3>Income</h3>
                <div>
                    <details>
                        <h1>{{ '$'+incomeCurrent.toLocaleString('en-US') }}</h1>
                        <h6 class="text-success">+{{ incomePercentage }}%</h6>
                    </details>
                    <p class="text-muted">Compared to {{ '$'+incomeLastMonth.toLocaleString('en-US') }} last month</p>
                </div>
            </div>
            <div class="report">
                <h3>Expenses</h3>
                <div>
                    <details>
                        <h1>{{ '$'+expenseCurrent.toLocaleString('en-US') }}</h1>
                        <h6 class="text-danger">-{{ expensePercentage }}%</h6>
                    </details>
                    <p class="text-muted">Compared to {{ '$'+expenseLastMonth.toLocaleString('en-US') }} last month</p>
                </div>
            </div>
            <div class="report">
                <h3>Balance</h3>
                <div>
                    <details>
                        <h1>{{ '$' + balanceCurrent.toLocaleString('en-US') }}</h1>
                        <h6 :class="balancePercentage > 0 ? 'text-success' : 'text-danger'">
                            {{ balancePercentage > 0 ? '+' : '-' }}{{ balancePercentage.toFixed(2) }}%
                        </h6>
                    </details>
                    <p class="text-muted">Compared to {{ '$' + balanceLastMonth.toLocaleString('en-US') }} last month</p>
                </div>
            </div>
            <div class="report">
                <h3>Turnover</h3>
                <div>
                    <details>
                        <h1>{{ '$' + turnoverCurrent.toLocaleString('en-US') }}</h1>
                        <h6 :class="turnoverPercentage > 0 ? 'text-success' : 'text-danger'">
                            {{ turnoverPercentage > 0 ? '+' : '-' }}{{ turnoverPercentage.toFixed(2) }}%
                        </h6>
                    </details>
                    <p class="text-muted">Compared to {{ '$' + turnoverLastMonth.toLocaleString('en-US') }} last month</p>
                </div>
            </div>
    </div>
    `
}

export default Report;
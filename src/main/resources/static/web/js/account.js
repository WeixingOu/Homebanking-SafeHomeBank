const { createApp, ref } = Vue

const options = {
    data() {
        return {
            isDraggingX: false,
            containerX: ref(null),

            isSidebarOpen: false,

            theme: localStorage.getItem('theme') || 'light',

            chart: null,

            account: {},
            transactions: [],

            totalDebit: 0,
            totalCredit: 0,

            selectedDate: null,
        }
    },
    mounted() {
        this.containerX = this.$refs.containerX;

        this.checkWindowSize();
        window.addEventListener('resize', this.checkWindowSize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkWindowSize);
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            const urlParams = new URLSearchParams(window.location.search);
            const accountId = urlParams.get('id');

            axios.get(`/api/account/${accountId}`)
            .then(res => {
                this.account = res.data;
                this.transactions = this.account.transactions;

                this.account.creationDate = moment(this.account.creationDate).format('DD/MM/YY');

                this.account.transactions.slice().sort((a, b) => b.id - a.id);

                this.account.transactions.forEach(transaction => {
                    transaction.date = moment(transaction.date).format('DD/MM/YY');
                });

                this.totalDebit = this.account.transactions.filter(transaction => transaction.type === 'DEBIT').reduce((sum, transaction) => sum + transaction.amount, 0);
                this.totalCredit = this.account.transactions.filter(transaction => transaction.type === 'CREDIT').reduce((sum, transaction) => sum + transaction.amount, 0);

                this.renderChart();
            })
            .catch(err => {
                console.error(err);
            });
        },

        transactionsLast24Hours(type) {
        const oneDayAgo = new Date(Date.now() - 24*60*60*1000);
        return this.transactions.filter(transaction => transaction.type === type && new Date(transaction.date) > oneDayAgo).reduce((sum, transaction) => sum + transaction.amount, 0);
        },
        totalTransactions(type) {
        return this.transactions.filter(transaction => transaction.type === type).length;
        },
        percentageIncrease(type) {
        const recent = this.transactionsLast24Hours(type);
        if (this.account.balance === 0) return 0;
        return ((recent / this.account.balance) * 100).toFixed(2);
        },

        renderChart(){
        this.$nextTick(() => {
                const options = {
                    series: [
                        {
                            name: "Amount",
                            data: this.account.transactions.map(t => t.amount),
                        },
                    ],
                    chart: {
                        type: "area",
                        height: "auto",
                        width: "340px"
                    },
                    fill: {
                        colors: ["#fff"],
                        type: "gradient",
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "smooth",
                        colors: ["#429cd4"],
                    },
                    xaxis: {
                        type: 'category',
                        categories: this.account.transactions.map(t => moment(t.date, 'DD/MM/YY').format('DD/MM')),
                    },
                    grid: {
                        show: false,
                    },
                    yaxis: {
                        show: false
                    },
                    toolbar:{
                        show: false
                    }
                };
                this.chart = new ApexCharts(this.$refs.canvas, options);
                this.chart.render();
            })
        },
        mouseMoveHandlerX(e) {
            if (!this.isDraggingX) return;
            this.containerX.scrollLeft -= e.movementX;
        },
        mouseDownHandlerX(e) {
            this.isDraggingX = true;
        },
        mouseUpHandlerX(e) {
            this.isDraggingX = false;
        },

        checkWindowSize() {
            this.isSidebarOpen = window.innerWidth > 768;
        },

        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },

        setTheme(theme) {
            this.theme = theme;
            localStorage.setItem('theme', theme);
        },
    },
    computed: {
        filteredTransactions() {
            if (!this.selectedDate) {
                return this.transactions;
            }
            const selectedTimestamp = new Date(this.selectedDate).getTime();
            return this.transactions.filter(transaction => {
                const transactionTimestamp = new Date(transaction.date).getTime();
                return transactionTimestamp === selectedTimestamp;
            });
        }
    }
}

const app = createApp(options);
app.mount('#app');
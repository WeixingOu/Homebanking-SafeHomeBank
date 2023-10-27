import clientMixin from "../mixins/clientMixin.js";

const LoanChart = {
    mixins: [clientMixin],

    data() {
        return {
            options : {
                series: [],
                label: [],
                chart: {
                    type: "pie",
                    height: "auto",
                    width: "340px"
                },
                theme: {
                    monochrome: {
                        enabled: true
                    }
                },
                legend: {
                    show: false
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                        offset: -5
                        }
                    }
                },
                dataLabels: {
                formatter(val, opts) {
                    const name = opts.w.globals.labels[opts.seriesIndex]
                    return [name, val.toFixed(1) + '%']
                }
                },
            },
            loans: null,
        }
    },

    mounted() {
        this.loadLoans();
        this.renderChart();
    },

    watch: {
        client: {
            deep: true,
            handler(newVal, oldVal) {
                if (newVal) {
                    this.loadLoans();
                    this.renderChart();
                }
            }
        }
    },
    methods: {
        loadLoans() {
            if (!this.client || !this.client.loans) {
                return this.loans = [];
            }
            return this.loans = this.client.loans.sort((a, b) => a.id - b.id);
        },
        renderChart() {
            this.options.series = this.loans.map(loan => loan.amount);
            this.options.labels = this.loans.map(loan => loan.name);

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new ApexCharts(document.querySelector("#chart"), this.options);
            this.chart.render();
        },
        updateChart() {
            if (this.chart) {
                if (this.chart) {
                    this.chart.destroy();
                }

                const newSeries = this.loans.map(loan => loan.amount);
                this.chart.updateSeries([{
                    data: newSeries
                }]);
            }
        },
    },

    template: `
        <div class="review">
            <div class="header">
                <h2 class="m-0">Loan Review</h2>
            </div>
            <div class="chart" id="chart">
            </div>
        </div>
    `
}

export default LoanChart;
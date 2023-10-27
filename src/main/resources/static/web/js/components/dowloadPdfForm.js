import { downloadTransactions } from "../services/transferService.js";

import accountMixin from "../mixins/accountMixin.js";

const DownloadPdfForm = {
    mixins: [accountMixin],

    data() {
        return {
            dateStartInput: '',
            dateEndInput: '',
            errorMessage: '',
        }
    },

    methods: {
        handleDownloadTransactions() {
            if (this.dateStartInput == "" || this.dateEndInput == "") {
                this.errorMessage = "Please enter a start and ending date.";
                return
            }

            this.dateStartInput = this.dateStartInput.replace('T', ' ');
            this.dateEndInput = this.dateEndInput.replace('T', ' ');

            downloadTransactions(this.dateStartInput, this.dateEndInput, this.account.number)
            .then(res => {
                if (!res || !res.data) {
                    throw new Error('No data received from the API.');
                }
                
                // Creates a Blob object with the PDFs content and creates a URL
                let blob = new Blob([res.data], { type: "application/pdf" });
                let url = window.URL.createObjectURL(blob);

                // Creates a link to download the PDF
                let a = document.createElement("a");
                a.href = url;
                a.download = "Transactions_Mindhub_Bank.pdf";

                // Simulates a click to start the download
                document.body.appendChild(a);
                a.click();

                // Cleans the URL object
                window.URL.revokeObjectURL(url);

                this.dateStartInput = '';
                this.dateEndInput = '';
                this.errorMessage = '';
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.errorMessage = e.target.result;
                    };
                    reader.readAsText(error.response.data);
                } else {
                    console.error('Error fetching data:', error);
                }
            })
        }
    },

    template: `
        <div class="downloadForm-layout card">
            <div class="header pb-0">
                <h2 class="m-0">Download transactions as PDFs</h2>
            </div>

            <div class="downloadForm-container">
                <div class="downloadForm">
                    <div class="row w-100">
                        <div class="col-8">
                            <form 
                                @submit.prevent="handleDownloadTransactions"
                                class="account-form d-flex flex-column justify-content-md-evenly" 
                            >
                                <div class="mb-3 text-start">
                                    <label class="form-label" for="dateStart">
                                        Choose a starting date:
                                    </label>
                                    <input class="form-control" v-model="dateStartInput" type="datetime-local" id="dateStart" name="dateStart">
                                </div>
                                <div class="text-start">
                                    <label class="form-label" for="dateEnd">
                                        Choose an end date:
                                    </label>
                                    <input class="form-control" v-model="dateEndInput" type="datetime-local" id="dateEnd" name="dateEnd">
                                </div>
                                <button type="submit" class="btn btn-primary my-4 py-2 px-4 d-flex align-items-center justify-content-center column-gap-2">
                                    <i class="bi bi-download"></i>
                                    Download PDF
                                </button>
                            </form>
                        </div>

                        <div class="col-4">
                            <img src="../../../assets/images/pdf.avif" class="img-fluid pt-4">
                        </div>

                        <template v-if="errorMessage">
                            <div class="text-danger d-flex align-items-center justify-content-center">
                                <i class="bi bi-x-circle-fill fs-5 me-1"></i>
                                {{ errorMessage }}
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    `
}

export default DownloadPdfForm;
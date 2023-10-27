import { getClients } from "../services/clientService.js";
import { getLoanTyeps } from "../services/loanService.js";

export default {
    data() {
        return {
            clients: [],
            restResponse: null,

            allLoans: [],
        }
    },
    created() {
        getClients().then(res => {
            if (res && res._embedded) {
                this.clients = res._embedded.clients;
            } else {
                console.error('Unexpected response format:', res);
            }
            
            this.restResponse = res;
            this.clients = res._embedded.clients;
        })
        .catch(err => console.error(err))

        getLoanTyeps().then(res => {
            if (res) {
                this.allLoans = res;
                console.log(this.allLoans)
            } else {
                console.error('Unexpected response format:', res);
            }
        })
        .catch(err => console.error(err))
    }
};
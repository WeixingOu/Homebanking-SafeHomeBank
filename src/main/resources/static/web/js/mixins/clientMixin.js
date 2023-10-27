import { getClientProfile } from "../services/clientService.js";

export default {
    data() {
        return {
            client: null,
        }
    },
    created() {
        getClientProfile().then(profile => {
            this.client = profile;
        })
        .catch(err => console.error(err))
    }
};
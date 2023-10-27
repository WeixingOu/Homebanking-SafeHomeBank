import { getCurrentAccount } from "../services/accountService.js";

export default {
    data() {
        return {
            account: null,
        }
    },
    computed: {
        accountId() {
            const urlParams = new URLSearchParams(location.search);
            return urlParams.get("id");
        }
    },
    created() {
        getCurrentAccount(this.accountId).then(data => {
            this.account = data;
        })
        .catch(err => console.error(err))
    }
};
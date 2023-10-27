export default {
    methods: {
        loginOrSignIn() {
            this.$emit('toggle-sign-up');
            this.showErrorMessage = false;
        }
    }
};
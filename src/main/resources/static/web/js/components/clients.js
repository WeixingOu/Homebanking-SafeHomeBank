import adminMixin from "../mixins/adminMixin.js";

const Clients = {
    mixins: [adminMixin],

    data() {
        return {
            showAll: false,
        }
    },

    methods: {
        toggleShowAll() {
            if (this.clients.length > 4) {
                this.showAll = !this.showAll;
            }
        }
    },
    computed: {
        
    },
    template: `
        <div class="client-list">
            <h2>Clients List</h2>

            <table class="table bg-white table-hover">
                <thead>
                    <tr>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(client, index) in clients" :key="client.email" v-show="showAll || index < 4">
                        <td>{{ client.firstName }}</td>
                        <td>{{ client.lastName }}</td>
                        <td>{{ client.email }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <th colspan="10"><a @click="toggleShowAll">{{ showAll ? 'Show Less' : 'Show All' }}</a></th>
                </tfoot>
            </table>
        </div>
    `
}

export default Clients;
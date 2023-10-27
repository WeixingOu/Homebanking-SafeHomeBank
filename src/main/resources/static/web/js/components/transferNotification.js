const TransferNotidfication = {
    data() {
        return {
            notifications: this.loadTNotificationsFromLocalStorage(),
        }
    },

    methods: {
        loadTNotificationsFromLocalStorage() {
            const storedNotifications = localStorage.getItem('notificationsT');
            return storedNotifications ? JSON.parse(storedNotifications) : [];
        },
        deleteTNotification(index) {
            this.notifications.splice(index, 1);
            localStorage.setItem('notificationsT', JSON.stringify(this.notifications));
        }
    },

    template: `
        <div class="col-12 grid-margin stretch-card mt-3">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title m-0">Transfer Notification</h4>
                </div>

                <ul class="icon-data-list" v-if="notifications.length">
                    <li class="position-relative" v-for="(notification, index) in notifications">
                        <div class="d-flex">
                            <div class="icon bg-success d-flex align-items-center justify-content-center">
                                <i class="bi bi-bank2 text-white fs-4"></i>
                            </div>

                            <div>
                                <p class="m-0 mb-1 fs-6"><strong>{{ notification.title }}</strong></p>
                                <p class="m-0 fs-6">{{ notification.message }}</p>
                                <small class="text-muted fs-6">{{ notification.time }}</small>
                            </div>
                        </div>

                        <div>
                            <button @click="deleteTNotification(index)" class="btn-bi-x">
                                <i class="bi bi-x text-muted"></i>
                            </button>
                        </div>
                    </li>
                </ul>

                <ul class="icon-data-list" v-else>
                    <li>
                        <div class="d-flex" >
                            <div>
                                <p class="m-0 fs-5">No notifications.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `
}
export default TransferNotidfication;
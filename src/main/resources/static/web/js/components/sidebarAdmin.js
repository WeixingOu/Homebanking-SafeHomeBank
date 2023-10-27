import { logOut } from "../services/authService.js"

import sidebarMixin from "../mixins/sidebarMixin.js";

const SidebarAdmin = {
    props: ['isSidebarOpen', 'currentPage'],
    mixins: [sidebarMixin],
    methods: {
        handleLogOut() {
            Swal.fire({
                scrollbarPadding: false,
                title: 'Are you sure you want to log out?',
                icon: 'warning',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-secondary btn-lg me-4'
                },
                showCancelButton: true,
                confirmButtonText: 'Log out',
                cancelButtonText: 'Cancel',
                reverseButtons: true
                }).then(result => {
                    if (result.isConfirmed) {
                        logOut().then(() => {
                            window.location.href = '/web/index.html';
                        })
                    }
                })
        }
    },
    template: `
        <aside v-show="isSidebarOpen" >
            <button id="close-btn" @click="toggleSidebar">
                <i class="bi bi-x"></i>
            </button>

            <div class="sidebar">
                <a href="./manager.html" class="text-secondary"
                    :class="{ 'active': currentPage === 'manager' }"
                >
                    <i class="bi bi-person-fill-gear"></i>
                    <h4>Client Manager</h4>
                </a>
                <a href="./loan.html" class="text-secondary"
                    :class="{ 'active': currentPage === 'loan' }"
                >
                    <i class="bi bi-node-plus-fill"></i>
                    <h4>Loan Manager</h4>
                </a>
                <a href="" class="text-secondary" @click.prevent="handleLogOut">
                    <i class="bi bi-box-arrow-right"></i>
                    <h4>Logout</h4>
                </a>
            </div>
        </aside>
    `
}

export default SidebarAdmin;
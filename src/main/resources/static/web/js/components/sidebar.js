import { logOut } from "../services/authService.js"

import sidebarMixin from "../mixins/sidebarMixin.js";

const Sidebar = {
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
                <a href="./accounts.html" class="text-secondary"
                    :class="{ 'active': currentPage === 'accounts' || currentPage === 'account' }"
                >
                    <i class="bi bi-person-lines-fill"></i>
                    <h4>Accounts</h4>
                </a>
                <a href="./cards.html" class="text-secondary"
                    :class="{ 'active': currentPage === 'cards' }"
                >
                    <i class="bi bi-credit-card"></i>
                    <h4>Cards</h4>
                </a>
                <a href="./transfer.html" class="text-secondary"
                    :class="{ 'active': currentPage === 'transfer' }"
                >
                    <i class="bi bi-arrow-left-right"></i>
                    <h4>Transfer</h4>
                </a>
                <a href="./loans.html" class="text-secondary"
                    :class="{ 'active': currentPage === 'loans' }"
                >
                    <i class="bi bi-cash-coin"></i>
                    <h4>Loans</h4>
                </a>
                <a href="./borrow.html" class="text-secondary"
                    :class="{ 'active': currentPage === 'borrow' }"
                >
                    <i class="bi bi-cash-stack"></i>
                    <h4>Borrow</h4>
                </a>
                <a href="" class="text-secondary" @click.prevent="handleLogOut">
                    <i class="bi bi-box-arrow-right"></i>
                    <h4>Logout</h4>
                </a>
            </div>
        </aside>
    `
}

export default Sidebar;
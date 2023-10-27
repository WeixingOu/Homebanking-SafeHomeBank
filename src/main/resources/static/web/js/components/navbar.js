import { logOut } from "../services/authService.js"

import sidebarMixin from "../mixins/sidebarMixin.js";
import clientMixin from "../mixins/clientMixin.js"

const Navbar = {
    props: ['theme', 'isSidebarOpen'],
    mixins: [clientMixin, sidebarMixin],

    methods: {
        setTheme(theme) {
            this.$emit('toggle-theme', theme);
        },
        
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
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="./accounts.html"><img class="img-fluid" src="../../assets/images/logo.png" alt="logo"></a>
                <div class="input-group bg-body-secondary">
                    <span><i class="bi bi-search text-secondary fs-4"></i></span>
                    <input class="form-control bg-body-secondary border-0" type="search" placeholder="Search">
                </div>
                <ul class="navbar-nav me-3">
                    <li class="nav-item theme-btn bg-body-secondary">
                        <i class="bi bi-sun-fill" @click="setTheme('light')"  :class="{active: theme === 'light'}"></i>
                        <i class="bi bi-moon-fill" @click="setTheme('dark')"  :class="{active: theme === 'dark'}"></i>
                    </li>
                    <li class="nav-item profile position-relative">
                        <div class="profile-photo">
                            <img class="img-fluid" src="../../assets/images/profile_photo.jpg" alt="profile photo">
                        </div>
                        <h5 class="p-0 m-0" v-if="client">{{ client.firstName }}</h5>
                        <span class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></span>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" @click="handleLogOut">
                                <i class="bi bi-box-arrow-in-right"></i>
                                <span>Sign Out</span>
                            </a></li>
                        </ul>
                    </li>
                    <button class="navbar-toggler">
                        <i class="bi bi-list" @click="toggleSidebar"></i>
                    </button>
                </ul>
            </div>
        </nav>
    `
}

export default Navbar;
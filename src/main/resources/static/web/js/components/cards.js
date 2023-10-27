import clientMixin from "../mixins/clientMixin.js";

const { ref } = Vue

const Cards = {
    mixins: [clientMixin],

    data() {
        return {
            currentDragging: null,
            containerCX: ref(null),
            containerDX: ref(null),
        }
    },
    mounted() {
        this.containerCX = this.$refs.containerCX;
        this.containerDX = this.$refs.containerDX;
    },

    methods: {
        mouseMoveHandlerX(e) {
            if (!this.currentDragging) return;
            this.currentDragging.scrollLeft -= e.movementX;
        },
        mouseDownHandlerX(e) {
            if (e.currentTarget === this.containerCX) {
                this.currentDragging = this.containerCX;
            } else if (e.currentTarget === this.containerDX) {
                this.currentDragging = this.containerDX;
            }
        },
        mouseUpHandlerX(e) {
            this.currentDragging = null;
        },
        isExpired(expiryDate) {
            return moment().isAfter(expiryDate);
        },
    },

    computed: {
        creditCards() {
            return this.client.cards
            .filter(card => card.isActive && card.type === 'CREDIT')
            .sort((a, b) => a.color.localeCompare(b.color));
        },
        debitCards() {
            return this.client.cards
            .filter(card => card.isActive && card.type === "DEBIT")
            .sort((a, b) => a.color.localeCompare(b.color));
        }
    },
    template: `
        <div class="pb-4">
            <div class="header">
                <h1 class="m-0">My Bank Cards</h1>
                <h2 class="mt-4">Credit</h2>
            </div>

            <div class="cards">
                <div class="cards-container" 
                    ref="containerCX" 
                    @mousemove="mouseMoveHandlerX"
                    @mousedown="mouseDownHandlerX" 
                    @mouseup="mouseUpHandlerX"
                >
                    
                    <div class="card p-0 bg-transparent" 
                        :class="{ 'no-flip': currentDragging, expired: isExpired(creditCard.truDate) }"
                        @mousemove="mouseMoveHandlerX" 
                        @mousedown="mouseDownHandlerX"
                        @mouseup="mouseUpHandlerX" 
                        v-if="client"
                        v-for="creditCard in creditCards"
                    >

                        <div class="flip">
                            <div class="front" 
                                :class="creditCard.color.toLowerCase()"
                            >
                                <svg class="logo" width="20" height="20" viewbox="0 0 17.5 16.2">
                                    <path
                                        d="M3.2 0l5.4 5.6L14.3 0l3.2 3v9L13 16.2V7.8l-4.4 4.1L4.5 8v8.2L0 12V3l3.2-3z"
                                        fill="white"
                                    ></path>
                                </svg>
                                <div class="investor">{{ creditCard.color.toLowerCase() }}</div>
                                <div class="chip">
                                    <div class="chip-line"></div>
                                    <div class="chip-line"></div>
                                    <div class="chip-line"></div>
                                    <div class="chip-line"></div>
                                    <div class="chip-main"></div>
                                </div>
                                <svg class="wave" viewBox="0 3.71 26.959 38.787" width="13.5" height="19.5"
                                    fill="white">
                                    <path
                                        d="M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z">
                                    </path>
                                    <path
                                        d="M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z">
                                    </path>
                                    <path
                                        d="M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z">
                                    </path>
                                </svg>
                                <div class="card-number">
                                    <div class="section" v-for="section in creditCard.number.split('-')" :key="section">{{ section }}</div>
                                </div>
                                <div class="end">
                                    <span class="end-text">exp. end:</span>
                                    <span class="end-date">{{ creditCard.thruDate }}</span>
                                </div>
                                <div class="card-holder">
                                    mr/s {{ creditCard.cardholder }}
                                </div>
                                <div class="master">
                                    <div class="circle master-red"></div>
                                    <div class="circle master-yellow"></div>
                                </div>
                            </div>

                            <div class="back" :class="creditCard.color.toLowerCase()">
                                <div class="strip-black"></div>
                                <div class="ccv">
                                    <label>ccv</label>
                                    <div>{{ creditCard.cvv }}</div>
                                </div>
                            </div>
                        </div>

                        <div v-if="isExpired(creditCard.thruDate)" class="expired-overlay">
                            <div class="expired-text">EXPIRED</div>
                        </div>
                    </div>
                </div>
                <slot name="credit-cards"></slot>
            </div>
        </div>

        <div class="pb-4">
            <div class="header">
                <h2 class="mt-4">Debit</h2>
            </div>

            <div class="cards">
                <div class="cards-container" 
                    ref="containerDX" 
                    @mousemove="mouseMoveHandlerX"
                    @mousedown="mouseDownHandlerX" 
                    @mouseup="mouseUpHandlerX"
                >
                    
                    <div class="card p-0 bg-transparent" 
                        :class="{ 'no-flip': currentDragging, expired: isExpired(debitCard.truDate) }"
                        @mousemove="mouseMoveHandlerX" 
                        @mousedown="mouseDownHandlerX"
                        @mouseup="mouseUpHandlerX" 
                        v-if="client"
                        v-for="debitCard in debitCards"
                    >
                        <div class="flip">
                            <div class="front" 
                                :class="debitCard.color.toLowerCase()"
                            >
                                <svg class="logo" width="20" height="20" viewbox="0 0 17.5 16.2">
                                    <path
                                        d="M3.2 0l5.4 5.6L14.3 0l3.2 3v9L13 16.2V7.8l-4.4 4.1L4.5 8v8.2L0 12V3l3.2-3z"
                                        fill="white"
                                    ></path>
                                </svg>
                                <div class="investor">{{ debitCard.color.toLowerCase() }}</div>
                                <div class="chip">
                                    <div class="chip-line"></div>
                                    <div class="chip-line"></div>
                                    <div class="chip-line"></div>
                                    <div class="chip-line"></div>
                                    <div class="chip-main"></div>
                                </div>
                                <svg class="wave" viewBox="0 3.71 26.959 38.787" width="13.5" height="19.5"
                                    fill="white">
                                    <path
                                        d="M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z">
                                    </path>
                                    <path
                                        d="M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z">
                                    </path>
                                    <path
                                        d="M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z">
                                    </path>
                                </svg>
                                <div class="card-number">
                                    <div class="section" v-for="section in debitCard.number.split('-')" :key="section">{{ section }}</div>
                                </div>
                                <div class="end">
                                    <span class="end-text">exp. end:</span>
                                    <span class="end-date">{{ debitCard.thruDate }}</span>
                                </div>
                                <div class="card-holder">
                                    mr/s {{ debitCard.cardholder }}
                                </div>
                                <div class="master">
                                    <div class="circle master-red"></div>
                                    <div class="circle master-yellow"></div>
                                </div>
                            </div>

                            <div class="back" :class="debitCard.color.toLowerCase()">
                                <div class="strip-black"></div>
                                <div class="ccv">
                                    <label>ccv</label>
                                    <div>{{ debitCard.cvv }}</div>
                                </div>
                            </div>
                        </div>

                        <div v-if="isExpired(debitCard.thruDate)" class="expired-overlay">
                            <div class="expired-text">EXPIRED</div>
                        </div>
                    </div>

                </div>

                <slot name="debit-cards"></slot>
            </div>
        </div>
    `
}

export default Cards;
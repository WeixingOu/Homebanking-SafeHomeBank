const Accordion = {
    template: `
        <div class="accordion">
            <div class="header">
                <h2 class="m-0">Frequently Questions</h2>
            </div>

            <div class="accordion-container">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button 
                            class="accordion-button" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseOne" 
                            aria-expanded="true" 
                            aria-controls="collapseOne"
                        >
                            What should I do if I lose my card or it's stolen?
                        </button>
                    </h2>

                    <div id="collapseOne" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            Once you receive your card, you can activate it by logging into your online account and selecting the "Activate Card" option. Alternatively, you can call +1 (123) 456-7890 and follow the provided instructions.
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button 
                            class="accordion-button collapsed" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseTwo" 
                            aria-expanded="false" 
                            aria-controls="collapseTwo"
                        >
                            Where can I view my recent transactions?
                        </button>
                    </h2>

                    <div id="collapseTwo" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            All your recent transactions are available in the "Transactions" section of the app. If you do not recognize a transaction, please contact our support.
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button 
                            class="accordion-button collapsed" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseThree" 
                            aria-expanded="false" 
                            aria-controls="collapseThree"
                        >
                            Can I link my card to mobile payment platforms like Apple Pay or Google Pay?
                        </button>
                    </h2>

                    <div id="collapseThree" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            Yes, our cards are compatible with major mobile payment platforms. To link your card, open the respective mobile payment app and follow their instructions for adding a new card.
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button 
                            class="accordion-button collapsed" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseFour" 
                            aria-expanded="false" 
                            aria-controls="collapseFour"
                        >
                            What security features does the card have?
                        </button>
                    </h2>

                    <div id="collapseFour" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            Our cards come with several security features, including chip technology, fraud alerts, and 24/7 transaction monitoring. We also offer two-factor authentication for online purchases.
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `
}

export default Accordion;
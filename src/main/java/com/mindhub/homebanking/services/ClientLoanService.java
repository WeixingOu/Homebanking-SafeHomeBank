package com.mindhub.homebanking.services;

import com.mindhub.homebanking.models.Client;
import com.mindhub.homebanking.models.ClientLoan;
import com.mindhub.homebanking.models.Loan;

public interface ClientLoanService {
    ClientLoan findById(Long id);
    boolean existsByClientAndLoanAndActive(Client client, Loan loan, boolean active);
    void saveClientLoan(ClientLoan clientLoan);

}

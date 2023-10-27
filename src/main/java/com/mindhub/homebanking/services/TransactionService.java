package com.mindhub.homebanking.services;

import com.mindhub.homebanking.models.Transaction;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public interface TransactionService {

    Set<Transaction> findByAccount_Id(Long accountId);

    List<Transaction> findByTransferDateBetweenAndActiveAndAccount_Number(LocalDateTime dateInit, LocalDateTime dateEnd, Boolean active, String accountNumber);

    void saveTransaction(Transaction transaction);
}

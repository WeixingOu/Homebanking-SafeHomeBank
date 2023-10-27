package com.mindhub.homebanking.models;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toList;

@Entity // Creates an empty table
// public: any code can use the class. - private: can only be used inside the class.
public class Client {

    // ---- Properties ----
    @Id // Indicates Primary Key
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native") // Generates ID value natively from the database
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    // ---- Relations ----
    @OneToMany(mappedBy="client", fetch= FetchType.EAGER)
    // Whenever a Client object loads, related accounts will load immediately, in the same query.
    // EAGER brings everything, Client with Account. LAZY waits until you order it, brings Client only if you don't request otherwise.
    private Set<Account> accounts = new HashSet<>();
    // Initialising a space to save all accounts, without duplicates

    @OneToMany(mappedBy="client", fetch= FetchType.EAGER)
    private Set<ClientLoan> clientLoans = new HashSet<>();

    @OneToMany(mappedBy="client", fetch= FetchType.EAGER)
    private Set<Card> cards = new HashSet<>();

    // ---- Constructors ----
    // Special method that creates an instance of a class, called with the new operator.
    public Client(){ } // Hibernate may require it to instance a class during a data recovery from the database

    public Client(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    // ---- Getters & Setters ----
    public long getId() {return id;}

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Account> getAccounts() {
        return accounts;
    }
    public void addAccount(Account account) {
        account.setClient(this); // references the instanced client
        accounts.add(account);
    }

    public Set<ClientLoan> getClientLoans() {
        return clientLoans;
    }

    public void addClientLoan(ClientLoan clientLoan) {
        clientLoan.setClient(this);
        clientLoans.add(clientLoan);
    }

    public List<Loan> getLoans() {
        return clientLoans
                .stream()
                .map(ClientLoan::getLoan)
                .collect(toList());
    }

    public Set<Card> getCards() {return cards;}
    public void addCard(Card card) {
        card.setClient(this);
        cards.add(card);
    }
}

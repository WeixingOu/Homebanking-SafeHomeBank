# SafeHome Bank - Homebanking System

![Vue.js](https://img.shields.io/badge/Vue.js-2.6-brightgreen.svg)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.3.1.RELEASE-brightgreen.svg)
![Gradle](https://img.shields.io/badge/Gradle-6.3-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12.2-blue.svg)
![Docker](https://img.shields.io/badge/Docker-19.03.8-blue.svg)

SafeHome Bank is a comprehensive homebanking system that allows users to manage their personal finances effectively. From making transfers to managing cards and requesting loans, this platform ensures that all user data remains secure and operations are executed smoothly.

> See the live demo: [SafeHome Bank Demo](https://safehome-bank.onrender.com/web/index.html)

## Project Overview

I developed a homebanking system focusing on usability and security:
- **User-friendly Interface**: Utilizing Vue.js, I created an intuitive and responsive frontend.
- **Secure Backend**: Spring Boot with Gradle offers robust backend services, secured with PostgreSQL for data integrity.
- **Interactive Alerts**: Integrated SweetAlert for interactive feedback and alerts to enhance the user experience.

## Technologies and Tools

- **Frontend**: Vue.js for dynamic and responsive client-side interactions.
- **Backend**: Spring Boot with Gradle, providing a powerful suite of backend services.
- **Database**: PostgreSQL, ensuring all data is securely managed and transactions are safe.
- **HTTP Management**: Axios for handling HTTP requests efficiently between the frontend and backend.
- **Interactive UI**: SweetAlert for crafting responsive, engaging alerts and dialogs.
- **Containerization**: Docker, facilitating easier deployment and scaling.

## Project Structure

The project is structured with the frontend integrated within the backend repository, specifically under the `static/web` directory, simplifying deployment and maintenance.

### Directory Layout
```
SafeHome-Bank/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   │       └── static/
│   │           └── web/   # Vue.js frontend files
│   └── test/
│
├── build.gradle   # Gradle build configuration
├── Dockerfile     # Docker configuration
└── README.md
```

## Features

- **Financial Management**: Users can view balances, recent transactions, and manage their financial statements.
- **Transfers**: Facilitates real-time money transfers between accounts with immediate reflection in the account balance.
- **Loan Management**: Users can apply for and manage loans, viewing their repayment schedules and outstanding amounts.
- **Card Services**: Manage debit and credit cards, including activating new cards and setting spending limits.

## How to Run

To run this project locally, you need Docker and Docker Compose installed. Follow these steps to get it up and running:

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd SafeHome-Bank

# Build and run the Docker container
docker-compose up --build
```

Visit http://localhost:8080/web/index.html to view the application.

## Conclusion
SafeHome Bank is designed to make personal finance management accessible and secure for everyone. With a focus on user experience and data security, it's an ideal choice for anyone looking to manage their finances effectively.

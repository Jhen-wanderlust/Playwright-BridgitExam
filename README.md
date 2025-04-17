# Bridgit QA competency test

Welcome to the Bridgit QA technical test.  After you have set up the software please complete as many tasks as you can in the allotted timeframe.

| Project  | Description                                |
|----------|--------------------------------------------|
| Database | PostgreSQL managed by Sequelize Migrations |
| Backend  | NodeJS/Typescript with NestJS framework    |
| Frontend | VueJS/Typescript                           |

### Table of contents

- [Setting up](#setting-up)
- [QA tasks](#qa-tasks)

## Setting up

Prerequesites: 

- NodeJS 16
- Docker

Setting up the database on 


# Database URL
DATABASE_URL=postgres://postgres:123456@localhost:5432/technical_test

# Node environment
NODE_ENV=dev



```bash
# start postgresql server using Docker's "Compose"
$ docker-compose up -d 
# create and populate the database using Sequelize
$ cd database
$ cp .env.localdev .env
$ npm install
$ npm run build
$ npm run migrate
$ npm run seed:all
```

Setting up the backend on `http://localhost:7100` with Swagger on `http://localhost:7100/swagger`:

```bash
$ cd backend
$ cp .env.localdev .env
$ npm install
$ npm run start:dev
```

Setting up the frontend on `http://localhost:7200`:

```bash
$ cd frontend
$ cp .env.localdev .env
$ npm install 
$ npm run start:dev
```

## Logging In
After setting up the frontend and backend and running the database migrations, you can login to the frontend with the following details.
```bash
Email: broker1@tech-test.bridgit.com.au
Password: password
```

## QA tasks
Please use Playwright for the following tasks. A custom data attribute named `data-test-id` has been added to the UI components that require testing. 

### Testing Application Submission

Brokers are people who help arrange home financing.  When brokers sign in to the dashboard they see a list of their in-progress applications, and an option to submit a new application. You can open the loan submission modal by clicking on 'Submit application'

Build automated tests to test the following:

  - An application can be successfully submitted with valid data
  - After a successful application submission, the new loan appears in the Applications list on the dashboard.

  QA: for this test run : 

    npx playwright test ValidSubmitApplication.spec.ts --project=chrome

  - Submission fails if any field is left empty
  - Submission fails if mobile number not in format 04xxxxxxxx (This is the format for Australian mobile numbers)
  - Submission fails if email not correctly formatted

  for the three test run: 

    npx playwright test invalidApplicationScenarios.spec.ts --project=chrome 

### Testing the Servicing Calculator

Brokers like to enter loan information to view the applicant's ability to pay back the loan before submitting a loan. This allows them to save time not submitting loans that have to be rejected.

The calculator uses the following formula:

`incomingPrice + incomingStampDuty - incomingDeposit + outgoingValuation - outgoingMortgage + savingsContribution`

A positive number indicates a good loan, and a negative number indicates a bad loan.

Build automated tests to test the following:

  - Test a passing scenario (formula returns a positive number)


  - Test a failing scenario (formula returns a negative number)

  for this calculation test: 

      npx playwright test servicingCalculator.spec.ts --project=chrome

      
 Documentation: https://docs.google.com/document/d/1ueRqqOMJ5Gza4bWKSKRaeZChDq4cWdQDdQJPImpah34/edit?usp=sharing

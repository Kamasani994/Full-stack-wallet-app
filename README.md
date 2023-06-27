# Getting Started with Full stack wallet application

  

The project is divided into two sub projects wallet-ui and wallet-api

  

The wallet-UI project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

  

The wallet-api project was developed in NestJS And Database is MySQL

  

To setup the project clone the wallet repository https://github.com/Meherdev/wallet.git

  

## Steps to setup Wallet-UI

  

1. inside wallet folder `cd` wallet-ui

2. `npm install` to install all the dependencies

3. `npm start`

  

## Steps to setup wallet-api

  

1. inside wallet folder `cd` wallet-api

2. `npm install` to install all the dependencies

3. go to app.module.ts and configure mysql configuration.

4. Once the database is set and conencted run this command `npm run start` to run the project

  

## Wallet-api APIs

  

There are multiple APIs to setup wallet and make transactions

  

### POST setup wallet

`http://localhost:3000/wallet/setup`

Body

    {
    
    "name": "test account 11",
    
    "balance": 2045223.123
    
    }
 
### GET  fetch wallet details
`http://localhost:3000/wallet/d345693b-9f6a-41a3-a4ec-24b89479b003`

### POST  Create Transaction
`http://localhost:3000/transact/d345693b-9f6a-41a3-a4ec-24b89479b003`

    {
        "amount": -50,
        "description": "testing transactions"
    }

### GET  fetch all transactions

`http://localhost:3000/transactions?walletId=7b3c4eb7-0ba6-40f7-9cd9-278d9f32c5fd&skip=0&limit=10`

Query Params

    walletId : 7b3c4eb7-0ba6-40f7-9cd9-278d9f32c5fd
    
    skip: 0
    
    limit: 10

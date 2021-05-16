# bank-accounts

## description

A UI that access a backend API to manage bank accounts

## getting started

1. install dependencies:
   `npm install`
2. in a terminal, run test suite:
   `npm test`
3. in another terminal, start app in watch mode:
   `npm start`

## dependencies

node 14.16
npm 7.3

## technical debt

- create a favicon and store it in public/ along with config in manifest.json and edit
  index.html. see https://realfavicongenerator.net/
- the transaction list will require pagination. server side pagination would be best,
  given there could be an infinite number of items, but this relies on knowing the
  pagination schema of backend api, for example, does the api offset based or cursor
  based pagination
- there should be a robust data fetch and caching layer for API requests which don't
  change within a session, for example, `listAccounts` could be called once upon login
  and cached in react context
- there should be UI to provide feedback for failed API requests
- there should be more validation on the transfer form, e.g. checking sufficient balance.
  it would make sense for balance to be retrievable from the backend API as well.

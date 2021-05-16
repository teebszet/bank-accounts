/* api stubs for assumed backend API */

/*
 * assuming we have a backend api with the following routes:
 *
 * GET /accounts
 * example reponse: 200 OK
 * body: [ '02001', '02002' ]
 *
 * GET /:accountId/transactions
 * example reponse: 200 OK
 * body: [
 *   {
 *     "timestamp": "2021-05-16T04:55:17.890Z",
 *     "action": "DEBIT", // DEBIT|CREDIT
 *     "description": "Direct Credit S T Macandrew",
 *     "amount": 343.00, // always positive
 *     "currency": "HKD" // follows ISO-4217 https://www.iso.org/iso-4217-currency-codes.html
 *   },
 *   {
 *     "timestamp": "2021-05-12T04:55:17.890Z",
 *     "action": "DEBIT", // DEBIT|CREDIT
 *     "description": "QTWN COOKIE BAR QUEENSTOWN POS",
 *     "amount": 33.09,
 *     "currency": "NZD"
 *   }
 * ]
 *
 * POST /:accountId/transfer
 * valid request body: {
 *   "toAccount": "02001",
 *   "amount": 2222.11,
 *   "currency": "HKD"
 * }
 * example response: 200 OK
 *
 */

const transactions = {
  '02001': [
    {
      "timestamp": "2021-05-16T04:55:17.890Z",
      "action": "DEBIT",
      "description": "Direct Credit S T Macandrew",
      "amount": 343.00,
      "currency": "HKD"
    },
    {
      "timestamp": "2021-05-12T04:55:17.890Z",
      "action": "DEBIT",
      "description": "QTWN COOKIE BAR QUEENSTOWN POS",
      "amount": 33.09,
      "currency": "NZD"
    }
  ],
  '02002': [
    {
      "timestamp": "2021-05-16T04:55:17.890Z",
      "action": "CREDIT",
      "description": "Direct Credit S T Macandrew 0XX01",
      "amount": 343.00,
      "currency": "HKD"
    },
    {
      "timestamp": "2021-05-12T04:55:17.890Z",
      "action": "DEBIT",
      "description": "POS W/D MRS FERG MRS 9:20",
      "amount": 16.09,
      "currency": "NZD"
    }
  ]
};

export const listTransactions = async (accountId) => {
  try {
    if (!accountId) {
      throw new Error('no account id');
    }
    if (!transactions[accountId]) {
      throw new Error('account id not found');
    }
    // TODO replace with fetch to hit real backend when ready
    return Promise.resolve(transactions[accountId]);
  } catch(e) {
    return _handleException(e);
  }
};

export const listAccounts = async () => {
  try {
    // TODO replace with fetch to hit real backend when ready
    return Promise.resolve(Object.keys(transactions));
  } catch(e) {
    return _handleException(e);
  }
};

function _handleException(e) {
  // TODO extend error handling here e.g. use a logger
  return Promise.reject(e);
}

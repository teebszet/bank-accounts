import { Fragment } from 'react';
import './TransactionList.scss';

export default function TransactionList({transactions}) {
  // TODO split by date and create a TransactionListItem component
  return (
    <Fragment>
      <h1>Transactions</h1>
      <ul className="transaction-list">
        {
          transactions.map(({description, amount, timestamp, action, currency}, i) => (
            <li key={i} className="transaction-item">
              <h4 className="amount">{formatCurrency({currency, amount, action})}</h4>
              <div className="description">{description}</div>
              <div className="timestamp">{formatDate(timestamp)}</div>
            </li>
          ))
        }
      </ul>
    </Fragment>
  );
}

// TODO write unit tests and move to utils
// TODO move constants to constants file
function formatCurrency({currency, amount, action}) {
  const sign = action === 'CREDIT' ? '+' : '-';
  return `${sign} ${currency.toUpperCase()} ${amount.toFixed(2)}`;
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

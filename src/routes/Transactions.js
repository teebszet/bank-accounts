import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import TransactionList from '../components/TransactionList';
import Button from '../components/Button';
import { listAccounts, listTransactions } from '../api/bankApi';
import './Transactions.scss'

export default function Transactions() {
  const [accountIds, setAccountIds] = useState([]);
  const [accountId, setAccountId] = useState(''); // TODO remove default;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listAccounts();
        setAccountIds(response);
        setAccountId(response[0]);
      } catch(e) {
        // TODO handle error in UI here
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO implement server side pagination
        const response = await listTransactions(accountId);
        setTransactions(response);
      } catch(e) {
        // TODO handle error in UI here
        console.error(e);
      }
    };
    if (accountId) {
      fetchData();
    }
  }, [accountId]);

  return (
    <MainLayout>
      <div className="transactions__transfer-button">
        <Link to="/transfer">
          <Button>Make a Transfer</Button>
        </Link>
      </div>
      <select value={accountId} onChange={(e) => setAccountId(e.target.value)}>
        {
          accountIds.map(id => (
            <option key={id} value={id}>{id}</option>
          ))
        }
      </select>
      <TransactionList transactions={transactions} />
    </MainLayout>
  );
}

import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import TransactionList from '../components/TransactionList';
import { listTransactions } from '../api/bankApi';

export default function Transactions() {
  const [ accountId ] = useState('02001'); // TODO remove default;
  const [ transactions, setTransactions ] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await listTransactions(accountId);
      setTransactions(response);
    };
    fetchData();
  });

  return (
    <MainLayout>
      <TransactionList transactions={transactions}/>
    </MainLayout>
  );
}

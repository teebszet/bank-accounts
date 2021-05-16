import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import { listAccounts, listCurrencies, postTransfer } from '../api/bankApi';
import './Transfer.scss';

export default function Transfer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [accounts, setAccounts] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const watchFromAccount = watch('fromAccount');
  const onSubmit = async (data) => {
    console.log(data);
    await postTransfer(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAccounts(await listAccounts());
      } catch (e) {
        _handleFetchError(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCurrencies(await listCurrencies());
      } catch (e) {
        _handleFetchError(e);
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="transfer">
        <h1>Make a Transfer</h1>
        <form className="transfer__form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="fromAccount">From Account</label>
            <select id="fromAccount" {...register('fromAccount')}>
              {accounts.map((account, i) => (
                <option key={i} value={account}>
                  {account}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="toAccount">To Account</label>
            <select id="toAccount" {...register('toAccount')}>
              {accounts
                .filter((a) => a !== watchFromAccount)
                .map((account, i) => (
                  <option key={i} value={account}>
                    {account}
                  </option>
                ))}
            </select>
            <span>{errors.toAccount}</span>
          </div>
          <div className="currency-amount-row">
            <select className="currency" {...register('currency')}>
              {currencies.map((currency, i) => (
                <option key={i} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <div className="amount">
              <input
                type="number"
                {...register('amount', { required: true })}
              ></input>
              {errors.amount ? (
                <span className="error">Amount is required</span>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="transfer-button">
            <Button>Transfer</Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

function _handleFetchError(e) {
  // TODO handle error in UI here
  console.error(e);
}

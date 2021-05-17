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
    setValue,
  } = useForm({
    defaultValues: {
      fromAccount: undefined,
      toAccount: undefined,
      currency: 'HKD',
      amount: undefined
    }
  });

  const [accounts, setAccounts] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const watchFromAccount = watch('fromAccount');
  const onSubmit = async (data) => {
    await postTransfer(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listAccounts();
        setAccounts(response);
        setValue('fromAccount', response[0]);
        setValue('toAccount', '');
      } catch (e) {
        _handleFetchError(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listCurrencies();
        setCurrencies(response);
        setValue('currency', response[0]);
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
            <select
              id="fromAccount"
              {...register('fromAccount', {
                required: 'From Account is required',
              })}
            >
              {accounts.map((account, i) => (
                <option key={i} value={account}>
                  {account}
                </option>
              ))}
            </select>
            <span className="error">{errors?.fromAccount?.message}</span>
          </div>
          <div>
            <label htmlFor="toAccount">To Account</label>
            <select
              id="toAccount"
              {...register('toAccount', { required: 'To Account is required' })}
            >
              {accounts
                .filter((a) => a !== watchFromAccount)
                .map((account, i) => (
                  <option key={i} value={account}>
                    {account}
                  </option>
                ))}
            </select>
            <span className="error">{errors?.toAccount?.message}</span>
          </div>
          <div className="currency-amount-row">
            <div>
              <select
                className="currency"
                {...register('currency', { required: 'Currency is required' })}
              >
                {currencies.map((currency, i) => (
                  <option key={i} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="amount">
              <input
                type="number"
                {...register('amount', { required: 'Amount is required' })}
              ></input>
              <span className="error">{errors?.amount?.message}</span>
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

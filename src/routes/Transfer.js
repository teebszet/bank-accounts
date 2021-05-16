import { useForm } from 'react-hook-form';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import './Transfer.scss';

export default function Transfer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const accounts = ['03001', '03002'];

  // TODO get this from backend API
  const currencies = ['HKD', 'NZD'];
  const watchFromAccount = watch('fromAccount', accounts[0]);

  return (
    <MainLayout>
      {' '}
      <div className="transfer">
        {' '}
        <h1>Make a Transfer</h1>{' '}
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
                .filter(a => a !== watchFromAccount)
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
            <input
              className="amount"
              type="text"
              {...register('amount')}
            ></input>
          </div>
          <div className="transfer-button">
            <Button>Transfer</Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

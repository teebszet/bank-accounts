import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Transactions from './routes/Transactions';
import Transfer from './routes/Transfer';
import './App.scss';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Transactions />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
        <Route path="/transfer">
          <Transfer />
        </Route>
      </Switch>
    </Router>
  );
}

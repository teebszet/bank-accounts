import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Transactions from './routes/Transactions';
import Transfer from './routes/Transfer';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link to="/transfer">Transfer</Link>
          </li>
        </ul>
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
      </div>
    </Router>
  );
}

export default App;
